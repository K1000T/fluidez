# 🚀 Pruebas de Carga con Gráficos

Este directorio contiene las pruebas de rendimiento y carga para Fluidez Activa.

## 📋 Requisitos Previos

1. **El servidor debe estar corriendo**: Abre una terminal y ejecuta:
   ```bash
   npm run dev
   ```

2. Las pruebas se ejecutarán contra `http://localhost:3000`

## 🎯 Tipos de Pruebas Disponibles

### 1. Prueba Rápida (Recomendada para empezar)

```bash
npm run test:load:quick
```

**Características:**
- ⏱️ Duración: 15 segundos
- 👥 Usuarios simultáneos: 50
- 📊 Genera un archivo HTML con gráficos interactivos
- ✅ Ideal para pruebas rápidas durante desarrollo

**Salida:**
- Métricas en consola
- Archivo HTML: `performance/quick-load-test-[timestamp].html`

### 2. Prueba Completa (Todos los endpoints)

```bash
npm run test:load
```

**Características:**
- ⏱️ Duración: 30 segundos por endpoint
- 👥 Usuarios simultáneos: 100
- 🎯 Prueba múltiples endpoints:
  - Página principal (`/`)
  - Ejercicios de fonemas (`/ejercicios-fonema`)
  - API de sesión (`/api/me`)
  - Visualización (`/visualizacion`)
- 📊 Genera un reporte HTML por cada endpoint

**Salida:**
- Reportes HTML individuales por endpoint
- Resumen consolidado en consola

## 📊 Métricas Medidas

Las pruebas miden:

### Latencia
- **Mínima**: Mejor tiempo de respuesta
- **Media**: Promedio de tiempos de respuesta
- **p50 (Mediana)**: 50% de requests más rápidos
- **p95**: 95% de requests más rápidos que este valor
- **p99**: 99% de requests más rápidos que este valor
- **Máxima**: Peor caso observado

### Throughput
- **Requests/segundo**: Capacidad de procesamiento
- **MB/segundo**: Ancho de banda utilizado

### Errores
- **Errores non-2xx**: Respuestas con códigos de error
- **Timeouts**: Peticiones que excedieron el tiempo límite

## 📈 Visualización de Resultados

Los reportes HTML incluyen:

### 1. Tarjetas de Métricas
- Requests totales
- Requests por segundo
- Latencia promedio
- Latencia P95
- Throughput
- Tasa de éxito

### 2. Gráfico de Distribución de Latencia
Muestra la distribución de tiempos de respuesta desde el mínimo hasta el máximo.

### 3. Gráfico de Percentiles
Visualiza cómo se distribuyen los tiempos de respuesta por percentiles.

### 4. Gráfico de Throughput
Muestra la evolución del throughput a lo largo del tiempo.

## 🎯 Interpretación de Resultados

### ✅ Rendimiento EXCELENTE
- Latencia promedio < 100ms
- Requests/segundo > 100
- Tasa de éxito > 99%
- Sin errores ni timeouts

### 👍 Rendimiento BUENO
- Latencia promedio < 300ms
- Requests/segundo > 50
- Tasa de éxito > 95%
- Errores ocasionales

### ⚠️ Rendimiento ACEPTABLE
- Latencia promedio < 1000ms
- Requests/segundo > 20
- Tasa de éxito > 90%
- Algunos errores presentes

### ❌ NECESITA MEJORAS
- Latencia promedio > 1000ms
- Requests/segundo < 20
- Tasa de éxito < 90%
- Muchos errores o timeouts

## 🔧 Configuración Personalizada

### Modificar Parámetros de la Prueba Rápida

Edita `quick-load-test.js`:

```javascript
const config = {
  url: 'http://localhost:3000',
  connections: 50,        // Cambia el número de usuarios
  duration: 15,           // Cambia la duración en segundos
  pipelining: 5          // Requests por conexión
};
```

### Modificar Parámetros de la Prueba Completa

