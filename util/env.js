// Archivo para cargar y exportar variables de entorno
// Esto asegura que las variables estén disponibles en API Routes

// IMPORTANTE: No usar dotenv.config() porque Webpack ya maneja las variables
// Next.js carga automáticamente .env.local, solo necesitamos acceder a process.env

export const config = {
  // Acceso directo a process.env - Webpack reemplazará estas referencias en build time
  postgresUrl: process.env.POSTGRES_URL || process.env.DATABASE_URL || '',
  databaseUrl: process.env.DATABASE_URL || '',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
};

// Debug
if (typeof window === 'undefined') {
  console.log('📋 Configuración cargada desde process.env:');
  console.log('  - POSTGRES_URL:', process.env.POSTGRES_URL || 'NO DEFINIDA');
  console.log('  - DATABASE_URL:', process.env.DATABASE_URL || 'NO DEFINIDA');
  console.log('  - Config.postgresUrl:', config.postgresUrl ? '✓ Configurada' : '✗ NO encontrada');
}

export default config;
