// Simple CommonJS script to test MySQL connection from Node without using ESM imports
// Load .env.local automatically so you don't need to set env vars manually in PowerShell
try {
  require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
} catch (e) {
  // ignore if dotenv is not available
}
const mysql = require('mysql2/promise');

async function test() {
  const host = process.env.MYSQL_HOST || '127.0.0.1';
  const port = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || '';
  const database = process.env.MYSQL_DATABASE || 'fluidez_activa';

  console.log('Testing connection to', { host, port, user, database });
  try {
    const conn = await mysql.createConnection({ host, port, user, password, database });
    const [rows] = await conn.query('SELECT 1 as ok');
    console.log('OK', rows[0]);
    await conn.end();
    process.exit(0);
  } catch (err) {
    console.error('Connection error:', err.message);
    process.exit(1);
  }
}

if (require.main === module) test();
