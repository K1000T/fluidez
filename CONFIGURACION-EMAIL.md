# ✉️ Configuración de Email con Resend

## 📋 Pasos para configurar

### 1. Crear cuenta gratis en Resend

Ve a: https://resend.com/signup

**Plan gratuito incluye:**
- ✅ 3,000 emails/mes
- ✅ 100 emails/día
- ✅ Sin tarjeta de crédito requerida

### 2. Obtener API Key

1. Inicia sesión en https://resend.com
2. Ve a **API Keys** en el menú lateral
3. Haz clic en **Create API Key**
4. Dale un nombre (ej: "Fluidez Activa - Desarrollo")
5. Selecciona permisos: **Sending access**
6. Copia la API key que empieza con `re_...`

### 3. Configurar en `.env.local`

Abre el archivo `.env.local` y reemplaza:

```env
RESEND_API_KEY=tu_api_key_aqui
```

Por tu API key real:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. (Opcional) Verificar dominio propio

Por defecto, los emails se envían desde `onboarding@resend.dev` (dominio de prueba de Resend).

Para usar tu propio dominio (ej: `noreply@fluidezactiva.com`):

1. Ve a **Domains** en Resend
2. Haz clic en **Add Domain**
3. Ingresa tu dominio
4. Agrega los registros DNS que te proporcione Resend
5. Espera verificación (1-24 horas)
6. Actualiza el código en `app/api/forgot-password/route.js`:

```javascript
from: 'Fluidez Activa <noreply@tudominio.com>',
```

### 5. Probar funcionamiento

1. Reinicia el servidor de desarrollo:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\dev.ps1
   ```

2. Ve a http://localhost:3000/forgot-password

3. Ingresa un email válido registrado en tu sistema

4. Revisa:
   - **Console del servidor** - verás mensaje `✅ Email enviado a: usuario@ejemplo.com`
   - **Bandeja de entrada** del email ingresado

### 6. Template del email

El email que se envía incluye:
- ✅ Diseño HTML profesional
- ✅ Botón de acción con colores de la marca (#F7C873, #6B3F1D)
- ✅ Mensaje claro de expiración (5 minutos)
- ✅ Nota de seguridad
- ✅ Footer con nombre del proyecto

## 🔧 Troubleshooting

### No llega el email

1. **Verifica la API key** - asegúrate que está bien copiada en `.env.local`
2. **Revisa la consola** - debe decir `✅ Email enviado` no `⚠️ RESEND_API_KEY no configurada`
3. **Chequea spam** - el primer email puede caer en spam
4. **Verifica el email** - debe ser un email real que exista en tu tabla `users`

### Email va a spam

- Verifica tu dominio en Resend (opción 4)
- Configura SPF, DKIM y DMARC records
- Espera que Resend "caliente" tu dominio (envía emails gradualmente)

### Límite de emails

Plan gratuito: 100/día, 3000/mes

Si necesitas más:
- Resend Pro: $20/mes - 50,000 emails/mes
- Alternativa: SendGrid (100 emails/día gratis forever)

## 📊 Métricas

Puedes ver estadísticas en el dashboard de Resend:
- Emails enviados
- Emails entregados
- Emails abiertos (si habilitas tracking)
- Emails rebotados

## 🔐 Seguridad

- ✅ La API key está en `.env.local` (no se sube a Git)
- ✅ Los tokens expiran en 5 minutos
- ✅ Los tokens se hashean con SHA256 antes de guardar en DB
- ✅ No se revela si un email existe o no (por seguridad)

## 📝 Código implementado

**Archivo modificado:** `app/api/forgot-password/route.js`

**Cambios:**
1. ✅ Importación de Resend
2. ✅ Envío de email con HTML template
3. ✅ Manejo de errores de email (continúa aunque falle)
4. ✅ Fallback a console.log si no hay API key

**Dependencia agregada:** `resend` en `package.json`
