import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el archivo SQL
const sqlPath = join(__dirname, '..', 'sql', 'create_scores_table.sql');
const sql = readFileSync(sqlPath, 'utf-8');

console.log('📊 Script SQL para crear tabla de puntuaciones\n');
console.log('━'.repeat(80));
console.log(sql);
console.log('━'.repeat(80));
console.log('\n📝 Pasos para ejecutar:');
console.log('   1. Ve a https://app.supabase.com');
console.log('   2. Selecciona tu proyecto');
console.log('   3. Ve a "SQL Editor" en el menú lateral');
console.log('   4. Copia y pega el SQL de arriba en el editor');
console.log('   5. Haz clic en "Run" o presiona Ctrl+Enter');
console.log('\n✨ Una vez ejecutado, la tabla "scores" estará lista para guardar puntuaciones.');
