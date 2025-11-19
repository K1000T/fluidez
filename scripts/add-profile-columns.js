const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  connectionString: 'postgresql://postgres.llfnkdxldxxhyqfherno:FLUIDEZ2025j@aws-1-us-east-2.pooler.supabase.com:5432/postgres'
});

const sql = fs.readFileSync('sql/add_user_profile_columns.sql', 'utf8');

pool.query(sql)
  .then(() => {
    console.log('✅ Migración completada: columnas de perfil agregadas');
    process.exit(0);
  })
  .catch(e => {
    console.error('❌ Error:', e.message);
    process.exit(1);
  });
