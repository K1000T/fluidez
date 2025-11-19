import { Client } from 'pg';

async function check() {
  const conn = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.DIRECT_URL;
  if (!conn) {
    console.error('No se encontró POSTGRES_URL/DATABASE_URL/DIRECT_URL en el entorno. Exporta la variable y reintenta.');
    process.exit(1);
  }

  console.log('Usando cadena:', conn.replace(/:[^:@]+@/, ':****@'));
  const client = new Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    const res = await client.query('SELECT 1 as ok');
    console.log('Conexión OK:', res.rows[0]);
    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('Fallo al conectar:', err && err.message);
    try { await client.end(); } catch(e){}
    process.exit(1);
  }
}

check();
