/**
 * Script simplificado para ejecutar el SQL que corrige el rol del pooler
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Hardcodear la URL para este script específico
const POSTGRES_URL = 'postgresql://postgres.llfnkdxldxxhyqfherno:FLUIDEZ2025j@aws-1-us-east-2.pooler.supabase.com:5432/postgres';

async function fixPoolerRole() {
  console.log('🔧 Conectando a Supabase para configurar el rol del pooler...');
  console.log('📍 URL:', POSTGRES_URL.replace(/:[^:@]+@/, ':****@'));

  const client = new Client({
    connectionString: POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Conectado a la base de datos');

    // Leer el archivo SQL
    const sqlPath = path.join(__dirname, '..', 'sql', 'fix_pooler_role.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('\n📝 Ejecutando SQL para configurar el rol del pooler...\n');

    // Ejecutar el SQL
    const result = await client.query(sql);
    
    console.log('✅ SQL ejecutado correctamente');
    
    // Mostrar resultados
    if (result.rows && result.rows.length > 0) {
      console.log('\n📊 Resultado:');
      console.table(result.rows);
    }

    console.log('\n✅ Rol del pooler configurado correctamente');
    console.log('💡 Ahora deberías poder crear cuentas sin problemas');
    console.log('💡 Reinicia el servidor de desarrollo (npm run dev)');

  } catch (error) {
    console.error('\n❌ Error al configurar el rol del pooler:');
    console.error(error.message);
    if (error.detail) console.error('Detalle:', error.detail);
    if (error.hint) console.error('Sugerencia:', error.hint);
    if (error.code) console.error('Código:', error.code);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔌 Conexión cerrada');
  }
}

fixPoolerRole();
