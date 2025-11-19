import { getPgClient } from '../../../util/pg';
import bcrypt from 'bcryptjs';
import { createSession } from '../../../util/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Auth debe ser siempre fresca

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Signup attempt body:', body);
    const email = body.email && String(body.email).trim().toLowerCase();
    const password = body.password && String(body.password);
    const name = body.name && String(body.name).trim();
    const city = body.city && String(body.city).trim();
    const country = body.country && String(body.country).trim();
    const birthdate = body.birthdate && String(body.birthdate);
    const gender = body.gender && String(body.gender);

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Faltan datos' }), { status: 400 });
    }

    const client = await getPgClient();

    try {
      // Verificar si el usuario ya existe
      const checkResult = await client.query('SELECT id FROM users WHERE email = $1', [email]);
      if (checkResult.rows.length > 0) {
        await client.end();
        return new Response(JSON.stringify({ error: 'El usuario ya existe' }), { status: 409 });
      }

      // Hashear la contraseña
      const passwordHash = await bcrypt.hash(password, 10);

      // Insertar en la tabla users
      const result = await client.query(
        'INSERT INTO users (email, password_hash, name, city, country, birthdate, gender, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING id, email, name', 
        [email, passwordHash, name || null, city || null, country || null, birthdate || null, gender || null]
      );
      
      await client.end();

      const user = result.rows[0];

      // Crear sesión automática después del registro
      const { cookie } = await createSession(user.id);

      const headers = new Headers();
      headers.set('Set-Cookie', cookie);
      headers.set('Content-Type', 'application/json');

      return new Response(JSON.stringify({ success: true, user }), { status: 201, headers });
    } catch (dbErr) {
      await client.end();
      throw dbErr;
    }
  } catch (err) {
    console.error('Signup error:', err && err.message);
    if (err && err.stack) console.error(err.stack);
    return new Response(JSON.stringify({ error: 'Error interno del servidor: ' + (err.message || 'desconocido') }), { status: 500 });
  }
}
