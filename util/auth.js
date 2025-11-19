import crypto from 'crypto';
import { getPgClient } from './pg';
import cache from './cache';

// Session configuration
const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'fa_session';
const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE ? parseInt(process.env.SESSION_MAX_AGE, 10) : 60 * 60 * 24 * 30; // 30 days in seconds

export async function createSession(userId) {

  const token = crypto.randomBytes(48).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);

  const client = await getPgClient();
  await client.query('INSERT INTO sessions (session_token, user_id, expires_at) VALUES ($1, $2, $3)', [token, userId, expiresAt]);
  await client.end();

  const isProd = process.env.NODE_ENV === 'production';
  const cookieParts = [];
  cookieParts.push(`${SESSION_COOKIE_NAME}=${token}`);
  cookieParts.push(`Path=/`);
  cookieParts.push(`HttpOnly`);
  cookieParts.push(`SameSite=Strict`);
  if (isProd) cookieParts.push(`Secure`);
  cookieParts.push(`Max-Age=${SESSION_MAX_AGE}`);
  cookieParts.push(`Expires=${expiresAt.toUTCString()}`);

  const cookie = cookieParts.join('; ');
  return { token, cookie };
}

export async function clearSession(token) {
  if (!token) return;
  const client = await getPgClient();
  await client.query('DELETE FROM sessions WHERE session_token = $1', [token]);
  await client.end();
}

export async function getUserFromRequest(req) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = Object.fromEntries(cookieHeader.split(';').map(s => s.split('=').map(p => p && p.trim())));
    const token = cookies[SESSION_COOKIE_NAME];
    if (!token) return null;

    // Verificar caché primero
    const cacheKey = `session:${token}`;
    const cachedUser = cache.get(cacheKey);
    if (cachedUser) {
      // Verificar que no haya expirado
      if (new Date(cachedUser.expiresAt) > new Date()) {
        return cachedUser.user;
      }
      cache.delete(cacheKey);
    }

    const client = await getPgClient();
    const { rows } = await client.query(
      `SELECT u.id, u.email, u.name, u.icon, u.phone, u.address, u.city, u.state, s.expires_at 
       FROM sessions s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.session_token = $1 LIMIT 1`,
      [token]
    );
    await client.end();

    if (!rows || rows.length === 0) return null;
    const row = rows[0];
    const expires = new Date(row.expires_at);
    if (expires < new Date()) {
      // session expired
      return null;
    }

    const user = { 
      id: row.id, 
      email: row.email, 
      name: row.name,
      icon: row.icon,
      phone: row.phone,
      address: row.address,
      city: row.city,
      state: row.state
    };

    // Guardar en caché por 5 minutos
    cache.set(cacheKey, { user, expiresAt: row.expires_at }, 5 * 60 * 1000);

    return user;
  } catch (err) {
    console.error('getUserFromRequest error', err && err.message);
    return null;
  }
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE };
