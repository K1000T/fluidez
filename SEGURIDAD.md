# 🔒 SEGURIDAD - Configuración de Variables de Entorno

## ⚠️ IMPORTANTE: Protección de Credenciales

Este proyecto **NO incluye credenciales reales** en el repositorio por razones de seguridad.

### 🚫 Archivos que NUNCA deben subirse a Git:

- `.env`
- `.env.local`
- `prod.ps1`
- `dev.ps1`

Estos archivos están protegidos en `.gitignore` y contienen información sensible como:
- API Keys de Supabase
- API Keys de OpenAI/Groq
- Contraseñas de bases de datos
- Tokens de autenticación

---

## 📋 Configuración Inicial (Para desarrolladores)

### 1. Copia los archivos de ejemplo:

```bash
# En Windows PowerShell
Copy-Item .env.example .env.local
Copy-Item prod.ps1.example prod.ps1
Copy-Item dev.ps1.example dev.ps1
```

### 2. Obtén tus credenciales:

#### Supabase (Base de datos y Storage)
1. Ve a https://supabase.com/dashboard
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **Settings** → **API**:
   - Copia `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copia `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copia `service_role` key → `SUPABASE_SERVICE_KEY`
4. Ve a **Settings** → **Database**:
   - Copia la cadena de conexión → `POSTGRES_URL` y `DATABASE_URL`

#### OpenAI (Transcripción de audio)
1. Ve a https://platform.openai.com/api-keys
2. Crea una nueva API key
3. Cópiala → `OPENAI_API_KEY`

#### Resend (Emails) - OPCIONAL
1. Ve a https://resend.com/api-keys
2. Crea una nueva API key (plan gratuito disponible)
3. Cópiala → `RESEND_API_KEY`

### 3. Completa los archivos con tus credenciales:

Edita `.env.local`, `prod.ps1` y `dev.ps1` reemplazando los valores de ejemplo con tus credenciales reales.

---

## 🔐 Qué hacer si expusiste credenciales por error

Si accidentalmente subiste credenciales a GitHub:

### 1. **REVOCA INMEDIATAMENTE las API keys comprometidas:**

- **Supabase**: Dashboard → Settings → API → Reset keys
- **OpenAI**: https://platform.openai.com/api-keys → Revoke key
- **Resend**: https://resend.com/api-keys → Delete key

### 2. **Elimina las credenciales del historial de Git:**

```bash
# Elimina archivos del repositorio (pero no de tu disco local)
git rm --cached .env prod.ps1 dev.ps1

# Commit y push forzado
git commit -m "Remove sensitive credentials"
git push -f origin main
```

### 3. **Genera nuevas API keys** y actualiza tus archivos locales

---

## ✅ Buenas Prácticas de Seguridad

1. **Nunca** compartas archivos `.env` o `.ps1` con credenciales
2. **Siempre** verifica `.gitignore` antes de hacer commit
3. **Usa** variables de entorno en producción (Vercel, Netlify, etc.)
4. **Revisa** el comando `git status` antes de hacer `git add`
5. **Mantén** tus API keys en un gestor de contraseñas

---

## 📚 Más Información

- [Documentación de Supabase](https://supabase.com/docs)
- [API Keys de OpenAI](https://platform.openai.com/docs/quickstart)
- [Variables de entorno en Next.js](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
