import { getPgClient } from '../../../util/pg';
import bcrypt from 'bcryptjs';
import { createSession } from '../../../util/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Auth debe ser siempre fresca

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Faltan datos' }), { status: 400 });
    }

    const client = await getPgClient();
    
    try {
      const result = await client.query(
        'SELECT id, email, password_hash, name, created_at FROM users WHERE email = $1',
        [email.toLowerCase().trim()]
      );
      
      await client.end();

      if (result.rows.length === 0) {
        return new Response(JSON.stringify({ error: 'Credenciales incorrectas' }), { status: 401 });
      }

      const user = result.rows[0];
      const match = await bcrypt.compare(String(password), user.password_hash);
      if (!match) {
        return new Response(JSON.stringify({ error: 'Credenciales incorrectas' }), { status: 401 });
      }

      delete user.password_hash;

      // Crear sesión
      const { cookie } = await createSession(user.id);

      const headers = new Headers();
      headers.set('Set-Cookie', cookie);
      headers.set('Content-Type', 'application/json');

      return new Response(JSON.stringify({ success: true, user }), { status: 200, headers });
    } catch (dbErr) {
      await client.end();
      throw dbErr;
    }
  } catch (err) {
    console.error('Login error:', err && err.message);
    if (err && err.stack) console.error(err.stack);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}
