import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { spawn } from 'child_process';
import Groq from 'groq-sdk';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Transcribe audio using local whisper CLI (requires: pip install openai-whisper)
export async function POST(request) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file) return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = file.name || 'audio.webm';

    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `${Date.now()}_${filename}`);
    await fs.writeFile(tmpFile, buffer);

    const outDir = tmpDir;
    const args = [tmpFile, '--language', 'es', '--model', 'small', '--output_format', 'txt', '--output_dir', outDir];

    const whisper = spawn('whisper', args, { shell: true });

    let stdout = '';
    let stderr = '';
    whisper.stdout.on('data', (d) => { stdout += d.toString(); });
    whisper.stderr.on('data', (d) => { stderr += d.toString(); });

    const exitCode = await new Promise((resolve) => {
      whisper.on('close', resolve);
      whisper.on('error', () => resolve(1));
    });

    if (exitCode !== 0) {
      try { await fs.unlink(tmpFile); } catch (e) {}
      console.error('whisper cli failed', stderr);
      return NextResponse.json({ error: 'Whisper CLI falló: ' + stderr }, { status: 500 });
    }

    const base = path.basename(tmpFile, path.extname(tmpFile));
    const txtPath = path.join(outDir, `${base}.txt`);
    let transcript = '';
    try {
      transcript = await fs.readFile(txtPath, 'utf8');
    } catch (e) {
      console.error('No se encontró archivo de transcripción', e);
    }

    // Cleanup
    try { await fs.unlink(tmpFile); } catch (e) {}
    try { await fs.unlink(txtPath); } catch (e) {}

    return NextResponse.json({ ok: true, transcript, stdout, stderr });
  } catch (err) {
    console.error('API /transcribe_local error', err);
    return NextResponse.json({ error: (err && err.message) ? err.message : String(err) }, { status: 500 });
  }
}
