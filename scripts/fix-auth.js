const mysql = require('mysql2/promise');

async function run() {
  const host = process.env.MYSQL_HOST || 'localhost';
  const port = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;
  const rootUser = process.env.MYSQL_USER || 'root';
  const rootPassword = process.env.MYSQL_PASSWORD || '';
  const appUser = process.env.APP_DB_USER || 'app';
  const appPass = process.env.APP_DB_PASSWORD || 'apppw';

  if (!rootPassword) {
    console.error('Please set MYSQL_PASSWORD environment variable with the root password before running this script.');
    process.exit(1);
  }

  console.log('Connecting as', rootUser, 'to', host + ':' + port);
  const conn = await mysql.createConnection({ host, port, user: rootUser, password: rootPassword });
  try {
    console.log("Altering root user's auth_plugin to mysql_native_password (development only)...");
    await conn.query(`ALTER USER ?@'localhost' IDENTIFIED WITH mysql_native_password BY ?`, [rootUser, rootPassword]);
    console.log("root user altered.");

    console.log(`Altering or creating app user '${appUser}'@'localhost' with mysql_native_password...`);
    // create if not exists, then alter password and plugin
    await conn.query(`CREATE USER IF NOT EXISTS \`${appUser}\`@'localhost' IDENTIFIED BY ?`, [appPass]);
    await conn.query(`ALTER USER \`${appUser}\`@'localhost' IDENTIFIED WITH mysql_native_password BY ?`, [appPass]);
    await conn.query(`GRANT SELECT, INSERT, UPDATE, DELETE ON fluidez_activa.* TO \`${appUser}\`@'localhost'`);
    await conn.query('FLUSH PRIVILEGES');
    console.log('app user altered/created and granted privileges.');
  } catch (err) {
    console.error('fix-auth failed:', err && err.message);
    if (err && err.stack) console.error(err.stack);
    process.exit(1);
  } finally {
    await conn.end();
  }
}

if (require.main === module) run();
