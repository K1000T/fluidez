# 🚀 Inicio Rápido - Fluidez Activa

## ⚡ TU CONFIGURACIÓN (Ya está lista!)

### ✅ Variables de Entorno Configuradas

El archivo `.env.local` ya está configurado con:
- ✅ Supabase URL
- ✅ Supabase Keys (anon y service)
- ✅ OpenAI API Key

### 🎯 Cómo Iniciar la Aplicación

**IMPORTANTE**: Usa este comando (no `npm run dev`):

```powershell
powershell -ExecutionPolicy Bypass -File .\dev.ps1
```

---

## 📋 Pasos para Completar la Configuración

### Paso 1: Verificar Configuración
```powershell
node scripts/verificar-configuracion.js
```

### Paso 2: Crear Bucket en Supabase
```powershell
node scripts/setup-supabase-bucket.js
```

### Paso 3: Configurar Políticas SQL

Ve a https://supabase.com/dashboard/project/llfnkdxldxxhyqfherno/sql/new

Y ejecuta este SQL:

```sql
-- Permitir lectura pública
CREATE POLICY "Permitir lectura pública de audios"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'audios');

-- Permitir inserción a todos
CREATE POLICY "Permitir insertar audios"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'audios');

-- Permitir actualización
CREATE POLICY "Permitir actualizar audios"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'audios');

-- Permitir eliminación
CREATE POLICY "Permitir eliminar audios"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'audios');
```

### Paso 4: Iniciar la Aplicación

```powershell
powershell -ExecutionPolicy Bypass -File .\dev.ps1
```

Abre http://localhost:3000

---

## ✅ Verificación Rápida

Prueba estas funcionalidades:

1. **DAF** → Graba tu voz → Debe guardar sin errores
2. **Espectrograma** → Graba → Debe mostrar gráficas
3. **Progreso** → Exportar a Excel → Debe funcionar
4. **Juegos** → Reconocimiento de voz → Debe funcionar

---

## 🐛 Si algo no funciona

### El audio no se guarda en Supabase
→ Ejecuta el Paso 2 y 3 (crear bucket y políticas SQL)

### Error de transcripción
→ Ya tienes la API key configurada, debería funcionar

### Error al iniciar
→ Asegúrate de usar `powershell -ExecutionPolicy Bypass -File .\dev.ps1`

---

## 📱 Tu Proyecto de Supabase

URL: https://supabase.com/dashboard/project/llfnkdxldxxhyqfherno

---

**¡Todo está configurado! Solo ejecuta los 4 pasos y estará funcionando! 🎉**
