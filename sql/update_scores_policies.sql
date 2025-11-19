-- Script para actualizar las políticas RLS de la tabla scores
-- Ejecuta esto en el SQL Editor de Supabase

-- 1. Eliminar políticas antiguas
DROP POLICY IF EXISTS "Users can view own scores" ON scores;
DROP POLICY IF EXISTS "Users can insert own scores" ON scores;
DROP POLICY IF EXISTS "Users can update own scores" ON scores;
DROP POLICY IF EXISTS "Users can delete own scores" ON scores;

-- 2. Crear política permisiva (la autenticación se maneja en la aplicación)
CREATE POLICY "Allow all operations for authenticated users"
  ON scores
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Verificar que RLS esté habilitado
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
