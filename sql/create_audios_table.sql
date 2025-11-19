-- Crear tabla para almacenar metadatos de audios
-- Ejecutar en Supabase SQL Editor

-- Primero eliminar si existe (solo para desarrollo)
DROP TABLE IF EXISTS public.audios CASCADE;

CREATE TABLE public.audios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Información del archivo
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE, -- Path en Storage
  file_url TEXT NOT NULL, -- URL pública
  mime_type TEXT DEFAULT 'audio/webm',
  file_size INTEGER, -- Tamaño en bytes
  
  -- Información del audio
  source TEXT NOT NULL CHECK (source IN ('daf', 'espectrograma')), -- De dónde viene
  duration DECIMAL(10, 2), -- Duración en segundos
  word_count INTEGER DEFAULT 0, -- Cantidad de palabras
  wpm INTEGER, -- Palabras por minuto (calculado)
  
  -- Transcripción y análisis
  transcript TEXT, -- Texto transcrito
  
  -- Configuración (para DAF)
  delay_ms INTEGER, -- Delay aplicado en DAF
  playback_rate DECIMAL(3, 2) DEFAULT 1.0, -- Velocidad de reproducción
  
  -- Metadatos de usuario (preparado para futura autenticación)
  user_id UUID -- NULL por ahora, después se puede vincular con auth.users
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_audios_created_at ON public.audios(created_at DESC);
CREATE INDEX idx_audios_source ON public.audios(source);
CREATE INDEX idx_audios_user_id ON public.audios(user_id) WHERE user_id IS NOT NULL;

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.audios ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso
-- Lectura pública (cualquiera puede ver)
CREATE POLICY public_read_audios_table
ON public.audios
FOR SELECT
TO public
USING (true);

-- Inserción pública (cualquiera puede crear)
CREATE POLICY public_insert_audios_table
ON public.audios
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Actualización solo para autenticados (preparado para futuro)
CREATE POLICY auth_update_own_audios_table
ON public.audios
FOR UPDATE
TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL);

-- Eliminación solo para autenticados
CREATE POLICY auth_delete_own_audios_table
ON public.audios
FOR DELETE
TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL);

-- Comentarios para documentación
COMMENT ON TABLE public.audios IS 'Almacena metadatos de grabaciones de audio de la aplicación Fluidez Activa';
COMMENT ON COLUMN public.audios.wpm IS 'Palabras por minuto calculadas automáticamente';
COMMENT ON COLUMN public.audios.delay_ms IS 'Delay en milisegundos aplicado durante grabación DAF';

-- Verificar que la tabla se creó correctamente
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'audios'
ORDER BY ordinal_position;
