import { clearSession, SESSION_COOKIE_NAME } from '../../../util/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = Object.fromEntries(cookieHeader.split(';').map(s => s.split('=').map(p => p && p.trim())));
    const token = cookies[SESSION_COOKIE_NAME];
    if (token) {
      await clearSession(token);
    }

    // Clear cookie
    const headers = new Headers();
    // Set cookie with Max-Age=0 to remove it
    headers.set('Set-Cookie', `${SESSION_COOKIE_NAME}=deleted; Path=/; HttpOnly; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err) {
    console.error('Logout error', err && err.message);
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 });
  }
}
