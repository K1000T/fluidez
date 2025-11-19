import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '../../../util/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const source = searchParams.get('source'); // Filtrar por fuente (daf o espectrograma)
    const limit = parseInt(searchParams.get('limit')) || 50;

    const supabase = getSupabaseServerClient();
    
    if (!supabase) {
      return NextResponse.json({ error: 'Error de configuración' }, { status: 500 });
    }

    // Query base
    let query = supabase
      .from('audios')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    // Filtrar por fuente si se especifica
    if (source && (source === 'daf' || source === 'espectrograma')) {
      query = query.eq('source', source);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[get-audios] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      ok: true, 
      audios: data,
      count: data.length 
    });

  } catch (err) {
    console.error('[get-audios] Error general:', err);
    return NextResponse.json({ 
      error: err.message || String(err) 
    }, { status: 500 });
  }
}
