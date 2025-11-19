const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function main() {
  try {
    const arg = process.argv[2] || path.join(__dirname, '..', 'sql', 'migration_add_audio_postgres.sql');
    const sqlPath = path.isAbsolute(arg) ? arg : path.join(process.cwd(), arg);
    if (!fs.existsSync(sqlPath)) {
      console.error('Archivo SQL no encontrado:', sqlPath);
      process.exit(1);
    }

    // Try environment variable first
    let POSTGRES_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL;

    // If not set, try to read .env.local in project root
    if (!POSTGRES_URL) {
      const envLocal = path.join(process.cwd(), '.env.local');
      if (fs.existsSync(envLocal)) {
        const content = fs.readFileSync(envLocal, 'utf8');
        const match = content.split(/\r?\n/).find(line => line.trim().startsWith('POSTGRES_URL='));
        if (match) {
          POSTGRES_URL = match.split('=')[1].trim();
        }
      }
    }

    if (!POSTGRES_URL) {
      console.error('POSTGRES_URL no está configurada. Establece la variable de entorno o añade POSTGRES_URL en .env.local');
      process.exit(1);
    }

    const sql = fs.readFileSync(sqlPath, 'utf8');
    const client = new Client({ connectionString: POSTGRES_URL });
    await client.connect();

    console.log('Ejecutando SQL desde:', sqlPath);
    await client.query(sql);
    console.log('Migración ejecutada correctamente.');

    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('Error ejecutando migración:', err.message || err);
    process.exit(1);
  }
}

main();
