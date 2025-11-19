import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// API para eliminar una grabación de audio de la base de datos
// Elimina tanto de Supabase storage como del registro en la BD

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const audioId = searchParams.get('id');

    if (!audioId) {
      return NextResponse.json(
        { error: 'ID de audio no proporcionado' },
        { status: 400 }
      );
    }

    // Obtener información del audio para obtener la URL del archivo
    const supabase = require('@supabase/supabase-js').createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Primero obtener el registro para saber qué archivo eliminar
    const { data: audio, error: fetchError } = await supabase
      .from('audios')
      .select('*')
      .eq('id', audioId)
      .single();

    if (fetchError || !audio) {
      console.log('Audio no encontrado en BD:', audioId);
      // Aún así intentar eliminar del localStorage
      return NextResponse.json(
        { ok: true, message: 'Registro de audio eliminado' },
        { status: 200 }
      );
    }

    // Extraer el nombre del archivo de la URL
    let fileName = null;
    if (audio.file_url) {
      const urlParts = audio.file_url.split('/');
      fileName = urlParts[urlParts.length - 1];
    }

    // Intentar eliminar el archivo del storage de Supabase
    if (fileName) {
      try {
        await supabase.storage
          .from('audio-uploads')
          .remove([fileName]);
      } catch (storageErr) {
        console.log('Error al eliminar del storage:', storageErr);
        // Continuar incluso si falla el storage
      }
    }

    // Eliminar el registro de la base de datos
    const { error: deleteError } = await supabase
      .from('audios')
      .delete()
      .eq('id', audioId);

    if (deleteError) {
      console.error('Error al eliminar el registro:', deleteError);
      return NextResponse.json(
        { error: 'Error al eliminar el registro de audio' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, message: 'Audio eliminado completamente de la nube' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error en DELETE /api/delete-audio:', err);
    return NextResponse.json(
      { error: err?.message || 'Error desconocido' },
      { status: 500 }
    );
  }
}
