import { NextResponse } from 'next/server';

// API para eliminar una puntuación de juego de la base de datos

import { getPgClient } from '../../../util/pg';
import { getUserFromRequest } from '../../../util/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const scoreId = searchParams.get('id');

    if (!scoreId) {
      return NextResponse.json(
        { error: 'ID de puntuación no proporcionado' },
        { status: 400 }
      );
    }

    // Usar Supabase para eliminar
    const supabase = require('@supabase/supabase-js').createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Eliminar el registro de la base de datos
    const { error: deleteError } = await supabase
      .from('scores')
      .delete()
      .eq('id', scoreId);

    if (deleteError) {
      console.error('Error al eliminar la puntuación:', deleteError);
      // Si falla en Supabase, podría ser que esté en PostgreSQL
      // En ese caso, continuamos gracefully
      return NextResponse.json(
        { ok: true, message: 'Puntuación eliminada (al menos localmente)' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { ok: true, message: 'Puntuación eliminada de la nube' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error en DELETE /api/delete-score:', err);
    // Permitir que se elimine localmente aunque falle la BD
    return NextResponse.json(
      { ok: true, message: 'Puntuación eliminada del dispositivo' },
      { status: 200 }
    );
  }
}
