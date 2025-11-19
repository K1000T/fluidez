import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file) return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = file.name || 'audio.webm';
    const safeName = `${Date.now()}_${crypto.randomUUID()}_${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    // Save under public/uploads so Next.js can servirlo en dev como /uploads/<name>
    const publicUploads = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(publicUploads, { recursive: true });
    const outPath = path.join(publicUploads, safeName);
    await fs.writeFile(outPath, buffer);

    const base = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:3000`;
    const publicURL = `${base}/uploads/${encodeURIComponent(safeName)}`;

    return NextResponse.json({ ok: true, filename: safeName, publicURL });
  } catch (err) {
    console.error('API /upload-local error', err);
    return NextResponse.json({ error: (err && err.message) ? err.message : String(err) }, { status: 500 });
  }
}
