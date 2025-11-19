import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env.local
const envPath = path.join(__dirname, '..', '.env.local');
dotenv.config({ path: envPath });

console.log('==========================================');
console.log('DIAGNÓSTICO DE VARIABLES DE ENTORNO');
console.log('==========================================\n');

console.log('📁 Archivo .env.local:', envPath);
console.log('📋 Variables POSTGRES/DATABASE encontradas:\n');

const postgresVars = Object.keys(process.env)
  .filter(key => key.includes('POSTGRES') || key.includes('DATABASE'));

if (postgresVars.length > 0) {
  postgresVars.forEach(key => {
    const value = process.env[key];
    const maskedValue = value.replace(/:[^:@]+@/, ':****@');
    console.log(`  ✓ ${key}:`);
    console.log(`    ${maskedValue}\n`);
  });
} else {
  console.log('  ❌ NO se encontraron variables POSTGRES o DATABASE\n');
}

console.log('==========================================');
console.log('RESULTADO:');
if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
  console.log('✅ Las variables están correctamente configuradas');
} else {
  console.log('❌ ERROR: Variables NO encontradas');
}
console.log('==========================================\n');
