// Script para probar la conexión a PostgreSQL/Supabase
// Carga automáticamente .env.local
try {
  require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
} catch (e) {
  console.warn('dotenv no disponible, usando variables de entorno del sistema');
}

const { Client } = require('pg');

async function testPostgresConnection() {
  const POSTGRES_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  
  if (!POSTGRES_URL) {
    console.error('❌ ERROR: POSTGRES_URL no está definida en .env.local');
    process.exit(1);
  }

  console.log('🔍 Probando conexión a PostgreSQL...');
  console.log('📍 URL:', POSTGRES_URL.replace(/:[^:@]+@/, ':****@')); // Oculta la contraseña
  
  const client = new Client({ connectionString: POSTGRES_URL });
  
  try {
    await client.connect();
    console.log('✅ Conexión establecida exitosamente!');
    
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('⏰ Tiempo del servidor:', result.rows[0].current_time);
    console.log('📦 Versión PostgreSQL:', result.rows[0].pg_version);
    
    // Probar consulta a la base de datos
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    console.log('\n📊 Tablas en la base de datos:');
    if (tablesResult.rows.length > 0) {
      tablesResult.rows.forEach(row => {
        console.log('  - ' + row.table_name);
      });
    } else {
      console.log('  (No hay tablas todavía)');
    }
    
    await client.end();
    console.log('\n✅ Prueba completada exitosamente!');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Error de conexión:', err.message);
    console.error('\n💡 Verifica que:');
    console.error('  1. La contraseña sea correcta: FLUIDEZ2025j');
    console.error('  2. Estés usando Session Pooler (puerto 6543)');
    console.error('  3. Tu IP esté permitida en Supabase (o desactiva el firewall)');
    process.exit(1);
  }
}

if (require.main === module) {
  testPostgresConnection();
}
