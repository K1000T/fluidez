const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local no existe en', envPath);
  process.exit(1);
}

const buf = fs.readFileSync(envPath);
console.log('File path:', envPath);
console.log('Buffer first bytes (hex):', buf.slice(0,4).toString('hex'));

const s = buf.toString('utf8');
console.log('\n--- RAW CONTENT ---\n');
console.log(s);

console.log('\n--- JSON escaped (shows hidden chars) ---\n');
console.log(JSON.stringify(s));

const lines = s.split(/\r?\n/);
console.log(`\nTotal lines: ${lines.length}`);
for (let i = 0; i < lines.length; i++) {
  // show only the first 120 chars per line to keep output compact
  const preview = lines[i].length > 120 ? lines[i].slice(0,120) + '...' : lines[i];
  console.log(`${i}: ${preview}`);
}

const idx = lines.findIndex(l => /POSTGRES_URL/.test(l));
console.log('\nIndex of line containing POSTGRES_URL:', idx);
if (idx !== -1) {
  const line = lines[idx];
  console.log('\nLine raw:', line);
  console.log('Char codes:', Array.from(line).map(ch => ch.charCodeAt(0)));
}

// Also print if dotenv would parse it roughly (simple parse)
const parsed = {};
for (const l of lines) {
  const m = l.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) parsed[m[1]] = m[2];
}
console.log('\nSimple parse result for POSTGRES_URL:', parsed.POSTGRES_URL === undefined ? '<undefined>' : parsed.POSTGRES_URL);

console.log('\nDone. Paste the output here to continue.');
