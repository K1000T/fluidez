import { Pool } from 'pg';

// Connection pool global (reutilizado entre requests)
let pool = null;

export function getPgPool() {
  if (pool) {
    return pool;
  }

  const preferred = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.PG_CONNECTION_STRING;
  const fallback = process.env.DIRECT_URL;

  if (!preferred && !fallback) {
    console.error('❌ ERROR: No hay cadena de conexión Postgres disponible');
    throw new Error('POSTGRES_URL no está configurada');
  }

  const connectionString = preferred || fallback;
  
  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    },
    max: 20, // Máximo 20 conexiones en el pool
    min: 2,  // Mínimo 2 conexiones siempre activas
    idleTimeoutMillis: 30000, // Cerrar conexiones inactivas después de 30s
    connectionTimeoutMillis: 5000, // Timeout de conexión: 5s
    query_timeout: 10000, // Timeout de query: 10s
  });

  pool.on('error', (err) => {
    console.error('❌ Error inesperado en pool de PostgreSQL:', err);
  });

  console.log('✅ Connection pool de PostgreSQL creado');
  return pool;
}

// Función legacy para compatibilidad (ahora usa pool)
export async function getPgClient() {
  const pool = getPgPool();
  
  try {
    const client = await pool.connect();
    
    // Wrapper para mantener compatibilidad con código existente
    return {
      query: (...args) => client.query(...args),
      end: () => client.release(), // Release al pool en lugar de cerrar
      release: () => client.release()
    };
  } catch (error) {
    console.error('❌ Error obteniendo cliente del pool:', error.message);
    throw error;
  }
}
