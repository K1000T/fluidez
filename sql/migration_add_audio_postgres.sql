-- Migration para crear tabla `audios` en Postgres
-- Ejecutar en la base de datos a la que apunta POSTGRES_URL

CREATE TABLE IF NOT EXISTS audios (
  id TEXT PRIMARY KEY,
  filename TEXT,
  mime TEXT,
  data BYTEA,
  created_at TIMESTAMPTZ DEFAULT now()
);
