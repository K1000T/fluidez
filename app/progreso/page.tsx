"use client";
import React, { useEffect, useRef, useState, useMemo } from 'react';
import WordCloud from '../../components/WordCloud';
import Link from 'next/link';
import * as XLSX from 'xlsx';

type AudioRecord = {
  id: string;
  date: string;
  source: 'daf' | 'espectrograma';
  duration: number;
  wordCount: number;
  transcript?: string;
  delay?: number; // Solo para DAF
  audioUrl?: string;
};

type GameScore = {
  id: string;
  game: 'fonema-inicial' | 'karaoke-fluido' | 'silabas-sonidos';
  score: number;
  attempts: number;
  timestamp: string;
};

export default function ProgresoPage() {
  const [audioRecords, setAudioRecords] = useState<AudioRecord[]>([]);
  const [gameScores, setGameScores] = useState<GameScore[]>([]);
  const [compareA, setCompareA] = useState<string | null>(null);
  const [compareB, setCompareB] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<'audios' | 'games'>('audios');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'daf' | 'espectrograma'>('all');
  const wpmChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (audioRecords.length > 0) {
      drawPPMChart();
    }
  }, [audioRecords, sourceFilter]);

  const loadData = async () => {
    try {
      // Cargar grabaciones de audio desde la API
      const audioResponse = await fetch('/api/get-audios', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (audioResponse.ok) {
        const audioData = await audioResponse.json();
        if (audioData.ok && audioData.audios) {
          // Convertir formato de BD a formato del componente
          const formattedAudios = audioData.audios.map((audio: any) => ({
            id: audio.id,
            date: audio.created_at,
            source: audio.source,
            duration: audio.duration || 0,
            wordCount: audio.word_count || 0,
            delay: audio.delay_ms,
            transcript: audio.transcript,
            audioUrl: audio.file_url
          }));
          setAudioRecords(formattedAudios);
        }
      } else {
        // Fallback: cargar desde localStorage si la API falla
        const storedAudios = localStorage.getItem('audio_records');
        if (storedAudios) {
          setAudioRecords(JSON.parse(storedAudios));
        }
      }

      // Cargar puntuaciones de juegos
      const gamesResponse = await fetch('/api/save-score', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (gamesResponse.ok) {
        const data = await gamesResponse.json();
        // Formatear scores de la API al formato esperado
        const formattedScores = (data.scores || []).map((s: any) => ({
          id: s.id,
          game: s.game_type || s.game,
          score: s.score,
          attempts: s.attempts,
          timestamp: s.created_at || s.timestamp
        }));
        setGameScores(formattedScores);
      } else {
        // Fallback: cargar desde localStorage
        const storedScores = localStorage.getItem('game_scores');
        if (storedScores) {
          const scores = JSON.parse(storedScores);
          // Convertir formato de localStorage al formato esperado
          const formattedScores = scores.map((s: any) => ({
            id: s.id,
            game: s.game,
            score: s.score,
            attempts: s.attempts,
            timestamp: s.timestamp
          }));
          setGameScores(formattedScores);
        }
      }
    } catch (err) {
      console.error('Error cargando datos:', err);
      // Fallback a localStorage
      const storedAudios = localStorage.getItem('audio_records');
      if (storedAudios) {
        setAudioRecords(JSON.parse(storedAudios));
      }
    }
  };

  const deleteAudioRecord = async (id: string) => {
    // Eliminar directamente sin confirmación

    try {
      // Intentar eliminar de la base de datos
      const response = await fetch(`/api/delete-audio?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      // Siempre eliminar de localStorage también
      const updatedRecords = audioRecords.filter(r => r.id !== id);
      setAudioRecords(updatedRecords);
      localStorage.setItem('audio_records', JSON.stringify(updatedRecords));

      // Sin mensaje alert para evitar "localhost:3000 dice"
    } catch (err) {
      console.error('Error eliminando grabación:', err);
      // Aun así eliminar de la lista local
      const updatedRecords = audioRecords.filter(r => r.id !== id);
      setAudioRecords(updatedRecords);
      localStorage.setItem('audio_records', JSON.stringify(updatedRecords));
    }
  };

  const deleteGameScore = async (id: string) => {
    // Eliminar directamente sin confirmación

    try {
      // Intentar eliminar de la base de datos
      const response = await fetch(`/api/delete-score?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      // Siempre eliminar de localStorage también
      const updatedScores = gameScores.filter(s => s.id !== id);
      setGameScores(updatedScores);
      localStorage.setItem('game_scores', JSON.stringify(updatedScores));

      // Sin mensaje alert para evitar "localhost:3000 dice"
    } catch (err) {
      console.error('Error eliminando puntuación:', err);
      // Aun así eliminar de la lista local
      const updatedScores = gameScores.filter(s => s.id !== id);
      setGameScores(updatedScores);
      localStorage.setItem('game_scores', JSON.stringify(updatedScores));
    }
  };

  const calculatePPM = (record: AudioRecord) => {
    if (!record.duration || record.duration === 0) return 0;
    const minutes = record.duration / 60;
    const ppm = record.wordCount / minutes;
    return isNaN(ppm) || !isFinite(ppm) ? 0 : Math.round(ppm);
  };

  // Funciones para calcular métricas de ritmo
  const calculatePercentV = (text: string): number => {
    if (!text) return 0;
    const totalChars = text.replace(/\s/g, '').length;
    if (totalChars === 0) return 0;
    const vowels = text.match(/[aeiouáéíóúüAEIOUÁÉÍÓÚÜ]/g) || [];
    return (vowels.length / totalChars) * 100;
  };

  const calculateVarcoV = (text: string, durationSeconds: number): number => {
    if (!text || durationSeconds === 0) return 0;
    const vowels = text.match(/[aeiouáéíóúüAEIOUÁÉÍÓÚÜ]/g) || [];
    if (vowels.length === 0) return 0;
    
    // Estimación simplificada: asumimos duración promedio por vocal
    const avgDuration = (durationSeconds * 1000) / vowels.length;
    const stdDev = avgDuration * 0.3; // Aproximación
    return (stdDev / avgDuration) * 100;
  };

  const calculatePVI = (text: string): number => {
    if (!text) return 0;
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length < 2) return 0;
    
    let sum = 0;
    for (let i = 0; i < words.length - 1; i++) {
      const len1 = words[i].length;
      const len2 = words[i + 1].length;
      const diff = Math.abs(len1 - len2);
      const avg = (len1 + len2) / 2;
      if (avg > 0) {
        sum += (diff / avg) * 100;
      }
    }
    return sum / (words.length - 1);
  };

  const drawPPMChart = () => {
    const canvas = wpmChartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width = Math.min(900, window.innerWidth - 100);
    const h = canvas.height = 450;
    ctx.clearRect(0, 0, w, h);

    if (audioRecords.length === 0) return;

    // Filtrar por fuente
    let filteredRecords = audioRecords;
    if (sourceFilter !== 'all') {
      filteredRecords = audioRecords.filter(r => r.source === sourceFilter);
    }

    if (filteredRecords.length === 0) return;

    // Ordenar por fecha y tomar solo las últimas 10 sesiones
    const sorted = [...filteredRecords]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-10);

    const ppmValues = sorted.map(r => calculatePPM(r));
    const maxPPM = Math.max(...ppmValues, 150);
    const minPPM = 0;

    const marginLeft = 80;
    const marginRight = 40;
    const marginTop = 50;
    const marginBottom = 80;
    const plotW = w - marginLeft - marginRight;
    const plotH = h - marginTop - marginBottom;

    // Fondo del gráfico
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // Líneas de referencia horizontales (grid)
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = marginTop + (plotH / 10) * i;
      ctx.beginPath();
      ctx.moveTo(marginLeft, y);
      ctx.lineTo(marginLeft + plotW, y);
      ctx.stroke();
    }

    // Ejes principales
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginLeft, marginTop + plotH);
    ctx.lineTo(marginLeft + plotW, marginTop + plotH);
    ctx.stroke();

    // Dibujar barras
    const barWidth = plotW / sorted.length * 0.7;
    const barSpacing = plotW / sorted.length;

    sorted.forEach((record, i) => {
      const ppm = calculatePPM(record);
      const barHeight = (ppm / maxPPM) * plotH;
      const x = marginLeft + (i * barSpacing) + (barSpacing - barWidth) / 2;
      const y = marginTop + plotH - barHeight;

      // Color según fuente
      const isDAF = record.source === 'daf';
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      
      if (isDAF) {
        gradient.addColorStop(0, '#f59e0b');
        gradient.addColorStop(1, '#d97706');
      } else {
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#2563eb');
      }

      // Dibujar barra con sombra
      ctx.shadowColor = 'rgba(0,0,0,0.2)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);
      
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Borde de la barra
      ctx.strokeStyle = isDAF ? '#b45309' : '#1e40af';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, barWidth, barHeight);

      // Valor PPM encima de la barra
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ppm.toString(), x + barWidth / 2, y - 8);
    });

    // Etiquetas del eje Y (PPM)
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 10; i++) {
      const ppm = Math.round((maxPPM / 10) * (10 - i));
      const y = marginTop + (plotH / 10) * i;
      ctx.fillText(ppm.toString(), marginLeft - 10, y + 5);
    }

    // Etiquetas del eje X (fechas) - sin rotación
    ctx.textAlign = 'center';
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#374151';
    
    sorted.forEach((record, i) => {
      const x = marginLeft + (i * barSpacing) + barSpacing / 2;
      const date = new Date(record.date);
      const label = `${date.getDate()}/${date.getMonth() + 1}`;
      
      // Sin rotación, directamente horizontal
      ctx.fillText(label, x, marginTop + plotH + 20);
    });

    // Título del eje Y (sin rotación, más a la izquierda)
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1f2937';
    
    // Dividir el texto en múltiples líneas, más a la izquierda
    ctx.fillText('PPM', 20, marginTop - 15);
    ctx.font = '11px sans-serif';
    ctx.fillText('(Palabras', 20, marginTop);
    ctx.fillText('Por Minuto)', 20, marginTop + 12);

    // Título del eje X
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Sesiones (Fecha)', w / 2, h - 15);

    // Leyenda
    const legendX = w - 200;
    const legendY = 20;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillRect(legendX, legendY, 180, 75);
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.strokeRect(legendX, legendY, 180, 75);
    
    ctx.textAlign = 'left';
    
    // DAF
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(legendX + 15, legendY + 20, 25, 15);
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.strokeRect(legendX + 15, legendY + 20, 25, 15);
    
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('DAF', legendX + 50, legendY + 32);
    
    // Espectrograma
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(legendX + 15, legendY + 50, 25, 15);
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.strokeRect(legendX + 15, legendY + 50, 25, 15);
    
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('Espectrograma', legendX + 50, legendY + 62);
  };

  const exportData = () => {
    // Calcular promedio de PPM
    const avgPPM = audioRecords.length > 0 
      ? audioRecords.reduce((sum, r) => sum + calculatePPM(r), 0) / audioRecords.length
      : 0;
    
    // Preparar datos de grabaciones de audio para Excel
    const audiosData = audioRecords.map(record => ({
      'ID': record.id,
      'Fecha': new Date(record.date).toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      'Fuente': record.source === 'daf' ? 'DAF' : 'Espectrograma',
      'Duración (seg)': record.duration.toFixed(1),
      'Palabras': record.wordCount,
      'PPM': calculatePPM(record),
      'Delay (ms)': record.delay || 'N/A',
      'Transcripción': record.transcript || ''
    }));

    // Preparar datos de puntuaciones de juegos para Excel
    const gamesData = gameScores.map(score => ({
      'ID': score.id,
      'Fecha': new Date(score.timestamp).toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      'Juego': score.game === 'fonema-inicial' ? 'Juego de Fonemas' : 'Karaoke Fluido',
      'Puntuación': score.score,
      'Intentos': score.attempts
    }));

    // Crear un nuevo libro de Excel
    const workbook = XLSX.utils.book_new();

    // Crear hoja para grabaciones de audio
    const audiosWorksheet = XLSX.utils.json_to_sheet(audiosData);
    XLSX.utils.book_append_sheet(workbook, audiosWorksheet, 'Grabaciones de Audio');

    // Crear hoja para puntuaciones de juegos
    const gamesWorksheet = XLSX.utils.json_to_sheet(gamesData);
    XLSX.utils.book_append_sheet(workbook, gamesWorksheet, 'Puntuaciones de Juegos');

    // Crear hoja de resumen
    const summaryData = [
      { 'Métrica': 'Total de grabaciones', 'Valor': audioRecords.length },
      { 'Métrica': 'PPM promedio', 'Valor': avgPPM.toFixed(1) },
      { 'Métrica': 'Total de partidas jugadas', 'Valor': gameScores.length },
      { 'Métrica': 'Mejor puntuación (Fonema)', 'Valor': Math.max(...gameScores.filter(s => s.game === 'fonema-inicial').map(s => s.score), 0) },
      { 'Métrica': 'Mejor puntuación (Karaoke)', 'Valor': Math.max(...gameScores.filter(s => s.game === 'karaoke-fluido').map(s => s.score), 0) },
      { 'Métrica': 'Fecha de exportación', 'Valor': new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }
    ];
    const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Resumen');

    // Generar archivo Excel y descargarlo
    const excelFileName = `progreso_fluidez_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, excelFileName);
  };

  const compareARecord = useMemo(() => 
    audioRecords.find(r => r.id === compareA), [audioRecords, compareA]
  );

  const compareBRecord = useMemo(() => 
    audioRecords.find(r => r.id === compareB), [audioRecords, compareB]
  );

  const filteredAudioRecords = useMemo(() => {
    if (sourceFilter === 'all') return audioRecords;
    return audioRecords.filter(r => r.source === sourceFilter);
  }, [audioRecords, sourceFilter]);

  const allTranscripts = useMemo(() => 
    audioRecords.filter(r => r.transcript).map(r => r.transcript).join(' '),
    [audioRecords]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8 mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-[#6B3F1D]">
            📊 Mi Progreso
          </h1>
          <button
            onClick={loadData}
            className="px-6 py-2 bg-[#8B5F3D] text-white rounded-lg hover:bg-[#6B3F1D] transition-colors flex items-center gap-2"
          >
            🔄 Actualizar
          </button>
        </div>

        {/* Descripción */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border-l-4 border-[#6B3F1D]">
          <h2 className="text-2xl font-bold text-[#6B3F1D] mb-3">
            Qué muestra esta sección
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Esta sección agrupa las grabaciones y resultados de las sesiones para permitir al usuario revisar 
            su evolución a lo largo del tiempo. Incluye métricas por sesión (duración, palabras, WPM), un gráfico 
            de evolución y herramientas para comparar y exportar datos. También muestra los puntajes obtenidos en 
            los juegos terapéuticos.
          </p>
        </div>

        {/* Pestañas */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedView('audios')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              selectedView === 'audios'
                ? 'bg-[#6B3F1D] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🎙️ Grabaciones de Audio
          </button>
          <button
            onClick={() => setSelectedView('games')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              selectedView === 'games'
                ? 'bg-[#6B3F1D] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🎮 Puntajes de Juegos
          </button>
        </div>

        {selectedView === 'audios' ? (
          <>
            {audioRecords.length === 0 ? (
              <div className="p-12 bg-white rounded-xl shadow-lg text-center">
                <div className="text-6xl mb-4">🎙️</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">No hay grabaciones aún</h3>
                <p className="text-gray-600 mb-6">
                  Comienza a grabar en la sección de <strong>DAF</strong> o <strong>Espectrograma</strong> para ver tu progreso aquí.
                </p>
                <div className="flex gap-4 justify-center">
                  <a href="/daf" className="px-6 py-3 bg-[#6B3F1D] text-white rounded-lg hover:bg-[#8B5F3D] transition-colors">
                    Ir a DAF
                  </a>
                  <a href="/visualizacion" className="px-6 py-3 bg-[#8B5F3D] text-white rounded-lg hover:bg-[#6B3F1D] transition-colors">
                    Ir a Espectrograma
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* Gráfico de evolución PPM */}
                <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-[#6B3F1D] mb-2">
                      Evolución: Palabras Por Minuto (PPM)
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>PPM</strong> mide cuántas palabras pronuncias por minuto. Es un indicador clave de tu ritmo de habla y fluidez verbal. Un rango típico para conversación en español es de 120-150 PPM.
                    </p>
                    
                    {/* Filtros de fuente */}
                    <div className="flex gap-2 items-center">
                      <span className="text-sm font-semibold text-gray-700">Mostrar:</span>
                      <button
                        onClick={() => setSourceFilter('all')}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                          sourceFilter === 'all' 
                            ? 'bg-[#6B3F1D] text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        📊 Todas
                      </button>
                      <button
                        onClick={() => setSourceFilter('daf')}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                          sourceFilter === 'daf' 
                            ? 'bg-[#F7C873] text-[#6B3F1D] shadow-md' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        🎤 Solo DAF
                      </button>
                      <button
                        onClick={() => setSourceFilter('espectrograma')}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                          sourceFilter === 'espectrograma' 
                            ? 'bg-[#8B5F3D] text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        📈 Solo Espectrograma
                      </button>
                      <span className="ml-4 text-xs text-gray-500 italic">
                        (Mostrando últimas 10 sesiones)
                      </span>
                    </div>
                  </div>
                  <canvas ref={wpmChartRef} className="w-full"></canvas>
                </div>

            {/* Estadísticas generales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#FFF6ED] p-4 rounded-lg border-2 border-[#F7C873]">
                <div className="text-sm text-[#6B3F1D] font-semibold">
                  {sourceFilter === 'all' ? 'Total Grabaciones' : `Grabaciones ${sourceFilter === 'daf' ? 'DAF' : 'Espectrograma'}`}
                </div>
                <div className="text-3xl font-bold text-[#8B5F3D]">{filteredAudioRecords.length}</div>
              </div>
              <div className="bg-[#FFF6ED] p-4 rounded-lg border-2 border-[#F7C873]">
                <div className="text-sm text-[#6B3F1D] font-semibold">Tiempo Total</div>
                <div className="text-3xl font-bold text-[#8B5F3D]">
                  {Math.round(filteredAudioRecords.reduce((sum, r) => sum + r.duration, 0) / 60)}min
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                <div className="text-sm text-yellow-800 font-semibold">Palabras Totales</div>
                <div className="text-3xl font-bold text-yellow-700">
                  {filteredAudioRecords.reduce((sum, r) => sum + r.wordCount, 0)}
                </div>
              </div>
              <div className="bg-[#FFF6ED] p-4 rounded-lg border-2 border-[#F7C873]">
                <div className="text-sm text-[#6B3F1D] font-semibold">PPM Promedio</div>
                <div className="text-3xl font-bold text-[#8B5F3D]">
                  {filteredAudioRecords.length > 0 
                    ? Math.round(filteredAudioRecords.reduce((sum, r) => sum + calculatePPM(r), 0) / filteredAudioRecords.length)
                    : 0
                  }
                </div>
              </div>
            </div>

            {/* Comparar sesiones */}
            <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-[#6B3F1D] mb-4">
                Comparar sesiones
              </h2>
              <p className="text-gray-600 mb-4">
                Selecciona dos sesiones para comparar métricas básicas (palabras y PPM).
              </p>

              {/* Nota informativa sobre rangos normales */}
              <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-200 rounded-lg shadow-md">
                <h3 className="font-bold text-[#6B3F1D] mb-2 flex items-center gap-2">
                  <span className="text-lg">📊</span> Rangos normales de métricas
                </h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>PPM (Palabras por Minuto):</strong> 125-175 es el rango típico en conversación normal</p>
                  <p><strong>PVI (Índice de Variabilidad de Pares):</strong> Varía según el idioma; valores más altos indican mayor variación rítmica</p>
                  <p><strong>VarcoV (Variabilidad de Vocales):</strong> Mide la variación temporal de las vocales; valores más altos indican ritmo más variable</p>
                  <p><strong>%V (Porcentaje Vocálico):</strong> ~40-45% es típico en español; indica la proporción de vocales en el habla</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Sesión A</label>
                  <select
                    value={compareA || ''}
                    onChange={(e) => setCompareA(e.target.value || null)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Seleccionar...</option>
                    {audioRecords.map(r => (
                      <option key={r.id} value={r.id}>
                        {new Date(r.date).toLocaleString()} - {r.source.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Sesión B</label>
                  <select
                    value={compareB || ''}
                    onChange={(e) => setCompareB(e.target.value || null)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Seleccionar...</option>
                    {audioRecords.map(r => (
                      <option key={r.id} value={r.id}>
                        {new Date(r.date).toLocaleString()} - {r.source.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {compareARecord && compareBRecord && (
                <div className="mt-4">
                  <h3 className="text-base font-bold text-gray-800 mb-3">Comparación Detallada</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border border-gray-300">
                      <thead className="bg-gradient-to-r from-[#6B3F1D] to-[#8B5F3D] text-white">
                        <tr>
                          <th className="p-2 text-left font-bold text-sm">Métrica</th>
                          <th className="p-2 text-center font-bold text-sm bg-[#8B5F3D]">Sesión A</th>
                          <th className="p-2 text-center font-bold text-sm bg-[#A67C52]">Sesión B</th>
                          <th className="p-2 text-center font-bold text-sm bg-[#6B3F1D]">Diferencia</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-2 font-semibold text-gray-700">Fecha</td>
                          <td className="p-2 text-center bg-[#FFF6ED] text-xs">{new Date(compareARecord.date).toLocaleString('es-ES', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}</td>
                          <td className="p-2 text-center bg-[#FFF6ED] text-xs">{new Date(compareBRecord.date).toLocaleString('es-ES', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}</td>
                          <td className="p-2 text-center bg-[#FFF6ED] font-semibold text-xs">
                            {Math.abs(new Date(compareBRecord.date).getTime() - new Date(compareARecord.date).getTime()) / (1000 * 60 * 60 * 24) < 1 
                              ? 'Mismo día' 
                              : `${Math.round(Math.abs(new Date(compareBRecord.date).getTime() - new Date(compareARecord.date).getTime()) / (1000 * 60 * 60 * 24))} días`}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-2 font-semibold text-gray-700">Fuente</td>
                          <td className="p-2 text-center bg-[#FFF6ED]">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              compareARecord.source === 'daf' ? 'bg-orange-500 text-white' : 'bg-[#8B5F3D] text-white'
                            }`}>
                              {compareARecord.source.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4 text-center bg-[#FFF6ED]">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              compareBRecord.source === 'daf' ? 'bg-orange-500 text-white' : 'bg-[#8B5F3D] text-white'
                            }`}>
                              {compareBRecord.source.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4 text-center bg-[#FFF6ED] font-semibold">
                            {compareARecord.source === compareBRecord.source ? 'Igual' : 'Diferente'}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4 font-semibold text-gray-700">Duración</td>
                          <td className="p-4 text-center bg-[#FFF6ED] font-bold text-[#6B3F1D]">{compareARecord.duration.toFixed(1)}s</td>
                          <td className="p-4 text-center bg-[#FFF6ED] font-bold text-[#6B3F1D]">{compareBRecord.duration.toFixed(1)}s</td>
                          <td className="p-4 text-center bg-[#FFF6ED] font-bold">
                            {compareBRecord.duration > compareARecord.duration ? '+' : ''}
                            {(compareBRecord.duration - compareARecord.duration).toFixed(1)}s
                            {compareBRecord.duration > compareARecord.duration ? ' ⬆️' : compareBRecord.duration < compareARecord.duration ? ' ⬇️' : ' ➡️'}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4 font-semibold text-gray-700">Palabras</td>
                          <td className="p-4 text-center bg-[#FFF6ED] font-bold text-[#6B3F1D] text-lg">{compareARecord.wordCount}</td>
                          <td className="p-4 text-center bg-[#FFF6ED] font-bold text-[#6B3F1D] text-lg">{compareBRecord.wordCount}</td>
                          <td className="p-4 text-center bg-[#FFF6ED] font-bold text-lg">
                            {compareBRecord.wordCount > compareARecord.wordCount ? '+' : ''}
                            {compareBRecord.wordCount - compareARecord.wordCount}
                            {compareBRecord.wordCount > compareARecord.wordCount ? ' ⬆️' : compareBRecord.wordCount < compareARecord.wordCount ? ' ⬇️' : ' ➡️'}
                          </td>
                        </tr>
                        <tr className="border-b-2 border-gray-300 hover:bg-gray-50 bg-[#FFF6ED]">
                          <td className="p-4 font-bold text-gray-800">PPM</td>
                          <td className="p-4 text-center bg-[#F7C873] font-bold text-[#6B3F1D] text-xl">{calculatePPM(compareARecord)}</td>
                          <td className="p-4 text-center bg-[#F7C873] font-bold text-[#6B3F1D] text-xl">{calculatePPM(compareBRecord)}</td>
                          <td className="p-4 text-center bg-[#F7C873] font-bold text-xl">
                            {calculatePPM(compareBRecord) > calculatePPM(compareARecord) ? '+' : ''}
                            {calculatePPM(compareBRecord) - calculatePPM(compareARecord)}
                            {calculatePPM(compareBRecord) > calculatePPM(compareARecord) ? ' ⬆️' : calculatePPM(compareBRecord) < calculatePPM(compareARecord) ? ' ⬇️' : ' ➡️'}
                          </td>
                        </tr>
                        {(compareARecord.delay || compareBRecord.delay) && (
                          <tr className="hover:bg-gray-50">
                            <td className="p-4 font-semibold text-gray-700">Delay DAF</td>
                            <td className="p-4 text-center bg-[#FFF6ED]">{compareARecord.delay ? `${compareARecord.delay}ms` : '-'}</td>
                            <td className="p-4 text-center bg-[#FFF6ED]">{compareBRecord.delay ? `${compareBRecord.delay}ms` : '-'}</td>
                            <td className="p-4 text-center bg-[#FFF6ED] font-semibold">
                              {compareARecord.delay && compareBRecord.delay 
                                ? `${compareBRecord.delay > compareARecord.delay ? '+' : ''}${compareBRecord.delay - compareARecord.delay}ms` 
                                : '-'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Resumen de mejora */}
                  <div className="mt-4 p-4 bg-gradient-to-r from-[#FFF6ED] to-[#F7C873] border-2 border-[#8B5F3D] rounded-lg">
                    <h4 className="font-bold text-[#6B3F1D] mb-2 flex items-center gap-2">
                      <span className="text-xl">📊</span> Análisis de Progreso
                    </h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      {calculatePPM(compareBRecord) > calculatePPM(compareARecord) ? (
                        <p className="text-[#6B3F1D] font-semibold">
                          ✅ <strong>¡Mejora!</strong> Aumentaste tu velocidad en {calculatePPM(compareBRecord) - calculatePPM(compareARecord)} PPM 
                          ({((calculatePPM(compareBRecord) - calculatePPM(compareARecord)) / calculatePPM(compareARecord) * 100).toFixed(1)}% más rápido)
                        </p>
                      ) : calculatePPM(compareBRecord) < calculatePPM(compareARecord) ? (
                        <p className="text-orange-700 font-semibold">
                          📉 Disminuiste tu velocidad en {calculatePPM(compareARecord) - calculatePPM(compareBRecord)} PPM 
                          ({((calculatePPM(compareARecord) - calculatePPM(compareBRecord)) / calculatePPM(compareARecord) * 100).toFixed(1)}% más lento)
                        </p>
                      ) : (
                        <p className="text-[#6B3F1D] font-semibold">➡️ Mantuviste el mismo ritmo de {calculatePPM(compareARecord)} PPM</p>
                      )}
                      
                      {compareBRecord.wordCount > compareARecord.wordCount && (
                        <p className="text-[#6B3F1D]">✅ Hablaste más: +{compareBRecord.wordCount - compareARecord.wordCount} palabras</p>
                      )}
                      
                      {compareBRecord.duration > compareARecord.duration && (
                        <p className="text-[#6B3F1D]">⏱️ Sesión más larga: +{(compareBRecord.duration - compareARecord.duration).toFixed(1)}s de práctica</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Lista de grabaciones */}
            <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-[#6B3F1D] mb-4">
                Todas las grabaciones
              </h2>
              <p className="text-xs text-gray-600 mb-3 italic">
                💡 Las métricas de ritmo (PVI, VarcoV, %V) solo aparecen en grabaciones que tienen transcripción guardada.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Fecha</th>
                      <th className="p-3 text-left">Fuente</th>
                      <th className="p-3 text-right">Duración</th>
                      <th className="p-3 text-right">Palabras</th>
                      <th className="p-3 text-right">PPM</th>
                      <th className="p-3 text-right">Delay</th>
                      <th className="p-3 text-right" title="Índice de Variación de Pares - Mide ritmo del habla">PVI</th>
                      <th className="p-3 text-right" title="Coeficiente de Variación Vocálica">VarcoV</th>
                      <th className="p-3 text-right" title="Porcentaje Vocálico en el texto">%V</th>
                      <th className="p-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...audioRecords].reverse().map(record => (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{new Date(record.date).toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            record.source === 'daf' 
                              ? 'bg-[#F7C873] text-[#6B3F1D]' 
                              : 'bg-[#8B5F3D] text-white'
                          }`}>
                            {record.source.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 text-right">{record.duration.toFixed(1)}s</td>
                        <td className="p-3 text-right">{record.wordCount}</td>
                        <td className="p-3 text-right font-bold">{calculatePPM(record)}</td>
                        <td className="p-3 text-right">{record.delay ? `${record.delay}ms` : '-'}</td>
                        <td className="p-3 text-right text-indigo-600 font-semibold">
                          {record.transcript ? calculatePVI(record.transcript).toFixed(1) + '%' : '-'}
                        </td>
                        <td className="p-3 text-right text-indigo-600 font-semibold">
                          {record.transcript ? calculateVarcoV(record.transcript, record.duration).toFixed(1) + '%' : '-'}
                        </td>
                        <td className="p-3 text-right text-indigo-600 font-semibold">
                          {record.transcript ? calculatePercentV(record.transcript).toFixed(1) + '%' : '-'}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => deleteAudioRecord(record.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs font-semibold"
                            title="Eliminar grabación"
                          >
                            🗑️ Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {audioRecords.length > 0 && (
                    <tfoot className="bg-gradient-to-r from-[#F7C873] to-[#e6b35a]">
                      <tr className="font-bold">
                        <td colSpan={2} className="p-3 text-right text-[#6B3F1D]">Promedio:</td>
                        <td className="p-3 text-right text-[#6B3F1D]">
                          {(audioRecords.reduce((sum, r) => sum + r.duration, 0) / audioRecords.length).toFixed(1)}s
                        </td>
                        <td className="p-3"></td>
                        <td className="p-3 text-right text-[#6B3F1D]">
                          {Math.round(audioRecords.reduce((sum, r) => sum + calculatePPM(r), 0) / audioRecords.length)}
                        </td>
                        <td className="p-3"></td>
                        <td className="p-3 text-right text-[#6B3F1D]">
                          {(audioRecords.reduce((sum, r) => {
                            const pvi = r.transcript ? calculatePVI(r.transcript) : 0;
                            return sum + pvi;
                          }, 0) / audioRecords.length).toFixed(1)}%
                        </td>
                        <td className="p-3 text-right text-[#6B3F1D]">
                          {(audioRecords.reduce((sum, r) => {
                            const varco = r.transcript ? calculateVarcoV(r.transcript, r.duration) : 0;
                            return sum + varco;
                          }, 0) / audioRecords.length).toFixed(1)}%
                        </td>
                        <td className="p-3 text-right text-[#6B3F1D]">
                          {(audioRecords.reduce((sum, r) => {
                            const pv = r.transcript ? calculatePercentV(r.transcript) : 0;
                            return sum + pv;
                          }, 0) / audioRecords.length).toFixed(1)}%
                        </td>
                        <td className="p-3"></td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>

            {/* Nube de palabras */}
            {allTranscripts && (
              <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-[#6B3F1D] mb-4">
                  ☁️ Palabras más usadas en todas tus sesiones
                </h2>
                <WordCloud transcript={allTranscripts} maxWords={50} />
              </div>
            )}

            {/* Botón de exportar */}
            <button
              onClick={exportData}
              className="w-full py-3 bg-[#8B5F3D] text-white rounded-lg font-semibold hover:bg-[#6B3F1D] transition-colors flex items-center justify-center gap-2"
            >
              <span>📊</span>
              <span>Exportar todos los datos a Excel</span>
            </button>
              </>
            )}
          </>
        ) : (
          /* Vista de juegos */
          <div>
            <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-[#6B3F1D] mb-4">
                🏆 Puntajes de Juegos
              </h2>
              
              {gameScores.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">
                    Aún no has jugado ningún juego. ¡Comienza a practicar!
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link 
                      href="/juego-fonema"
                      className="px-6 py-3 bg-[#6B3F1D] text-white rounded-lg hover:bg-[#8B5F3D] transition-colors"
                    >
                      Juego Fonemas
                    </Link>
                    <Link 
                      href="/karaoke"
                      className="px-6 py-3 bg-[#6B3F1D] text-white rounded-lg hover:bg-[#8B5F3D] transition-colors"
                    >
                      Karaoke Fluido
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {gameScores.map(score => (
                    <div key={score.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">
                            {score.game === 'fonema-inicial' ? '🎯 Fonema Inicial' : 
                             score.game === 'silabas-sonidos' ? '🔤 Sílabas y Sonidos' : 
                             '🎤 Karaoke Fluido'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(score.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right mr-4">
                          <div className="text-3xl font-bold text-[#6B3F1D]">{score.score}</div>
                          <div className="text-xs text-gray-600">{score.attempts} intentos</div>
                        </div>
                        <button
                          onClick={() => deleteGameScore(score.id)}
                          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-semibold"
                          title="Eliminar puntuación"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
