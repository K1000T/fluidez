# 🚀 Inicio Rápido - Fluidez Activa

## ⚡ Configuración en 5 Pasos

### Paso 1: Instalar Dependencias

```bash
npm install
```

### Paso 2: Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
copy .env.local.example .env.local

# Editar .env.local con tus credenciales reales
```

Necesitas obtener:

**Supabase** (https://app.supabase.com):
- `NEXT_PUBLIC_SUPABASE_URL`: Settings → API → Project URL
- `SUPABASE_SERVICE_KEY`: Settings → API → service_role key

**OpenAI** (https://platform.openai.com/api-keys):
- `OPENAI_API_KEY`: Crear nueva API key

### Paso 3: Crear Bucket en Supabase

**Opción A - Automático (Recomendado):**
```bash
node scripts/setup-supabase-bucket.js
```

**Opción B - Manual:**
1. Ve a tu proyecto en Supabase
2. Storage → New bucket
3. Nombre: `audios`
4. Público: ✅ Yes
5. Create bucket

### Paso 4: Configurar Políticas SQL

Ve a SQL Editor en Supabase y ejecuta:

```sql
-- Permitir lectura pública
CREATE POLICY "Permitir lectura pública de audios"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'audios');

-- Permitir inserción
CREATE POLICY "Permitir insertar audios"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'audios');
```

### Paso 5: Iniciar la Aplicación

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

---

## ✅ Verificación Rápida

### Probar que todo funciona:

1. **DAF**: Ve a "DAF" → Graba tu voz → Debe guardar sin errores
2. **Espectrograma**: Ve a "Espectrograma y Visualización" → Graba → Debe mostrar gráficas
3. **Progreso**: Ve a "Progreso" → Debe mostrar gráfica y poder exportar a Excel
4. **Juegos**: Prueba "Juego fonemas" o "Sílabas y sonidos" → Debe funcionar el reconocimiento de voz

---

## 🐛 Solución Rápida de Problemas

### ❌ "Bucket not found"
→ No creaste el bucket. Ejecuta `node scripts/setup-supabase-bucket.js`

### ❌ "OPENAI_API_KEY missing"
→ Falta en `.env.local` o no reiniciaste el servidor

### ❌ "Permission denied" al guardar audio
→ Falta configurar las políticas SQL del Paso 4

### ❌ El audio no se guarda
→ Revisa la consola (F12) para ver el error específico

---

## 📱 Navegadores Compatibles

- ✅ Chrome/Edge (Recomendado)
- ✅ Safari
- ⚠️ Firefox (funciona pero con limitaciones en audio)

---

## 🎯 Características Principales

- **DAF (Delayed Auditory Feedback)**: Práctica con delay de audio
- **Espectrograma**: Análisis visual de voz
- **Ejercicios de Fonemas**: 23 fonemas diferentes
- **Juego de Sílabas**: 120+ palabras
- **Karaoke Fluido**: 80+ frases motivacionales
- **Progreso**: Gráficas y exportación a Excel

---

## 📞 ¿Necesitas Ayuda?

1. Lee `CONFIGURACION.md` para más detalles
2. Revisa la consola del navegador (F12)
3. Verifica los logs del servidor (terminal)

---

**¡Listo para empezar! 🎉**
