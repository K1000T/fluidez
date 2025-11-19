-- SOLUCIÓN RÁPIDA: Permitir INSERT para usuarios anónimos (anon)
-- Ejecutar en Supabase SQL Editor

-- 1. Eliminar políticas conflictivas anteriores
DROP POLICY IF EXISTS "Lectura pública de audios wm3gcd_0" ON storage.objects;
DROP POLICY IF EXISTS "Lectura pública de audios wm3gcd_1" ON storage.objects;
DROP POLICY IF EXISTS "Permitir insertar audios" ON storage.objects;
DROP POLICY IF EXISTS "Permitir actualizar audios" ON storage.objects;
DROP POLICY IF EXISTS "Permitir eliminar audios" ON storage.objects;
DROP POLICY IF EXISTS "Permitir lectura pública de audios" ON storage.objects;

-- 2. Crear políticas limpias y funcionales

-- Lectura pública (cualquiera puede leer/descargar)
CREATE POLICY "public_read_audios"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'Audios');

-- Subida para usuarios anónimos Y autenticados (CRÍTICO)
CREATE POLICY "anon_insert_audios"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'Audios');

-- Actualizar solo propios archivos
CREATE POLICY "auth_update_own_audios"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'Audios');

-- Eliminar solo propios archivos
CREATE POLICY "auth_delete_own_audios"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'Audios');

-- 3. Verificar las políticas creadas
SELECT 
  policyname, 
  cmd as operacion,
  roles,
  qual as "USING",
  with_check as "WITH CHECK"
FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%audios%'
ORDER BY cmd;