Edita `load-test.js`:

```javascript
const loadTestConfig = {
  url: 'http://localhost:3000',
  connections: 100,       // Usuarios simultáneos
  duration: 30,           // Duración por endpoint
  pipelining: 10,        // Requests por conexión
  title: 'Prueba de Carga - Fluidez Activa'
};
```

### Agregar Nuevos Endpoints

En `load-test.js`, agrega al array `endpoints`:

```javascript
const endpoints = [
  { path: '/', name: 'Página Principal' },
  { path: '/tu-nuevo-endpoint', name: 'Tu Endpoint', method: 'GET' }
];
```

## 📝 Ejemplo de Uso Completo

```bash
# Terminal 1: Iniciar el servidor
npm run dev

# Terminal 2: Esperar que el servidor inicie, luego ejecutar prueba
npm run test:load:quick
```

Después de que la prueba termine:
1. Se mostrará un resumen en la consola
2. Se generará un archivo HTML en `performance/`
3. Abre el archivo HTML en tu navegador para ver los gráficos

## 🎨 Gráficos Interactivos

Los reportes HTML incluyen gráficos interactivos usando Chart.js:
- **Hover**: Muestra valores exactos
- **Responsive**: Se adapta al tamaño de la pantalla
- **Colores**: Código de colores para identificar rápidamente problemas

## 🐛 Troubleshooting

### Error: ECONNREFUSED
**Problema**: El servidor no está corriendo
**Solución**: Asegúrate de ejecutar `npm run dev` primero

### Error: Timeout
**Problema**: El servidor tarda mucho en responder
**Soluciones**:
- Verifica que no hay otros procesos consumiendo recursos
- Reduce el número de conexiones concurrentes
- Aumenta el timeout en la configuración

### Latencias muy altas
**Posibles causas**:
- Servidor en modo desarrollo (es más lento que producción)
- Base de datos sin índices
- Demasiadas conexiones concurrentes
- Recursos del sistema limitados

## 📚 Más Información

- [Documentación de Autocannon](https://github.com/mcollina/autocannon)
- [Documentación de Chart.js](https://www.chartjs.org/)
- [Documentación de Clinic.js](https://clinicjs.org/)

## 🎯 Mejores Prácticas

1. **Ejecuta pruebas en condiciones similares**: Misma máquina, mismo estado del sistema
2. **Cierra aplicaciones innecesarias**: Para resultados más consistentes
3. **Ejecuta múltiples veces**: Toma el promedio de varias ejecuciones
4. **Prueba en producción**: Los resultados en desarrollo son más lentos
5. **Monitorea recursos**: CPU, memoria, disco durante las pruebas

## 📊 Ejemplo de Reporte

Cuando ejecutes la prueba, verás algo así en la consola:

```
╔════════════════════════════════════════════════════════╗
║  RESULTADOS DE LA PRUEBA                              ║
╚════════════════════════════════════════════════════════╝

📊 MÉTRICAS PRINCIPALES:
   ✓ Requests totales: 15,234
   ✓ Requests/segundo: 1,015.60
   ✓ Latencia promedio: 48.52ms
   ✓ Latencia p50: 45.12ms
   ✓ Latencia p95: 89.23ms
   ✓ Latencia p99: 125.45ms
   ✓ Latencia máxima: 342.11ms
   ✓ Throughput: 12.45 MB/s
   ✓ Errores (non-2xx): 0
   ✓ Timeouts: 0

🎯 EVALUACIÓN:
   ✅ EXCELENTE - Latencia muy baja (<100ms)
   ✅ Excelente throughput (>100 req/s)
   ✅ Sin errores detectados

📈 GRÁFICO GENERADO:
   Archivo: C:\...\performance\quick-load-test-2025-11-18.html
   Abre el archivo en tu navegador para ver los gráficos interactivos
```

Y un hermoso reporte HTML con gráficos coloridos y animados! 🎉
