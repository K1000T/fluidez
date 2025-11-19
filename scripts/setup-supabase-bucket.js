/**
 * Script para crear automáticamente el bucket 'audios' en Supabase
 * Ejecutar con: node scripts/setup-supabase-bucket.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function setupBucket() {
  console.log('🚀 Iniciando configuración del bucket de Supabase...\n');

  // Verificar variables de entorno
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Faltan variables de entorno');
    console.error('   Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_KEY en .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 1. Verificar si el bucket ya existe
    console.log('📦 Verificando bucket "audios"...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error al listar buckets:', listError.message);
      process.exit(1);
    }

    const bucketExists = buckets.some(bucket => bucket.name === 'audios');

    if (bucketExists) {
      console.log('✅ El bucket "audios" ya existe');
    } else {
      // 2. Crear el bucket
      console.log('📦 Creando bucket "audios"...');
      const { data, error: createError } = await supabase.storage.createBucket('audios', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: ['audio/webm', 'audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/ogg']
      });

      if (createError) {
        console.error('❌ Error al crear bucket:', createError.message);
        process.exit(1);
      }

      console.log('✅ Bucket "audios" creado exitosamente');
    }

    // 3. Configurar políticas RLS (Row Level Security)
    console.log('\n🔐 Configurando políticas de seguridad...');
    
    // Nota: Las políticas RLS para storage se deben configurar desde SQL
    console.log('\n📝 Ejecuta estos comandos SQL en Supabase SQL Editor:');
    console.log('   (https://app.supabase.com -> SQL Editor)\n');
    
    console.log('-- Política para permitir lectura pública');
    console.log(`CREATE POLICY "Permitir lectura pública de audios"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'audios');\n`);

    console.log('-- Política para permitir inserción autenticada');
    console.log(`CREATE POLICY "Permitir insertar audios autenticados"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'audios');\n`);

    console.log('-- Política para permitir inserción anónima (si es necesario)');
    console.log(`CREATE POLICY "Permitir insertar audios anónimos"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'audios');\n`);

    console.log('✅ Configuración completada!\n');
    console.log('📋 Próximos pasos:');
    console.log('   1. Ejecuta los comandos SQL de arriba en Supabase SQL Editor');
    console.log('   2. URL: https://supabase.com/dashboard/project/llfnkdxldxxhyqfherno/sql/new');
    console.log('   3. Inicia el servidor: powershell -ExecutionPolicy Bypass -File .\\dev.ps1');
    console.log('   4. Prueba grabar un audio en la aplicación\n');

  } catch (error) {
    console.error('❌ Error inesperado:', error.message);
    process.exit(1);
  }
}

// Ejecutar
setupBucket();
