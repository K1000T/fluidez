const mysql = require('mysql2/promise');

async function run() {
  const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
  };

  try {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.query("SELECT User, Host FROM mysql.user ORDER BY User, Host;");
    console.log('MySQL server accounts:');
    rows.forEach(r => console.log('-', r.User + '@' + r.Host));
    await conn.end();
  } catch (err) {
    console.error('Error listing DB users:', err.message);
    process.exit(1);
  }
}

if (require.main === module) run();
