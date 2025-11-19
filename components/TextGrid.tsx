"use client";
import React, { useMemo } from 'react';

interface TextGridProps {
  transcript: string;
  duration: number; // Duración en segundos
}

interface Segment {
  text: string;
  start: number;
  end: number;
}

export default function TextGrid({ transcript, duration }: TextGridProps) {
  const segments = useMemo(() => {
    if (!transcript || duration <= 0) return [];

    const words = transcript.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];

    // Estimar tiempos de cada palabra basándose en la duración total
    const totalDuration = duration;
    const avgWordDuration = totalDuration / words.length;
    
    const segs: Segment[] = [];
    let currentTime = 0;

    words.forEach((word, index) => {
      // Variar un poco la duración basándose en la longitud de la palabra
      const wordLength = word.length;
      const durationFactor = Math.max(0.7, Math.min(1.3, wordLength / 5));
      const wordDuration = avgWordDuration * durationFactor;
      
      segs.push({
        text: word,
        start: currentTime,
        end: Math.min(currentTime + wordDuration, totalDuration)
      });
      
      currentTime += wordDuration;
    });

    // Normalizar para que el último segmento termine exactamente en duration
    if (segs.length > 0) {
      const scale = totalDuration / segs[segs.length - 1].end;
      segs.forEach(seg => {
        seg.start *= scale;
        seg.end *= scale;
      });
    }

    return segs;
  }, [transcript, duration]);

  if (segments.length === 0 || duration <= 0) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded p-4 text-center">
        <p className="text-gray-400 text-sm italic">
          Graba o carga audio con transcripción para ver la segmentación temporal
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-2 border-b-2 border-gray-300">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-gray-700">TextGrid - Segmentación Temporal</h4>
          <span className="text-xs text-gray-500">Duración: {duration.toFixed(2)}s</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative h-20 bg-white">
        {/* Time markers */}
        <div className="absolute top-0 left-0 right-0 h-4 border-b border-gray-200">
          {Array.from({ length: Math.ceil(duration) + 1 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 border-l border-gray-300"
              style={{ left: `${(i / duration) * 100}%` }}
            >
              <span className="absolute -top-3 -left-2 text-[10px] text-gray-500">
                {i}s
              </span>
            </div>
          ))}
        </div>

        {/* Word segments */}
        <div className="absolute top-5 left-0 right-0 bottom-0">
          {segments.map((seg, index) => {
            const leftPercent = (seg.start / duration) * 100;
            const widthPercent = ((seg.end - seg.start) / duration) * 100;
            
            // Alternar colores para mejor visualización
            const colors = [
              'bg-blue-100 border-blue-400 text-blue-800',
              'bg-purple-100 border-purple-400 text-purple-800',
              'bg-green-100 border-green-400 text-green-800',
              'bg-orange-100 border-orange-400 text-orange-800',
            ];
            const colorClass = colors[index % colors.length];

            return (
              <div
                key={index}
                className={`absolute top-0 bottom-0 border-l-2 border-r-2 ${colorClass} flex items-center justify-center overflow-hidden`}
                style={{
                  left: `${leftPercent}%`,
                  width: `${widthPercent}%`,
                }}
                title={`${seg.text}\n${seg.start.toFixed(2)}s - ${seg.end.toFixed(2)}s`}
              >
                <span className="text-xs font-medium truncate px-1">
                  {seg.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Word list */}
      <div className="bg-gray-50 px-3 py-2 border-t border-gray-300 max-h-32 overflow-y-auto">
        <div className="flex flex-wrap gap-2">
          {segments.map((seg, index) => (
            <span
              key={index}
              className="text-xs bg-white px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 cursor-default"
              title={`${seg.start.toFixed(2)}s - ${seg.end.toFixed(2)}s`}
            >
              <strong>{seg.text}</strong>
              <span className="text-gray-400 ml-1">
                ({seg.start.toFixed(1)}s)
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Info footer */}
      <div className="bg-blue-50 px-3 py-2 border-t border-blue-200">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">ℹ️ Nota:</span> Las segmentaciones son estimadas basándose en la 
          duración total y la longitud de las palabras. Para tiempos precisos, se requiere alineamiento forzado con el audio.
        </p>
      </div>
    </div>
  );
}
