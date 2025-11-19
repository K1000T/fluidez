"use client";
import React from 'react';

interface LinguisticMetrics {
  pvi: number | null;
  varcoV: number | null;
  percentV: number | null;
}

interface MetricsDisplayProps {
  transcript: string;
}

// Función para calcular métricas lingüísticas
function calculateMetrics(transcript: string): LinguisticMetrics {
  if (!transcript || transcript.trim().length === 0) {
    return { pvi: null, varcoV: null, percentV: null };
  }

  const vowels = 'aeiouáéíóúAEIOUÁÉÍÓÚ';
  const text = transcript.toLowerCase();
  
  // Calcular %V (Porcentaje Vocálico)
  const totalChars = text.replace(/\s+/g, '').length;
  const vowelCount = text.split('').filter(char => vowels.includes(char)).length;
  const percentV = totalChars > 0 ? (vowelCount / totalChars) * 100 : 0;

  // Extraer duraciones de vocales (simulado - en una implementación real necesitaríamos audio analysis)
  // Por ahora, usaremos la longitud de segmentos vocálicos como proxy
  const vocalicSegments: number[] = [];
  let currentVowelLength = 0;
  
  for (const char of text) {
    if (vowels.includes(char)) {
      currentVowelLength++;
    } else if (currentVowelLength > 0) {
      vocalicSegments.push(currentVowelLength);
      currentVowelLength = 0;
    }
  }
  if (currentVowelLength > 0) {
    vocalicSegments.push(currentVowelLength);
  }

  // Calcular VarcoV (Coeficiente de Variación Vocálica)
  let varcoV = null;
  if (vocalicSegments.length > 1) {
    const mean = vocalicSegments.reduce((a, b) => a + b, 0) / vocalicSegments.length;
    const variance = vocalicSegments.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / vocalicSegments.length;
    const stdDev = Math.sqrt(variance);
    varcoV = mean > 0 ? (stdDev / mean) * 100 : 0;
  }

  // Calcular PVI (Pairwise Variability Index)
  let pvi = null;
  if (vocalicSegments.length > 1) {
    let sum = 0;
    for (let i = 0; i < vocalicSegments.length - 1; i++) {
      const diff = Math.abs(vocalicSegments[i] - vocalicSegments[i + 1]);
      const avg = (vocalicSegments[i] + vocalicSegments[i + 1]) / 2;
      sum += avg > 0 ? diff / avg : 0;
    }
    pvi = (sum / (vocalicSegments.length - 1)) * 100;
  }

  return { pvi, varcoV, percentV };
}

export default function MetricsDisplay({ transcript }: MetricsDisplayProps) {
  const metrics = calculateMetrics(transcript);

  const MetricCard = ({ 
    title, 
    value, 
    unit, 
    description, 
    interpretation 
  }: { 
    title: string; 
    value: number | null; 
    unit: string; 
    description: string;
    interpretation: string;
  }) => (
    <div className="bg-white rounded-lg p-4 shadow-md border-2 border-[#F7C873] hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-[#6B3F1D] text-sm">{title}</h4>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          ?
        </span>
      </div>
      <div className="text-3xl font-bold text-[#6B3F1D] mb-2">
        {value !== null ? value.toFixed(2) : '--'}
        <span className="text-lg text-gray-500 ml-1">{unit}</span>
      </div>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      <div className="text-xs text-gray-500 italic bg-gray-50 p-2 rounded">
        {value !== null ? interpretation : 'Requiere más datos'}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-bold text-[#6B3F1D] mb-2 flex items-center gap-2">
          📊 Métricas de Ritmo y Fluidez
        </h3>
        <p className="text-sm text-gray-700">
          Estas métricas ayudan a evaluar el ritmo del habla y las características prosódicas. 
          Valores más altos generalmente indican mayor variabilidad rítmica.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="PVI (Índice de Variación de Pares)"
          value={metrics.pvi}
          unit="%"
          description="Mide la variabilidad en la duración de segmentos vocálicos consecutivos"
          interpretation={
            metrics.pvi !== null
              ? metrics.pvi > 50
                ? "Alta variabilidad (ritmo más marcado por acentos)"
                : "Baja variabilidad (ritmo más silábico)"
              : "Necesita transcripción"
          }
        />
        
        <MetricCard
          title="VarcoV (Coeficiente de Variación Vocálica)"
          value={metrics.varcoV}
          unit="%"
          description="Coeficiente de variación normalizado de las duraciones vocálicas"
          interpretation={
            metrics.varcoV !== null
              ? metrics.varcoV > 40
                ? "Alta variabilidad vocálica"
                : "Baja variabilidad vocálica"
              : "Necesita transcripción"
          }
        />
        
        <MetricCard
          title="%V (Porcentaje Vocálico)"
          value={metrics.percentV}
          unit="%"
          description="Proporción de material vocálico en el habla total"
          interpretation={
            metrics.percentV !== null
              ? metrics.percentV > 45
                ? "Alto contenido vocálico (típico del español)"
                : "Bajo contenido vocálico"
              : "Necesita transcripción"
          }
        />
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="text-xs text-gray-700">
          <strong>Nota:</strong> Estas métricas son estimaciones basadas en el texto transcrito. 
          Para mediciones precisas de duración, se requiere análisis acústico del audio original.
        </p>
      </div>
    </div>
  );
}
