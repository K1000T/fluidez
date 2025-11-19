/**
 * Script para ejecutar el setup completo de Supabase
 * Incluye: crear tablas + configurar rol del pooler + verificación
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const POSTGRES_URL = 'postgresql://postgres.llfnkdxldxxhyqfherno:FLUIDEZ2025j@aws-1-us-east-2.pooler.supabase.com:5432/postgres';

async function completeSetup() {
  console.log('🚀 Iniciando setup completo de Supabase...\n');
  console.log('📍 Conectando a:', POSTGRES_URL.replace(/:[^:@]+@/, ':****@'));

  const client = new Client({
    connectionString: POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Conectado a la base de datos\n');

    // Leer el archivo SQL
    const sqlPath = path.join(__dirname, '..', 'sql', 'complete_setup.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📝 Ejecutando setup completo...\n');

    // Ejecutar el SQL
    await client.query(sql);
    
    console.log('✅ Setup ejecutado correctamente\n');

    // Verificar tablas creadas
    console.log('📊 Verificando tablas creadas:');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.table(tablesResult.rows.map(r => ({ Tabla: r.table_name })));
    }

    // Verificar rol del pooler
    console.log('\n🔐 Verificando rol del pooler:');
    const roleResult = await client.query(`
      SELECT 
        rolname as rol,
        rolcanlogin as puede_login
      FROM pg_roles 
      WHERE rolname = 'postgres.llfnkdxldxxhyqfherno'
    `);
    
    if (roleResult.rows.length > 0) {
      console.table(roleResult.rows);
      console.log('✅ Rol del pooler configurado correctamente');
    } else {
      console.log('⚠️  Rol del pooler no encontrado');
    }

    // Verificar permisos
    console.log('\n🔑 Verificando permisos del pooler:');
    const permsResult = await client.query(`
      SELECT 
        table_name as tabla,
        COUNT(*) as permisos
      FROM information_schema.table_privileges
      WHERE grantee = 'postgres.llfnkdxldxxhyqfherno'
      AND table_schema = 'public'
      GROUP BY table_name
      ORDER BY table_name
    `);
    
    if (permsResult.rows.length > 0) {
      console.table(permsResult.rows);
    } else {
      console.log('⚠️  No se encontraron permisos para el pooler');
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ SETUP COMPLETO EXITOSO');
    console.log('='.repeat(60));
    console.log('\n💡 Próximos pasos:');
    console.log('   1. Reinicia el servidor: npm run dev');
    console.log('   2. Prueba crear una cuenta en: http://localhost:3001/signup');
    console.log('   3. El error debería estar resuelto\n');

  } catch (error) {
    console.error('\n❌ Error durante el setup:');
    console.error('Mensaje:', error.message);
    if (error.detail) console.error('Detalle:', error.detail);
    if (error.hint) console.error('Sugerencia:', error.hint);
    if (error.code) console.error('Código:', error.code);
    if (error.position) console.error('Posición:', error.position);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Conexión cerrada');
  }
}

completeSetup();
