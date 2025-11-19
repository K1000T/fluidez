import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '../../../util/supabase';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    console.log('[upload-to-supabase] Iniciando proceso de upload...');
    
    const form = await req.formData();
    const file = form.get('file');
    
    if (!file) {
      console.error('[upload-to-supabase] No se recibió archivo en el FormData');
      return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = file.name || 'audio.webm';
    const mime = file.type || 'audio/webm';

    console.log('[upload-to-supabase] Archivo recibido:', {
      nombre: filename,
      tamaño: buffer.length,
      tipo: mime
    });

    const supabase = getSupabaseServerClient();
    
    // Verificar que Supabase esté configurado
    if (!supabase) {
      console.error('[upload-to-supabase] Cliente Supabase no inicializado');
      return NextResponse.json({ error: 'Error de configuración de Supabase' }, { status: 500 });
    }

    // Use a deterministic path / folder
    const id = crypto.randomUUID();
    const path = `${id}_${filename}`;
    
    console.log('[upload-to-supabase] Intentando subir a bucket "Audios" con path:', path);

    // Upload to bucket 'Audios' (con mayúscula, como está en Supabase)
    const { data, error } = await supabase.storage.from('Audios').upload(path, buffer, {
      contentType: mime,
      upsert: false,
    });

    if (error) {
      console.error('[upload-to-supabase] Error de Supabase Storage:', {
        mensaje: error.message,
        detalles: error,
        statusCode: error.statusCode
      });
      return NextResponse.json({ 
        error: error.message || String(error),
        detalles: 'Verifica que el bucket "Audios" existe y tiene políticas públicas configuradas'
      }, { status: 500 });
    }

    console.log('[upload-to-supabase] Upload exitoso, data:', data);

    // Get public URL (método correcto)
    const { data: { publicUrl } } = supabase.storage.from('Audios').getPublicUrl(path);
    
    console.log('[upload-to-supabase] URL pública generada:', publicUrl);

    // Obtener metadatos adicionales del FormData
    const source = form.get('source') || 'daf';
    const duration = parseFloat(form.get('duration')) || 0;
    const wordCount = parseInt(form.get('wordCount')) || 0;
    const transcript = form.get('transcript') || null;
    const delayMs = parseInt(form.get('delay')) || null;
    const playbackRate = parseFloat(form.get('playbackRate')) || 1.0;

    // Calcular WPM
    const wpm = duration > 0 ? Math.round((wordCount / duration) * 60) : 0;

    // Guardar metadatos en la tabla de base de datos
    const { data: dbData, error: dbError } = await supabase
      .from('audios')
      .insert({
        id,
        filename,
        file_path: path,
        file_url: publicUrl,
        mime_type: mime,
        file_size: buffer.length,
        source,
        duration,
        word_count: wordCount,
        wpm,
        transcript,
        delay_ms: delayMs,
        playback_rate: playbackRate
      })
      .select()
      .single();

    if (dbError) {
      console.error('[upload-to-supabase] Error al guardar en BD:', dbError);
      // No fallar completamente si el archivo se subió pero falló la BD
      return NextResponse.json({ 
        ok: true, 
        id, 
        path, 
        publicUrl,
        warning: 'Archivo subido pero no se guardó en base de datos: ' + dbError.message
      });
    }

    console.log('[upload-to-supabase] Metadatos guardados en BD:', dbData);

    return NextResponse.json({ 
      ok: true, 
      id, 
      path, 
      publicUrl,
      dbRecord: dbData
    });
  } catch (err) {
    console.error('[upload-to-supabase] Error general:', err);
    return NextResponse.json({ 
      error: (err && err.message) ? err.message : String(err),
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }, { status: 500 });
  }
}
