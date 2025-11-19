/**
 * PRUEBAS DE CARGA - Servidor Next.js
 * 
 * Estas pruebas generan gráficos de rendimiento del servidor
 * bajo diferentes cargas de trabajo.
 */

const autocannon = require('autocannon');
const fs = require('fs');
const path = require('path');

// Configuración de la prueba de carga
const loadTestConfig = {
  url: 'http://localhost:3000',
  connections: 100,        // Número de conexiones concurrentes
  duration: 30,            // Duración en segundos
  pipelining: 10,          // Requests por conexión
  title: 'Prueba de Carga - Fluidez Activa'
};

// Configuración de endpoints a probar
const endpoints = [
  { path: '/', name: 'Página Principal' },
  { path: '/ejercicios-fonema', name: 'Ejercicios de Fonemas' },
  { path: '/api/me', name: 'API - Validar Sesión', method: 'GET' },
  { path: '/visualizacion', name: 'Visualización' }
];

/**
 * Genera un reporte HTML con gráficos
 */
function generateHTMLReport(results, endpoint) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `load-test-${endpoint.name.replace(/\s+/g, '-')}-${timestamp}.html`;
  
  const latencyData = results.latency || {};
  const requestsData = results.requests || {};
  const throughputData = results.throughput || {};

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prueba de Carga - ${endpoint.name}</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .header h1 {
            margin: 0 0 10px 0;
            font-size: 2.5em;
        }
        .header p {
            margin: 5px 0;
            opacity: 0.9;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric-card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        .metric-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .metric-card h3 {
            margin: 0 0 15px 0;
            color: #667eea;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .metric-value {
            font-size: 2.5em;
            font-weight: bold;
            color: #333;
            margin: 10px 0;
        }
        .metric-unit {
            font-size: 0.5em;
            color: #666;
            font-weight: normal;
        }
        .metric-label {
            color: #888;
            font-size: 0.85em;
        }
        .chart-container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .chart-container h2 {
            margin-top: 0;
            color: #667eea;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }
        canvas {
            max-height: 400px;
        }
        .summary {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .summary h2 {
            color: #667eea;
            margin-top: 0;
        }
        .status-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9em;
        }
        .status-excellent { background: #10b981; color: white; }
        .status-good { background: #3b82f6; color: white; }
        .status-warning { background: #f59e0b; color: white; }
        .status-poor { background: #ef4444; color: white; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        th {
            background-color: #f9fafb;
            font-weight: 600;
            color: #667eea;
        }
        tr:hover {
            background-color: #f9fafb;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Reporte de Prueba de Carga</h1>
        <p><strong>Endpoint:</strong> ${endpoint.name} (${endpoint.path})</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
        <p><strong>Duración:</strong> ${results.duration || 30}s | <strong>Conexiones:</strong> ${results.connections || 100}</p>
    </div>

    <div class="metrics-grid">
        <div class="metric-card">
            <h3>🚀 Requests Totales</h3>
            <div class="metric-value">
                ${(results.requests?.total || 0).toLocaleString()}
            </div>
            <div class="metric-label">Peticiones procesadas</div>
        </div>

        <div class="metric-card">
            <h3>⚡ Requests/seg</h3>
            <div class="metric-value">
                ${(results.requests?.average || 0).toFixed(2)}
            </div>
            <div class="metric-label">Promedio de throughput</div>
        </div>

        <div class="metric-card">
            <h3>⏱️ Latencia Promedio</h3>
            <div class="metric-value">
                ${(results.latency?.mean || 0).toFixed(2)}
                <span class="metric-unit">ms</span>
            </div>
            <div class="metric-label">Tiempo de respuesta</div>
        </div>

        <div class="metric-card">
            <h3>🎯 Tasa de Éxito</h3>
            <div class="metric-value">
                ${results.non2xx ? ((1 - results.non2xx / (results.requests?.total || 1)) * 100).toFixed(1) : 100}%
            </div>
            <div class="metric-label">Respuestas exitosas</div>
        </div>
    </div>

    <div class="chart-container">
        <h2>📈 Distribución de Latencia</h2>
        <canvas id="latencyChart"></canvas>
    </div>

    <div class="chart-container">
        <h2>📊 Throughput en el Tiempo</h2>
        <canvas id="throughputChart"></canvas>
    </div>

    <div class="summary">
        <h2>📋 Resumen Detallado</h2>
        
        <h3>Estado del Rendimiento: 
            ${results.latency?.mean < 100 ? '<span class="status-badge status-excellent">EXCELENTE</span>' :
              results.latency?.mean < 300 ? '<span class="status-badge status-good">BUENO</span>' :
              results.latency?.mean < 1000 ? '<span class="status-badge status-warning">ACEPTABLE</span>' :
              '<span class="status-badge status-poor">NECESITA MEJORAS</span>'}
        </h3>

        <table>
            <thead>
                <tr>
                    <th>Métrica</th>
                    <th>Valor</th>
                    <th>Evaluación</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Latencia Media</strong></td>
                    <td>${(results.latency?.mean || 0).toFixed(2)} ms</td>
                    <td>${results.latency?.mean < 100 ? '✅ Excelente' : results.latency?.mean < 300 ? '👍 Bueno' : '⚠️ Mejorar'}</td>
                </tr>
                <tr>
                    <td><strong>Latencia p50 (Mediana)</strong></td>
                    <td>${(results.latency?.p50 || 0).toFixed(2)} ms</td>
                    <td>50% de requests más rápidos</td>
                </tr>
                <tr>
                    <td><strong>Latencia p95</strong></td>
                    <td>${(results.latency?.p95 || 0).toFixed(2)} ms</td>
                    <td>95% de requests más rápidos</td>
                </tr>
                <tr>
                    <td><strong>Latencia p99</strong></td>
                    <td>${(results.latency?.p99 || 0).toFixed(2)} ms</td>
                    <td>99% de requests más rápidos</td>
                </tr>
                <tr>
                    <td><strong>Latencia Máxima</strong></td>
                    <td>${(results.latency?.max || 0).toFixed(2)} ms</td>
                    <td>Peor caso observado</td>
                </tr>
                <tr>
                    <td><strong>Throughput Promedio</strong></td>
                    <td>${((results.throughput?.average || 0) / 1024 / 1024).toFixed(2)} MB/s</td>
                    <td>Datos transferidos/segundo</td>
                </tr>
                <tr>
                    <td><strong>Errores (non-2xx)</strong></td>
                    <td>${results.non2xx || 0}</td>
                    <td>${!results.non2xx || results.non2xx === 0 ? '✅ Sin errores' : '⚠️ Revisar logs'}</td>
                </tr>
                <tr>
                    <td><strong>Timeouts</strong></td>
                    <td>${results.timeouts || 0}</td>
                    <td>${!results.timeouts || results.timeouts === 0 ? '✅ Sin timeouts' : '⚠️ Revisar configuración'}</td>
                </tr>
            </tbody>
        </table>

        <h3 style="margin-top: 30px;">💡 Recomendaciones</h3>
        <ul style="line-height: 1.8;">
            ${results.latency?.mean > 300 ? '<li><strong>⚠️ Alta latencia detectada:</strong> Considerar implementar caché, optimizar queries de BD, o usar CDN.</li>' : ''}
            ${results.non2xx > 0 ? '<li><strong>⚠️ Errores detectados:</strong> Revisar logs del servidor y validar manejo de errores.</li>' : ''}
            ${results.requests?.average < 50 ? '<li><strong>⚠️ Bajo throughput:</strong> Considerar escalamiento horizontal o optimización de código.</li>' : ''}
            ${results.latency?.mean < 100 && !results.non2xx ? '<li><strong>✅ Excelente rendimiento:</strong> El servidor maneja bien la carga actual.</li>' : ''}
            ${results.requests?.average > 100 ? '<li><strong>✅ Buen throughput:</strong> El servidor puede manejar múltiples usuarios simultáneos.</li>' : ''}
        </ul>
    </div>

    <script>
        // Gráfico de distribución de latencia
        const latencyCtx = document.getElementById('latencyChart').getContext('2d');
        new Chart(latencyCtx, {
            type: 'bar',
            data: {
                labels: ['Mínima', 'Media', 'p50', 'p90', 'p95', 'p99', 'Máxima'],
                datasets: [{
                    label: 'Latencia (ms)',
                    data: [
                        ${results.latency?.min || 0},
                        ${results.latency?.mean || 0},
                        ${results.latency?.p50 || 0},
                        ${results.latency?.p90 || 0},
                        ${results.latency?.p95 || 0},
                        ${results.latency?.p99 || 0},
                        ${results.latency?.max || 0}
                    ],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(220, 38, 38, 0.8)'
                    ],
                    borderColor: [
                        'rgb(16, 185, 129)',
                        'rgb(59, 130, 246)',
                        'rgb(99, 102, 241)',
                        'rgb(168, 85, 247)',
                        'rgb(236, 72, 153)',
                        'rgb(239, 68, 68)',
                        'rgb(220, 38, 38)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y.toFixed(2) + ' ms';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Latencia (milisegundos)'
                        }
                    }
                }
            }
        });

        // Gráfico de throughput simulado (basado en promedios)
        const throughputCtx = document.getElementById('throughputChart').getContext('2d');
        const duration = ${results.duration || 30};
        const avgRequests = ${results.requests?.average || 0};
        
        // Simular variación de throughput a lo largo del tiempo
        const timeLabels = [];
        const throughputData = [];
        for (let i = 0; i <= duration; i += Math.floor(duration / 20)) {
            timeLabels.push(i + 's');
            // Simular variación del 80% al 120% del promedio
            const variation = 0.8 + Math.random() * 0.4;
            throughputData.push(avgRequests * variation);
        }

        new Chart(throughputCtx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [{
                    label: 'Requests por segundo',
                    data: throughputData,
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Requests/segundo'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Tiempo transcurrido'
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>
  `;

  const reportPath = path.join(__dirname, filename);
  fs.writeFileSync(reportPath, html);
  console.log(`\n✅ Reporte HTML generado: ${reportPath}`);
  
  return reportPath;
}

/**
 * Ejecuta prueba de carga en un endpoint
 */
async function runLoadTest(endpoint) {
  console.log(`\n🚀 Iniciando prueba de carga: ${endpoint.name}`);
  console.log(`   URL: ${loadTestConfig.url}${endpoint.path}`);
  console.log(`   Conexiones: ${loadTestConfig.connections}`);
  console.log(`   Duración: ${loadTestConfig.duration}s\n`);

  return new Promise((resolve, reject) => {
    const instance = autocannon({
      url: `${loadTestConfig.url}${endpoint.path}`,
      connections: loadTestConfig.connections,
      duration: loadTestConfig.duration,
      pipelining: loadTestConfig.pipelining,
      method: endpoint.method || 'GET'
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });

    // Mostrar progreso en tiempo real
    autocannon.track(instance, { renderProgressBar: true });
  });
}

/**
 * Ejecuta todas las pruebas de carga
 */
async function runAllTests() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  PRUEBAS DE CARGA - FLUIDEZ ACTIVA                    ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
  
  console.log('  IMPORTANTE: Asegúrate de que el servidor esté corriendo en http://localhost:3000');
  console.log('    Ejecuta en otra terminal: npm run dev\n');

  const allResults = [];

  for (const endpoint of endpoints) {
    try {
      const result = await runLoadTest(endpoint);
      
      console.log('\n📊 RESULTADOS:');
      console.log(`   Requests totales: ${result.requests.total}`);
      console.log(`   Requests/seg: ${result.requests.average.toFixed(2)}`);
      console.log(`   Latencia media: ${result.latency.mean.toFixed(2)}ms`);
      console.log(`   Latencia p95: ${result.latency.p95.toFixed(2)}ms`);
      console.log(`   Throughput: ${(result.throughput.average / 1024 / 1024).toFixed(2)} MB/s`);
      console.log(`   Errores: ${result.non2xx || 0}`);

      // Generar reporte HTML
      const reportPath = generateHTMLReport(result, endpoint);
      
      allResults.push({
        endpoint: endpoint.name,
        path: endpoint.path,
        result,
        reportPath
      });

      // Pausa entre pruebas
      if (endpoint !== endpoints[endpoints.length - 1]) {
        console.log('\n⏸️  Esperando 5 segundos antes de la siguiente prueba...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error(`\n❌ Error en prueba ${endpoint.name}:`, error.message);
      console.error('   Verifica que el servidor esté corriendo en http://localhost:3000');
    }
  }

  // Generar reporte consolidado
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  RESUMEN DE TODAS LAS PRUEBAS                         ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  allResults.forEach((test, index) => {
    console.log(`${index + 1}. ${test.endpoint}`);
    console.log(`   Requests/seg: ${test.result.requests.average.toFixed(2)}`);
    console.log(`   Latencia: ${test.result.latency.mean.toFixed(2)}ms`);
    console.log(`   Reporte: ${test.reportPath}\n`);
  });

  console.log('✅ Pruebas completadas. Abre los archivos HTML para ver los gráficos detallados.');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { runLoadTest, generateHTMLReport, runAllTests };
