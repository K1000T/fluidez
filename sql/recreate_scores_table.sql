-- Script para recrear la tabla scores con el tipo de datos correcto
-- La tabla users usa INTEGER para id, no UUID

-- 1. Eliminar la tabla antigua (si existe)
DROP TABLE IF EXISTS scores CASCADE;

-- 2. Crear la tabla con el tipo de datos correcto
CREATE TABLE scores (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  game_type TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Índices para mejorar el rendimiento
CREATE INDEX idx_scores_user_id ON scores(user_id);
CREATE INDEX idx_scores_game_type ON scores(game_type);
CREATE INDEX idx_scores_created_at ON scores(created_at DESC);

-- 4. Habilitar RLS
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- 5. Crear política permisiva (la autenticación se maneja en la aplicación)
CREATE POLICY "Allow all operations for authenticated users"
  ON scores
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 6. Comentarios en la tabla
COMMENT ON TABLE scores IS 'Almacena las puntuaciones de los juegos de fluidez verbal';
COMMENT ON COLUMN scores.game_type IS 'Tipo de juego: karaoke-fluido, fonema-inicial, silabas-sonidos, daf-fluency, ejercicios-fonema';
COMMENT ON COLUMN scores.score IS 'Puntuación obtenida en el juego';
COMMENT ON COLUMN scores.attempts IS 'Número de intentos realizados';
COMMENT ON COLUMN scores.metadata IS 'Información adicional del juego en formato JSON';
