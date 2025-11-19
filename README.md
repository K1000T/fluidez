# 🎤 Fluidez Activa

**Plataforma web de apoyo terapéutico para personas con disfemia (tartamudez)**

## 📋 Descripción

Fluidez Activa es una aplicación web gratuita diseñada para ayudar a personas con disfemia a mejorar su fluidez verbal mediante herramientas terapéuticas validadas científicamente.

### ✨ Características Principales

- **🎧 DAF (Delayed Auditory Feedback)**: Retroalimentación auditiva retardada con delay ajustable (50-300ms)
- **📊 Visualización de Espectrogramas**: Análisis en tiempo real de frecuencias de voz con FFT
- **🎮 Juegos Interactivos**: 3 juegos con reconocimiento de voz para práctica de fluidez
- **📝 Transcripción Automática**: Conversión de audio a texto con IA (Groq/Whisper)
- **📈 Seguimiento de Progreso**: Gráficos de evolución, métricas PPM, exportación a Excel
- **🗣️ Ejercicios de Fonemas**: Práctica de 23 fonemas del español con ejemplos

## 🚀 Tecnologías

- **Frontend**: Next.js 16, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Base de Datos**: PostgreSQL (Supabase)
- **IA**: Groq API (Whisper Large v3)
- **Audio**: Web Audio API, MediaRecorder API, Speech Recognition API

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/fluidez-activa.git
cd fluidez-activa

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales

# Iniciar servidor de desarrollo
npm run dev
```

## ⚙️ Configuración

Ver documentación completa en:
- [LEEME-PRIMERO.md](./LEEME-PRIMERO.md)
- [INICIO-RAPIDO.md](./INICIO-RAPIDO.md)
- [CONFIGURACION.md](./CONFIGURACION.md)

## 🧪 Testing

```bash
# Pruebas unitarias
npm test

# Pruebas E2E
npm run test:e2e

# Cobertura
npm run test:coverage
```

Ver [TESTING-README.md](./TESTING-README.md) para más detalles.

## 📊 Resultados de Calidad

- **Cobertura de código**: 78.5%
- **Pruebas E2E**: 15/15 pasadas (100%)
- **Rendimiento**: >1000 req/s, latencia <100ms (p95)
- **Calidad**: Apto para producción

Ver [RESULTADOS-CONTROL-CALIDAD.md](./RESULTADOS-CONTROL-CALIDAD.md)

## 🎯 Casos de Uso

- **Personas con disfemia**: Práctica diaria de ejercicios terapéuticos
- **Logopedas/Fonoaudiólogos**: Seguimiento de progreso de pacientes
- **Educadores**: Apoyo en terapia del habla

## 📄 Licencia

Este proyecto es de código abierto para fines educativos y terapéuticos.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor abre un issue primero para discutir cambios mayores.

## 📧 Contacto

Para más información sobre el proyecto, consulta la documentación incluida.

---

**Desarrollado con ❤️ para la comunidad de personas con disfemia**
