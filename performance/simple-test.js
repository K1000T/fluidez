const autocannon = require('autocannon');

console.log('🔍 Prueba simple de latencia...\n');

const instance = autocannon({
  url: 'http://localhost:3000',
  connections: 10, // Solo 10 conexiones
  duration: 10,    // 10 segundos
  pipelining: 1,   // Sin pipelining
}, (err, result) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  console.log('\n📊 RESULTADOS:');
  console.log(`Requests totales: ${result.requests?.total || 0}`);
  console.log(`Requests/segundo: ${result.requests?.average?.toFixed(2) || 0}`);
  console.log(`Latencia promedio: ${result.latency?.mean?.toFixed(2) || 0}ms`);
  console.log(`Latencia p50: ${result.latency?.p50?.toFixed(2) || 0}ms`);
  console.log(`Latencia p97.5: ${result.latency?.p97_5?.toFixed(2) || 0}ms`);
  console.log(`Latencia p99: ${result.latency?.p99?.toFixed(2) || 0}ms`);
  console.log(`Errores: ${result.non2xx || 0}`);
  console.log(`Timeouts: ${result.timeouts || 0}`);
});

autocannon.track(instance);
