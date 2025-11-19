const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function run() {
  const sqlFile = path.join(__dirname, '..', 'sql', 'migration_additional.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');

  const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'fluidez_activa',
    multipleStatements: true,
  };

  console.log('Connecting to MySQL with', { host: config.host, user: config.user });
  const conn = await mysql.createConnection(config);
  try {
    console.log('Running additional migration...');
    await conn.query(sql);
    console.log('Additional migration applied successfully.');
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exitCode = 1;
  } finally {
    await conn.end();
  }
}

if (require.main === module) {
  run().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { run };
