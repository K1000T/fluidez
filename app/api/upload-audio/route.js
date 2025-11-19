import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '../../../util/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    const userId = form.get('userId') || null; // opcional
    if (!file) return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = file.name || 'audio.webm';
    const mime = file.type || 'audio/webm';

    // Conectar a Postgres y guardar
    const client = await getPgClient();
    const id = crypto.randomUUID();
    const query = 'INSERT INTO audios(id, filename, mime, data, created_at) VALUES($1,$2,$3,$4,now())';
    await client.query(query, [id, filename, mime, buffer]);
    await client.end();

    return NextResponse.json({ ok: true, id, filename, mime, userId });
  } catch (err) {
    console.error('API /upload-audio error', err);
    return NextResponse.json({ error: (err && err.message) ? err.message : String(err) }, { status: 500 });
  }
}
