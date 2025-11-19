// Creates an app database user using root credentials supplied via env vars.
const mysql = require('mysql2/promise');

async function run() {
  const host = process.env.MYSQL_HOST || '127.0.0.1';
  const port = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;
  const rootUser = process.env.MYSQL_USER || 'root';
  const rootPassword = process.env.MYSQL_PASSWORD || '';

  const appUser = process.env.APP_DB_USER || 'app';
  const appPass = process.env.APP_DB_PASSWORD || 'apppw';
  const dbName = process.env.MYSQL_DATABASE || 'fluidez_activa';

  console.log('Connecting as root to create app user', { host, port, rootUser });
  const conn = await mysql.createConnection({ host, port, user: rootUser, password: rootPassword });
  try {
    const createSql = `CREATE USER IF NOT EXISTS \`${appUser}\`@'localhost' IDENTIFIED BY ?;`;
    await conn.query(createSql, [appPass]);
    const grantSql = `GRANT SELECT, INSERT, UPDATE, DELETE ON \`${dbName}\`.* TO \`${appUser}\`@'localhost';`;
    await conn.query(grantSql);
    await conn.query('FLUSH PRIVILEGES;');
    console.log(`User '${appUser}' created/granted on database '${dbName}'.`);
  } catch (err) {
    console.error('Error creating app user:', err.message);
    process.exit(1);
  } finally {
    await conn.end();
  }
}

if (require.main === module) run();
