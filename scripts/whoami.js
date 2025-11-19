const mysql = require('mysql2/promise');

async function main() {
  const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'fluidez_activa',
  };

  try {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.query('SELECT CURRENT_USER() AS current_user, USER() AS user');
    console.log('Server reports for this connection:');
    console.log(rows[0]);
    await conn.end();
  } catch (err) {
    console.error('Error running whoami:', err.message);
    process.exit(1);
  }
}

if (require.main === module) main();
