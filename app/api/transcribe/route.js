import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file) return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 });

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    if (!OPENAI_API_KEY) {
      console.log('[transcribe] OPENAI_API_KEY: MISSING - usando transcripción local');
      return NextResponse.json({
        error: 'API de OpenAI no configurada. Por favor usa el botón de transcripción local en la interfaz.',
        useLocal: true
      }, { status: 400 });
    }

    console.log('[transcribe] Iniciando transcripción con OpenAI Whisper...');

    // Convertir File a Blob/Buffer para reenviarlo
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log('[transcribe] Archivo recibido:', {
      nombre: file.name,
      tipo: file.type,
      tamaño: buffer.length
    });

    // Crear FormData para OpenAI
    const outbound = new FormData();
    // OpenAI prefiere archivos con extensión correcta
    const filename = file.name || 'audio.webm';
    const blob = new Blob([buffer], { type: file.type || 'audio/webm' });
    
    outbound.append('file', blob, filename);
    outbound.append('model', 'whisper-1');
    outbound.append('language', 'es');

    const resp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: outbound
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('[transcribe] Error de OpenAI:', {
        status: resp.status,
        statusText: resp.statusText,
        error: errText
      });
      
      return NextResponse.json({ 
        error: `Error de OpenAI (${resp.status}): ${errText}`,
        useLocal: true,
        suggestion: 'Intenta usar el botón "Transcribir localmente" en su lugar'
      }, { status: resp.status });
    }

    const json = await resp.json();
    console.log('[transcribe] Respuesta de OpenAI:', json);
    
    const transcript = json.text || json.transcript || '';

    // Normalizar y contar palabras (quita signos de puntuación, normaliza diacríticos)
    const cleaned = transcript
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[.,!?;:\u2014\-()"'«»\[\]]+/g, ' ')
      .toLowerCase();
    const arr = cleaned.trim().split(/\s+/).filter(Boolean);
    const map = {};
    arr.forEach(w => { map[w] = (map[w] || 0) + 1; });
    const list = Object.entries(map).sort((a,b) => b[1] - a[1]);

    return NextResponse.json({ transcript, total: arr.length, map, list });
  } catch (err) {
    console.error('API /transcribe error', err);
    return NextResponse.json({ error: (err && err.message) ? err.message : String(err) }, { status: 500 });
  }
}
