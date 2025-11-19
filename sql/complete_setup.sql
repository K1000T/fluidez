-- SETUP COMPLETO PARA SUPABASE CON TRANSACTION POOLER
-- Ejecuta este script completo en el SQL Editor de Supabase

-- ============================================
-- PARTE 1: CREAR TABLAS
-- ============================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reset_token VARCHAR(255),
  reset_expires TIMESTAMPTZ
);

-- Media files table
CREATE TABLE IF NOT EXISTS media_files (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  original_filename VARCHAR(512) NOT NULL,
  storage_path VARCHAR(1024) NOT NULL,
  mime_type VARCHAR(255),
  size BIGINT,
  duration_seconds NUMERIC(10,3),
  transcript TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User progress
CREATE TABLE IF NOT EXISTS user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module VARCHAR(255) NOT NULL,
  progress NUMERIC(5,2) DEFAULT 0.00,
  details JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User texts
CREATE TABLE IF NOT EXISTS user_texts (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Sessions (server-side session storage)
CREATE TABLE IF NOT EXISTS sessions (
  id BIGSERIAL PRIMARY KEY,
  session_token VARCHAR(128) NOT NULL UNIQUE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audios table (if you prefer storing audio blobs in Postgres)
CREATE TABLE IF NOT EXISTS audios (
  id TEXT PRIMARY KEY,
  filename TEXT,
  mime TEXT,
  data BYTEA,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_media_user ON media_files(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_text_user ON user_texts(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);

-- ============================================
-- PARTE 2: CONFIGURAR ROL DEL POOLER
-- ============================================

-- Crear el rol del pooler si no existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_roles
        WHERE rolname = 'postgres.llfnkdxldxxhyqfherno'
    ) THEN
        CREATE ROLE "postgres.llfnkdxldxxhyqfherno"
        WITH LOGIN
        ENCRYPTED PASSWORD 'FLUIDEZ2025j';
        RAISE NOTICE 'Rol del pooler creado exitosamente';
    ELSE
        RAISE NOTICE 'El rol del pooler ya existe';
    END IF;
END$$;

-- Otorgar permisos de conexión
GRANT CONNECT ON DATABASE postgres TO "postgres.llfnkdxldxxhyqfherno";

-- Otorgar uso del esquema public
GRANT USAGE ON SCHEMA public TO "postgres.llfnkdxldxxhyqfherno";

-- Otorgar permisos en todas las tablas existentes
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "postgres.llfnkdxldxxhyqfherno";

-- Otorgar permisos en todas las secuencias (para SERIAL/BIGSERIAL)
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "postgres.llfnkdxldxxhyqfherno";

-- Configurar permisos por defecto para tablas futuras
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON TABLES TO "postgres.llfnkdxldxxhyqfherno";

-- Configurar permisos por defecto para secuencias futuras
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON SEQUENCES TO "postgres.llfnkdxldxxhyqfherno";

-- ============================================
-- PARTE 3: CONFIGURAR CONTRASEÑA MD5 (CRÍTICO PARA PGBOUNCER)
-- ============================================

-- PgBouncer (Transaction Pooler) solo puede manejar passwords MD5
-- Por eso es CRÍTICO ejecutar estos comandos

SET password_encryption = 'md5';

ALTER ROLE "postgres.llfnkdxldxxhyqfherno" WITH PASSWORD 'FLUIDEZ2025j';

-- Restaurar a la configuración predeterminada
SET password_encryption = 'scram-sha-256';

-- ============================================
-- PARTE 4: VERIFICACIÓN
-- ============================================

-- Verificar que el rol fue creado correctamente
SELECT 
    rolname AS "Nombre del Rol",
    rolcanlogin AS "Puede hacer Login",
    rolconnlimit AS "Límite de Conexiones"
FROM pg_roles 
WHERE rolname = 'postgres.llfnkdxldxxhyqfherno';

-- Verificar permisos en las tablas
SELECT 
    grantee,
    table_schema,
    table_name,
    privilege_type
FROM information_schema.table_privileges
WHERE grantee = 'postgres.llfnkdxldxxhyqfherno'
ORDER BY table_name;

-- Listar todas las tablas creadas
SELECT 
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
