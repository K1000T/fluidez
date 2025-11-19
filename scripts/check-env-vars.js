// Script de diagnóstico para verificar variables de entorno
console.log('==========================================');
console.log('DIAGNÓSTICO DE VARIABLES DE ENTORNO');
console.log('==========================================\n');

console.log('📋 Variables relacionadas con POSTGRES:');
Object.keys(process.env)
  .filter(key => key.includes('POSTGRES') || key.includes('DATABASE'))
  .forEach(key => {
    const value = process.env[key];
    if (value) {
      const maskedValue = value.includes('postgresql') 
        ? value.replace(/:[^:@]+@/, ':****@')
        : value.substring(0, 20) + '...';
      console.log(`  ✓ ${key}: ${maskedValue}`);
    } else {
      console.log(`  ✗ ${key}: NO CONFIGURADA`);
    }
  });

console.log('\n📋 Variables relacionadas con SUPABASE:');
Object.keys(process.env)
  .filter(key => key.includes('SUPABASE'))
  .forEach(key => {
    const value = process.env[key];
    if (value) {
      const maskedValue = value.substring(0, 30) + '...';
      console.log(`  ✓ ${key}: ${maskedValue}`);
    }
  });

console.log('\n📋 Otras variables importantes:');
console.log(`  NODE_ENV: ${process.env.NODE_ENV || 'no configurada'}`);
console.log(`  MYSQL_HOST: ${process.env.MYSQL_HOST || 'no configurada'}`);

console.log('\n==========================================');
console.log('RESULTADO:');
if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
  console.log('✅ Variables de Postgres configuradas correctamente');
} else {
  console.log('❌ Variables de Postgres NO encontradas');
  console.log('   Verifica que el archivo .env.local existe');
  console.log('   y que no tiene errores de sintaxis');
}
console.log('==========================================\n');
