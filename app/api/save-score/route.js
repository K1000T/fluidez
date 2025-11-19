import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '../../../util/supabase';
import { getUserFromRequest } from '../../../util/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const { game, score, attempts, timestamp } = await req.json();

    const supabase = getSupabaseServerClient();
    
    // Guardar puntuación
    const { error } = await supabase
      .from('scores')
      .insert({
        user_id: user.id,
        game_type: game,
        score: score,
        attempts: attempts,
        created_at: timestamp || new Date().toISOString()
      });

    if (error) {
      // Si la tabla no existe, crear y reintentar
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const supabase = getSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ scores: data || [] });
  } catch (e) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}
