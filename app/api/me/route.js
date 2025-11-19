import { getUserFromRequest } from '../../../util/auth';

export const runtime = 'nodejs';
export const revalidate = 60; // Cache por 1 minuto

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    console.error('Get user error:', err && err.message);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}
