# Guía de Configuración - Fluidez Activa

## Problemas Corregidos

### 1. ✅ DAF (Delayed Auditory Feedback)
- **Problema**: El delay no funcionaba correctamente
- **Solución**: Se corrigió la implementación del AudioContext para evitar cancelación de eco y mejorar la calidad del delay
- **Cambios**: Configuración de audio sin `echoCancellation`, `noiseSuppression` y `autoGainControl`

### 2. ✅ Guardado de Audio en Supabase
- **Problema**: Los audios no se guardaban en Supabase
- **Solución**: 
  - Corregido el método `getPublicUrl()` en la API
  - Añadido logging para debugging
  - Mejorado el manejo de errores
  - Guardado local adicional en localStorage como backup

### 3. ✅ Reproductor de Audio
- **Problema**: El reproductor no funcionaba bien
- **Solución**: Mejorado el estilo visual y la funcionalidad del reproductor HTML5

### 4. ✅ Gráficas
- **Problema**: Las gráficas no se entendían bien
- **Solución**: 
  - Gráfica de progreso mejorada con áreas rellenas, valores en puntos, mejor legibilidad
  - Espectrograma ya funcionaba correctamente

### 5. ✅ Exportación a Excel
- **Problema**: Error al exportar datos
- **Solución**: Agregada variable `avgWPM` que faltaba en el cálculo

### 6. ✅ Bordes en Ejercicios de Fonemas
- **Problema**: Bordes con colores inconsistentes
- **Solución**: Cambiados todos los bordes a color ámbar (#F7C873) para consistencia visual

### 7. ✅ Botón Guardar Progreso en Juego de Fonemas
- **Problema**: No había forma de guardar progreso durante el juego
- **Solución**: Agregado botón "Guardar Progreso" con feedback visual

### 8. ✅ Más Ejercicios de Fonemas
- **Problema**: Los fonemas se repetían mucho
- **Solución**: Expandida la lista de fonemas de 13 a 23 opciones (B, C, D, F, G, J, L, M, N, Ñ, P, R, S, T, CH, LL, V, Z, K, Q, Y, W, X)

### 9. ✅ Más Sílabas y Sonidos
- **Problema**: Pocas palabras en el juego de sílabas
- **Solución**: Expandida de 20 a más de 120 palabras organizadas por fonemas

### 10. ✅ Frases Mejoradas en Karaoke
- **Problema**: Frases muy cortas y mecánicas
- **Solución**: Agregadas más de 80 frases nuevas incluyendo:
  - Frases motivacionales
  - Citas famosas
  - Fragmentos de poemas
  - Trabalenguas
  - Afirmaciones positivas
  - Frases de sabiduría popular

---

## Configuración Necesaria de Supabase

### Paso 1: Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_KEY=tu-service-key-aqui
```

### Paso 2: Crear el Bucket de Audios

En tu proyecto de Supabase:

1. Ve a **Storage** en el panel izquierdo
2. Haz clic en **New bucket**
3. Nombre del bucket: `audios`
4. Marca como **Public** si quieres que los audios sean accesibles públicamente
5. Haz clic en **Create bucket**

### Paso 3: Configurar Políticas de Storage (RLS)

Ve a Storage > audios > Policies y crea estas políticas:

**Para insertar (INSERT):**
```sql
CREATE POLICY "Permitir insertar audios autenticados"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'audios');
```

**Para leer (SELECT):**
```sql
CREATE POLICY "Permitir leer audios públicos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'audios');
```

---

## Configuración de OpenAI (para transcripción)

### Paso 1: Obtener API Key

1. Ve a https://platform.openai.com/api-keys
2. Crea una nueva API key
3. Cópiala inmediatamente (solo se muestra una vez)

### Paso 2: Agregar a Variables de Entorno

Agrega a tu archivo `.env.local`:

```env
OPENAI_API_KEY=sk-tu-clave-aqui
```

### Paso 3: Verificar Créditos

- La transcripción usa Whisper API
- Cuesta ~$0.006 por minuto de audio
- Asegúrate de tener créditos en tu cuenta de OpenAI

---

## Solución a Errores Comunes

### Error: "Bucket not found"

**Causa**: El bucket 'audios' no existe en Supabase
**Solución**: Sigue el Paso 2 de configuración de Supabase arriba

### Error: "OPENAI_API_KEY missing"

**Causa**: Falta la variable de entorno
**Solución**: 
1. Agrega `OPENAI_API_KEY` a `.env.local`
2. Reinicia el servidor de desarrollo: `npm run dev`

### Error: "Permission denied"

**Causa**: Las políticas RLS no están configuradas
**Solución**: Configura las políticas del Paso 3 de Supabase

### Los audios no se guardan

**Verificar**:
1. Revisa la consola del navegador (F12) para ver errores
2. Verifica que las variables de entorno estén bien configuradas
3. Comprueba que el bucket exista y sea público (o tenga las políticas correctas)
4. Los audios se guardan también en localStorage como backup

---

## Comandos Útiles

### Iniciar el servidor de desarrollo
```bash
npm run dev
```

### Verificar variables de entorno
```bash
npm run dev
# Busca en los logs: [upload-to-supabase] o [transcribe]
```

### Limpiar caché de Next.js
```bash
rm -rf .next
npm run dev
```

---

## Notas Adicionales

- **DAF funciona mejor con audífonos**: Para evitar retroalimentación
- **Transcripción en español**: El API está configurado con `language: 'es'`
- **Progreso local**: Se guarda en localStorage del navegador como backup
- **Navegadores compatibles**: Chrome, Edge, Safari (últimas versiones)

---

## Contacto y Soporte

Si encuentras algún problema adicional:

1. Revisa la consola del navegador (F12)
2. Revisa los logs del servidor (terminal donde corre `npm run dev`)
3. Verifica que todas las variables de entorno estén configuradas
4. Asegúrate de tener la última versión del código

---

**Última actualización**: Noviembre 2025
