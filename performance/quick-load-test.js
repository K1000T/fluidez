/**
 * PRUEBA DE CARGA RÁPIDA
 * Versión simplificada para pruebas rápidas con gráficos
 */

const autocannon = require('autocannon');
const fs = require('fs');
const path = require('path');

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║  PRUEBA DE CARGA RÁPIDA - FLUIDEZ ACTIVA              ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

console.log(' Objetivo: Probar el rendimiento de la página principal');
console.log('⏱  Duración: 15 segundos');
console.log(' Usuarios simulados: 50 conexiones concurrentes\n');

console.log('  IMPORTANTE: El servidor debe estar corriendo en http://localhost:3000');
console.log('    Si no está corriendo, ejecuta en otra terminal: npm run dev\n');

const config = {
  url: 'http://localhost:3000',
  connections: 50,
  duration: 15,
  pipelining: 5
};

console.log(' Iniciando prueba de carga...\n');

const instance = autocannon(config, (err, result) => {
  if (err) {
    console.error('❌ Error al ejecutar la prueba:', err.message);
    console.error('   Asegúrate de que el servidor esté corriendo en http://localhost:3000');
    process.exit(1);
  }

  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  RESULTADOS DE LA PRUEBA                              ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  console.log(' MÉTRICAS PRINCIPALES:');
  console.log(`   ✓ Requests totales: ${result.requests?.total?.toLocaleString() || 0}`);
  console.log(`   ✓ Requests/segundo: ${result.requests?.average?.toFixed(2) || '0.00'}`);
  console.log(`   ✓ Latencia promedio: ${result.latency?.mean?.toFixed(2) || '0.00'}ms`);
  console.log(`   ✓ Latencia p50: ${result.latency?.p50?.toFixed(2) || '0.00'}ms`);
  console.log(`   ✓ Latencia p95: ${result.latency?.p95?.toFixed(2) || '0.00'}ms`);
  console.log(`   ✓ Latencia p99: ${result.latency?.p99?.toFixed(2) || '0.00'}ms`);
  console.log(`   ✓ Latencia máxima: ${result.latency?.max?.toFixed(2) || '0.00'}ms`);
  console.log(`   ✓ Throughput: ${((result.throughput?.average || 0) / 1024 / 1024).toFixed(2)} MB/s`);
  console.log(`   ✓ Errores (non-2xx): ${result.non2xx || 0}`);
  console.log(`   ✓ Timeouts: ${result.timeouts || 0}\n`);

  // Evaluación del rendimiento
  console.log(' EVALUACIÓN:');
  const meanLatency = result.latency?.mean || 0;
  if (meanLatency < 100) {
    console.log('   ✅ EXCELENTE - Latencia muy baja (<100ms)');
  } else if (meanLatency < 300) {
    console.log('   👍 BUENO - Latencia aceptable (<300ms)');
  } else if (meanLatency < 1000) {
    console.log('   ⚠️  ACEPTABLE - Latencia alta (300-1000ms)');
  } else {
    console.log('   ❌ NECESITA MEJORAS - Latencia muy alta (>1000ms)');
  }

  if (result.requests.average > 100) {
    console.log('   ✅ Excelente throughput (>100 req/s)');
  } else if (result.requests.average > 50) {
    console.log('   👍 Buen throughput (>50 req/s)');
  } else {
    console.log('   ⚠️  Bajo throughput (<50 req/s)');
  }

  if (!result.non2xx || result.non2xx === 0) {
    console.log('   ✅ Sin errores detectados');
  } else {
    console.log(`   ⚠️  ${result.non2xx} errores detectados`);
  }

  // Generar gráfico HTML
  const html = generateHTMLReport(result);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `quick-load-test-${timestamp}.html`;
  const reportPath = path.join(__dirname, filename);
  
  fs.writeFileSync(reportPath, html);
  
  console.log(`\n📈 GRÁFICO GENERADO:`);
  console.log(`   Archivo: ${reportPath}`);
  console.log(`   Abre el archivo en tu navegador para ver los gráficos interactivos\n`);
  
  console.log('✨ Prueba completada exitosamente!');
});

// Mostrar progreso
autocannon.track(instance, { renderProgressBar: true });

