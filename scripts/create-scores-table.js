import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY/SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createScoresTable() {
  console.log('📊 Creando tabla de puntuaciones...\n');

  try {
    // Leer el archivo SQL
    const sqlPath = join(process.cwd(), 'sql', 'create_scores_table.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    console.log('⚠️  Este script no puede ejecutar SQL directamente en Supabase.');
    console.log('   Por favor, ejecuta el siguiente SQL manualmente en el panel de Supabase:\n');
    console.log('━'.repeat(80));
    console.log(sql);
    console.log('━'.repeat(80));
    console.log('\n📝 Pasos para ejecutar:');
    console.log('   1. Ve a https://app.supabase.com');
    console.log('   2. Selecciona tu proyecto');
    console.log('   3. Ve a "SQL Editor"');
    console.log('   4. Copia y pega el SQL de arriba');
    console.log('   5. Ejecuta el script');
    console.log('\n✨ Una vez ejecutado, la tabla "scores" estará lista para usar.');

  } catch (error) {
    console.error('❌ Error al leer el archivo SQL:', error);
  }
}

createScoresTable();
