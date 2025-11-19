/**
 * Script para ejecutar el SQL que corrige el rol del pooler de Supabase
 * Esto soluciona el error de autenticación con transaction pooling
 * 
 * Uso: node scripts/fix-pooler-role.js
 */

import dotenv from 'dotenv';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde .env.local
const envPath = path.join(__dirname, '..', '.env.local');
console.log('📁 Cargando variables de entorno desde:', envPath);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Error cargando .env.local:', result.error);
  process.exit(1);
}

async function fixPoolerRole() {
  // Usar la URL directa del pooler
  const POSTGRES_URL = process.env.POSTGRES_URL;
  
  if (!POSTGRES_URL) {
    console.error('❌ POSTGRES_URL no está configurada en .env.local');
    process.exit(1);
  }

  console.log('🔧 Conectando a Supabase para configurar el rol del pooler...');
  console.log('📍 URL:', POSTGRES_URL.replace(/:[^:@]+@/, ':****@'));

  const client = new Client({
    connectionString: POSTGRES_URL,
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
    
    // Si hay mensajes de NOTICE, mostrarlos
    if (result.rows && result.rows.length > 0) {
      console.log('\n📊 Resultado:');
      console.table(result.rows);
    }

    console.log('\n✅ Rol del pooler configurado correctamente');
    console.log('💡 Ahora deberías poder crear cuentas sin problemas');

  } catch (error) {
    console.error('\n❌ Error al configurar el rol del pooler:');
    console.error(error.message);
    if (error.detail) console.error('Detalle:', error.detail);
    if (error.hint) console.error('Sugerencia:', error.hint);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔌 Conexión cerrada');
  }
}

fixPoolerRole();
