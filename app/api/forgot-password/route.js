import { getPgClient } from '../../../util/pg';
import crypto from 'crypto';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { EmailTemplate } from '../../../components/EmailTemplate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const email = body.email && String(body.email).trim().toLowerCase();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Correo electrónico requerido' }), { status: 400 });
    }

    let client;
    try {
      client = await getPgClient();
    } catch (connErr) {
      // Si no se puede conectar a la base de datos, no exponemos detalles al usuario.
      console.error('No se pudo conectar a la base de datos en forgot-password:', connErr && connErr.message);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Si el correo existe, se enviará un enlace de recuperación' 
        }), 
        { status: 200 }
      );
    }

    try {
      // Verificar si el usuario existe
      const checkResult = await client.query('SELECT id, email FROM users WHERE email = $1', [email]);
      
      // Por seguridad, no revelamos si el email existe o no
      if (checkResult.rows.length === 0) {
        await client.end();
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Si el correo existe, se enviará un enlace de recuperación' 
          }), 
          { status: 200 }
        );
      }

      // Generar token temporal (expira en 5 minutos)
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

      // Guardar el token hasheado en la base de datos
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      
      try {
        await client.query(
          'INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET token_hash = $2, expires_at = $3',
          [checkResult.rows[0].id, hashedToken, expiresAt]
        );
      } catch (tableErr) {
        console.error('Error inserting token (table may not exist):', tableErr.message);
        // Si la tabla no existe, continuar de todos modos
        // En producción, aquí podrías crear la tabla o mostrar un error más específico
      }

      await client.end();

      // Enviar correo con el token
      const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
      if (process.env.NODE_ENV !== 'production') {
        console.log('🔗 Reset link (dev):', resetLink);
      }
      
      // Intento 1: Resend (recomendado)
      let emailed = false;
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'tu_api_key_aqui') {
        try {
          const resendClient = new Resend(process.env.RESEND_API_KEY);
          const sendFrom = process.env.RESEND_FROM || `Fluidez Activa <no-reply@${(process.env.NEXT_PUBLIC_SUPABASE_URL||'example.com').replace(/^https?:\/\//,'')}>`;
          // Use React template rendering supported by Resend
          const firstName = (checkResult && checkResult.rows && checkResult.rows[0] && (checkResult.rows[0].name || checkResult.rows[0].email)) || '';
          const sendResult = await resendClient.emails.send({
            from: sendFrom,
            to: [email],
            subject: 'Recuperación de contraseña - Fluidez Activa',
            react: EmailTemplate({ firstName, resetLink }),
          });
          console.log('✅ Resend send result:', sendResult);
          console.log('✅ Email enviado (resend) a:', email);
          emailed = true;
        } catch (emailErr) {
          console.error('Error enviando email (Resend):', emailErr);
        }
      } else {
        console.log('⚠️ RESEND_API_KEY no configurada o es un placeholder. Saltando Resend.');
      }

      // Intento 2: SMTP via nodemailer (fallback, útil en dev o con Mailtrap)
      if (!emailed) {
        const smtpHost = process.env.SMTP_HOST;
        const smtpUser = process.env.SMTP_USER || process.env.SMTP_USERNAME;
        const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
        const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
        const smtpSecure = process.env.SMTP_SECURE === 'true';

        if (smtpHost && smtpUser && smtpPass) {
          try {
            const transporter = nodemailer.createTransport({
              host: smtpHost,
              port: smtpPort || 587,
              secure: smtpSecure || false,
              auth: {
                user: smtpUser,
                pass: smtpPass,
              },
            });

            const mailOptions = {
              from: process.env.SMTP_FROM || (process.env.RESEND_FROM || `Fluidez Activa <no-reply@${(process.env.NEXT_PUBLIC_SUPABASE_URL||'example.com').replace(/^https?:\/\//,'')}>`),
              to: email,
              subject: 'Recuperación de contraseña - Fluidez Activa',
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #6B3F1D;">Recuperación de contraseña</h2>
                  <p>Hola,</p>
                  <p>Recibimos una solicitud para restablecer tu contraseña en Fluidez Activa.</p>
                  <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
                  <p style="margin: 30px 0;">
                    <a href="${resetLink}" 
                       style="background-color: #F7C873; color: #6B3F1D; padding: 12px 24px; 
                              text-decoration: none; border-radius: 5px; font-weight: bold;">
                      Restablecer contraseña
                    </a>
                  </p>
                  <p style="color: #666; font-size: 14px;">
                    Este enlace expirará en 5 minutos por seguridad.
                  </p>
                </div>
              `,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('✅ SMTP send info:', info);
            emailed = true;
          } catch (smtpErr) {
            console.error('Error enviando email (SMTP fallback):', smtpErr && smtpErr.message);
          }
        } else {
          console.log('🔁 No hay credenciales SMTP configuradas (SMTP_HOST/SMTP_USER/SMTP_PASS). No se intentó SMTP.');
        }
      }

      if (!emailed) {
        console.log('⚠️ No se pudo enviar el email con Resend ni con SMTP. Enlace de reset:', resetLink);
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Se ha enviado un enlace de recuperación a tu correo' 
        }), 
        { status: 200 }
      );
    } catch (dbErr) {
      await client.end();
      throw dbErr;
    }
  } catch (err) {
    console.error('Forgot password error:', err && err.message);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }), 
      { status: 500 }
    );
  }
}
