"use client";
import React, { useMemo } from 'react';

interface WordCloudProps {
  transcript: string;
  maxWords?: number;
}

export default function WordCloud({ transcript, maxWords = 50 }: WordCloudProps) {
  const wordData = useMemo(() => {
    if (!transcript) return [];
    
    // Normalizar y limpiar el texto
    const cleaned = transcript
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
      .replace(/[.,!?;:\u2014\-()"'«»\[\]]+/g, ' ') // Eliminar puntuación
      .toLowerCase();
    
    const words = cleaned.trim().split(/\s+/).filter(Boolean);
    const wordCount: Record<string, number> = {};
    
    words.forEach(word => {
      if (word.length > 2) { // Ignorar palabras muy cortas
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    // Convertir a array y ordenar por frecuencia
    return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxWords)
      .map(([text, value]) => ({ text, value }));
  }, [transcript, maxWords]);

  // Calcular tamaños de fuente basados en frecuencia
  const maxValue = Math.max(...wordData.map(w => w.value), 1);
  const minFontSize = 12;
  const maxFontSize = 48;

  if (wordData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-400 italic">No hay palabras para mostrar</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 overflow-hidden">
      <div className="flex flex-wrap items-center justify-center gap-2 h-full">
        {wordData.map(({ text, value }) => {
          const fontSize = minFontSize + ((value / maxValue) * (maxFontSize - minFontSize));
          const opacity = 0.5 + (value / maxValue) * 0.5;
          
          // Colores basados en frecuencia
          const hue = 200 + (value / maxValue) * 60; // De azul a cian
          const saturation = 60 + (value / maxValue) * 30;
          const lightness = 45 - (value / maxValue) * 15;
          
          return (
            <span
              key={text}
              className="font-semibold transition-transform hover:scale-110 cursor-default"
              style={{
                fontSize: `${fontSize}px`,
                opacity,
                color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                lineHeight: 1.2,
              }}
              title={`"${text}" aparece ${value} ${value === 1 ? 'vez' : 'veces'}`}
            >
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
