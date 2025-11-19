/**
 * Script para verificar que todas las variables de entorno estén configuradas
 * Ejecutar con: node scripts/verificar-configuracion.js
 */

require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Verificando configuración de Fluidez Activa...\n');

const checks = [
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    value: process.env.NEXT_PUBLIC_SUPABASE_URL,
    required: true,
    ejemplo: 'https://tuproyecto.supabase.co'
  },
  {
    name: 'SUPABASE_SERVICE_KEY',
    value: process.env.SUPABASE_SERVICE_KEY,
    required: true,
    ejemplo: 'eyJ...(tu service key)'
  },
  {
    name: 'OPENAI_API_KEY',
    value: process.env.OPENAI_API_KEY,
    required: false,
    ejemplo: 'sk-...(tu API key)'
  }
];

let allGood = true;

checks.forEach(check => {
  const hasValue = check.value && check.value.trim() !== '';
  const isExample = check.value && (
    check.value.includes('tu-proyecto') || 
    check.value.includes('tu-service-key') || 
    check.value.includes('tu-clave')
  );
  
  if (!hasValue) {
    console.log(`❌ ${check.name}: NO CONFIGURADO`);
    if (check.required) {
      console.log(`   ⚠️  Esta variable es OBLIGATORIA`);
      allGood = false;
    } else {
      console.log(`   ℹ️  Esta variable es opcional (para transcripción)`);
    }
    console.log(`   Ejemplo: ${check.ejemplo}\n`);
  } else if (isExample) {
    console.log(`⚠️  ${check.name}: Usando valor de ejemplo`);
    console.log(`   Debes reemplazarlo con tu valor real\n`);
    if (check.required) allGood = false;
  } else {
    const masked = check.value.substring(0, 15) + '...';
    console.log(`✅ ${check.name}: ${masked}\n`);
  }
});

console.log('━'.repeat(60));

if (allGood) {
  console.log('\n✅ ¡Configuración correcta!\n');
  console.log('Próximos pasos:');
  console.log('1. Ejecuta: node scripts/setup-supabase-bucket.js');
  console.log('2. Configura las políticas SQL en Supabase');
  console.log('3. Ejecuta: powershell -ExecutionPolicy Bypass -File .\\dev.ps1\n');
} else {
  console.log('\n❌ Hay problemas con la configuración\n');
  console.log('Por favor:');
  console.log('1. Copia .env.local.example a .env.local');
  console.log('2. Edita .env.local con tus credenciales reales');
  console.log('3. Vuelve a ejecutar este script\n');
  process.exit(1);
}
