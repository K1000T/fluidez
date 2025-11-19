-- Script para configurar políticas de almacenamiento en Supabase
-- Ejecutar en el SQL Editor de Supabase

-- 1. Verificar que el bucket 'Audios' existe (CON MAYÚSCULA)
-- Si no existe, créalo en Storage > Create Bucket con nombre 'Audios' y Public: ON

-- 2. Crear políticas de acceso público para el bucket 'Audios'

-- Política para permitir INSERT (subida) a usuarios autenticados
CREATE POLICY "Usuarios autenticados pueden subir audios"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'Audios');

-- Política para permitir SELECT (lectura) pública
CREATE POLICY "Lectura pública de audios"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'Audios');

-- Política para permitir UPDATE a usuarios autenticados (sus propios archivos)
CREATE POLICY "Usuarios pueden actualizar sus audios"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'Audios' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Política para permitir DELETE a usuarios autenticados (sus propios archivos)
CREATE POLICY "Usuarios pueden eliminar sus audios"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'Audios' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 3. Verificar políticas existentes
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

-- 4. Si necesitas hacer el bucket público (sin autenticación), ejecuta:
-- DROP POLICY IF EXISTS "Usuarios autenticados pueden subir audios" ON storage.objects;
-- 
-- CREATE POLICY "Cualquiera puede subir audios"
-- ON storage.objects
-- FOR INSERT
-- TO public
-- WITH CHECK (bucket_id = 'Audios');