function generateHTMLReport(results) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prueba de Carga Rápida - Fluidez Activa</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            margin-bottom: 30px;
            text-align: center;
        }
        .header h1 {
            color: #667eea;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .header .subtitle {
            color: #666;
            font-size: 1.1em;
        }
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric-card {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        .metric-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #667eea, #764ba2);
        }
        .metric-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .metric-icon {
            font-size: 3em;
            margin-bottom: 15px;
        }
        .metric-label {
            color: #888;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }
        .metric-value {
            font-size: 3em;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .metric-unit {
            font-size: 0.4em;
            color: #666;
        }
        .chart-section {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            margin-bottom: 30px;
        }
        .chart-section h2 {
            color: #667eea;
            margin-bottom: 30px;
            font-size: 1.8em;
        }
        canvas {
            max-height: 400px;
        }
        .status-badge {
            display: inline-block;
            padding: 10px 25px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 1.1em;
            margin: 20px 0;
        }
        .status-excellent { background: linear-gradient(135deg, #10b981, #059669); color: white; }
        .status-good { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; }
        .status-warning { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; }
        .summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 20px;
        }
        .summary-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        .summary-item strong {
            color: #667eea;
            display: block;
            margin-bottom: 5px;
        }
        @media (max-width: 768px) {
            .metrics { grid-template-columns: 1fr; }
            .summary-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Prueba de Carga - Fluidez Activa</h1>
            <p class="subtitle">${new Date().toLocaleString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
            <div style="margin-top: 20px;">
                ${results.latency.mean < 100 
                    ? '<span class="status-badge status-excellent">🎉 RENDIMIENTO EXCELENTE</span>'
                    : results.latency.mean < 300 
                    ? '<span class="status-badge status-good">👍 BUEN RENDIMIENTO</span>'
                    : '<span class="status-badge status-warning">⚠️ RENDIMIENTO ACEPTABLE</span>'
                }
            </div>
        </div>

        <div class="metrics">
            <div class="metric-card">
                <div class="metric-icon">🎯</div>
                <div class="metric-label">Requests Totales</div>
                <div class="metric-value">${results.requests?.total?.toLocaleString() || 0}</div>
            </div>

            <div class="metric-card">
                <div class="metric-icon">⚡</div>
                <div class="metric-label">Requests por Segundo</div>
                <div class="metric-value">
                    ${results.requests?.average?.toFixed(1) || '0.0'}
                    <span class="metric-unit">req/s</span>
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-icon">⏱️</div>
                <div class="metric-label">Latencia Promedio</div>
                <div class="metric-value">
                    ${results.latency?.mean?.toFixed(1) || '0.0'}
                    <span class="metric-unit">ms</span>
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-icon">📈</div>
                <div class="metric-label">Latencia P95</div>
                <div class="metric-value">
                    ${results.latency?.p95?.toFixed(1) || results.latency?.p975?.toFixed(1) || '0.0'}
                    <span class="metric-unit">ms</span>
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-icon">💾</div>
                <div class="metric-label">Throughput</div>
                <div class="metric-value">
                    ${((results.throughput?.average || 0) / 1024 / 1024).toFixed(2)}
                    <span class="metric-unit">MB/s</span>
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-icon">${!results.non2xx ? '✅' : '⚠️'}</div>
                <div class="metric-label">Tasa de Éxito</div>
                <div class="metric-value">
                    ${((1 - (results.non2xx || 0) / (results.requests?.total || 1)) * 100).toFixed(1)}
                    <span class="metric-unit">%</span>
                </div>
            </div>
        </div>

        <div class="chart-section">
            <h2>📊 Distribución de Latencia</h2>
            <canvas id="latencyChart"></canvas>
        </div>

        <div class="chart-section">
            <h2>📈 Comparativa de Percentiles</h2>
            <canvas id="percentilesChart"></canvas>
        </div>

        <div class="chart-section">
            <h2>📋 Resumen Detallado</h2>
            <div class="summary-grid">
                <div class="summary-item">
                    <strong>Conexiones Concurrentes</strong>
                    ${results.connections} usuarios simultáneos
                </div>
                <div class="summary-item">
                    <strong>Duración de la Prueba</strong>
                    ${results.duration} segundos
                </div>
                <div class="summary-item">
                    <strong>Latencia Mínima</strong>
                    ${results.latency.min.toFixed(2)} ms
                </div>
                <div class="summary-item">
                    <strong>Latencia Máxima</strong>
                    ${results.latency.max.toFixed(2)} ms
                </div>
                <div class="summary-item">
                    <strong>Errores Detectados</strong>
                    ${results.non2xx || 0} (${((results.non2xx || 0) / results.requests.total * 100).toFixed(2)}%)
                </div>
                <div class="summary-item">
                    <strong>Timeouts</strong>
                    ${results.timeouts || 0}
                </div>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 10px; border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-bottom: 15px;">💡 Interpretación de Resultados</h3>
                <ul style="color: #1e3a8a; line-height: 2;">
                    <li><strong>Latencia promedio < 100ms:</strong> Excelente experiencia de usuario</li>
                    <li><strong>Latencia P95 < 300ms:</strong> 95% de usuarios tienen buena experiencia</li>
                    <li><strong>Throughput > 50 req/s:</strong> El servidor puede manejar múltiples usuarios</li>
                    <li><strong>Tasa de éxito > 99%:</strong> Sistema estable y confiable</li>
                </ul>
            </div>
        </div>
    </div>

    <script>
        // Gráfico de latencia
        const latencyCtx = document.getElementById('latencyChart').getContext('2d');
        new Chart(latencyCtx, {
            type: 'bar',
            data: {
                labels: ['Mínima', 'Media', 'Mediana (p50)', 'p90', 'p95', 'p99', 'Máxima'],
                datasets: [{
                    label: 'Latencia (ms)',
                    data: [
                        ${results.latency.min},
                        ${results.latency.mean},
                        ${results.latency.p50},
                        ${results.latency.p90 || results.latency.p95},
                        ${results.latency.p95},
                        ${results.latency.p99},
                        ${results.latency.max}
                    ],
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => context.parsed.y.toFixed(2) + ' ms'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Milisegundos', font: { size: 14 } },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });

        // Gráfico de percentiles
        const percentilesCtx = document.getElementById('percentilesChart').getContext('2d');
        new Chart(percentilesCtx, {
            type: 'line',
            data: {
                labels: ['p50', 'p75', 'p90', 'p95', 'p97.5', 'p99'],
                datasets: [{
                    label: 'Latencia por Percentil',
                    data: [
                        ${results.latency.p50},
                        ${results.latency.p75 || ((results.latency.p50 + results.latency.p90) / 2)},
                        ${results.latency.p90 || results.latency.p95},
                        ${results.latency.p95},
                        ${results.latency.p975 || ((results.latency.p95 + results.latency.p99) / 2)},
                        ${results.latency.p99}
                    ],
                    borderColor: 'rgba(118, 75, 162, 1)',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: true },
                    tooltip: {
                        callbacks: {
                            label: (context) => context.parsed.y.toFixed(2) + ' ms'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Milisegundos', font: { size: 14 } },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                        title: { display: true, text: 'Percentil', font: { size: 14 } },
                        grid: { display: false }
                    }
                }
            }
        });
    </script>
</body>
</html>
  `;
}
