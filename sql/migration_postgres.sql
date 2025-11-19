-- Migration for Postgres (Supabase) - create tables compatible with PostgreSQL
-- Do NOT include CREATE DATABASE or USE statements in Supabase SQL editor.

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
