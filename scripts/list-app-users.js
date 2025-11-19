const mysql = require('mysql2/promise');

async function run() {
  const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'fluidez_activa',
  };

  try {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.query('SELECT id, email, name, created_at FROM users ORDER BY id DESC LIMIT 100');
    console.log('Application users (users table):');
    if (rows.length === 0) console.log(' - (no users found)');
    rows.forEach(r => console.log('-', r.id, r.email, r.name || '', r.created_at));
    await conn.end();
  } catch (err) {
    console.error('Error listing app users:', err.message);
    process.exit(1);
  }
}

if (require.main === module) run();
