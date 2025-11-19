import { getConnection } from '../../../../util/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Development-only helper: attempts a simple DB connection and a test query.
// Do NOT enable in production. This endpoint helps diagnose connection/auth errors.
export async function GET() {
  try {
    const conn = await getConnection();
    // small, harmless query
    const [rows] = await conn.query('SELECT 1 AS ok');
    await conn.end();
    return new Response(JSON.stringify({ ok: true, rows }), { status: 200 });
  } catch (err) {
    // Return diagnostic information in dev so you can see the exact error.
    const msg = (err && err.message) || String(err);
    const stack = (err && err.stack) || null;
    console.error('Debug DB error:', msg);
    if (stack) console.error(stack);
    return new Response(JSON.stringify({ ok: false, error: msg, stack }), { status: 500 });
  }
}
