import React, { useRef, useEffect, useState } from 'react';

type Props = {
  audioUrl?: string | null;
  stream?: MediaStream | null;
  isLive?: boolean;
  // optional refs from parent to reuse AudioContext and MediaElementSource
  audioCtxRef?: React.MutableRefObject<AudioContext | null>;
  mediaSourceRef?: React.MutableRefObject<MediaElementAudioSourceNode | null>;
  audioRef?: React.RefObject<HTMLAudioElement>;
};

export default function Spectrogram({ audioUrl, stream, isLive, audioCtxRef: parentAudioCtxRef, mediaSourceRef: parentMediaSourceRef, audioRef: parentAudioRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pitchCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext|null>(null);
  const analyserRef = useRef<AnalyserNode|null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode|null>(null);
  const spectrogramDataRef = useRef<number[][]>([]);
  const audioElementRef = useRef<HTMLAudioElement|null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    // Reanudar AudioContext ante un gesto del usuario para evitar silencio
    const resumeOnGesture = () => {
      const ctx = (parentAudioCtxRef && parentAudioCtxRef.current) || audioContextRef.current;
      if (ctx && ctx.state === 'suspended') {
        try { ctx.resume(); } catch (_) {}
      }
    };
    window.addEventListener('pointerdown', resumeOnGesture, { once: false });
    window.addEventListener('keydown', resumeOnGesture, { once: false });
    return () => {
      window.removeEventListener('pointerdown', resumeOnGesture);
      window.removeEventListener('keydown', resumeOnGesture);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !pitchCanvasRef.current) return;
    const canvas = canvasRef.current;
    const pitchCanvas = pitchCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const pitchCtx = pitchCanvas.getContext('2d');
    if (!ctx || !pitchCtx) return;

    // Si no hay audio, solo dibuja los fondos y retorna
    if (!audioUrl && !isLive) {
      const drawSpectrogramBackground = () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#e8e8e8';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
          const y = (canvas.height / 5) * i;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        for (let i = 0; i <= 10; i++) {
          const x = (canvas.width / 10) * i;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
      };
      const drawPitchBackground = () => {
        pitchCtx.fillStyle = '#f9f9f9';
        pitchCtx.fillRect(0, 0, pitchCanvas.width, pitchCanvas.height);
        pitchCtx.strokeStyle = '#e0e0e0';
        pitchCtx.lineWidth = 0.5;
        for (let i = 0; i <= 5; i++) {
          const y = (pitchCanvas.height / 5) * i;
          pitchCtx.beginPath();
          pitchCtx.moveTo(0, y);
          pitchCtx.lineTo(pitchCanvas.width, y);
          pitchCtx.stroke();
        }
      };
      drawSpectrogramBackground();
      drawPitchBackground();
      return;
    }

    // Limpia contexto anterior SOLO si lo creó este componente
    if (audioContextRef.current && audioContextRef.current !== parentAudioCtxRef?.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {
        console.warn('Error cerrando audio context:', e);
      }
      audioContextRef.current = null;
    }

    let audioCtx: AudioContext;
    let source: MediaElementAudioSourceNode | MediaStreamAudioSourceNode | null = null;
    if (isLive && stream) {
      audioCtx = (parentAudioCtxRef && parentAudioCtxRef.current) || new (window.AudioContext || (window as any).webkitAudioContext)();
      if (parentAudioCtxRef && !parentAudioCtxRef.current) {
        parentAudioCtxRef.current = audioCtx;
      }
      if (!parentAudioCtxRef) audioContextRef.current = audioCtx;
      source = audioCtx.createMediaStreamSource(stream);
    } else {
      // Busca el elemento de audio - usar el ref del padre si está disponible
      let audioElem: HTMLAudioElement | null = null;
      if (parentAudioRef && parentAudioRef.current) {
        audioElem = parentAudioRef.current;
      } else {
        audioElem = document.querySelector('audio');
      }
      if (!audioElem) {
        console.warn('No se encontró elemento de audio');
        return;
      }
      audioElementRef.current = audioElem as HTMLAudioElement;
      audioCtx = (parentAudioCtxRef && parentAudioCtxRef.current) || new (window.AudioContext || (window as any).webkitAudioContext)();
      if (parentAudioCtxRef && !parentAudioCtxRef.current) {
        parentAudioCtxRef.current = audioCtx;
      }
      if (!parentAudioCtxRef) audioContextRef.current = audioCtx;
      if (parentMediaSourceRef && parentMediaSourceRef.current) {
        source = parentMediaSourceRef.current;
      } else if (sourceRef.current) {
        source = sourceRef.current;
      } else {
        try {
          // Intentar crear source solo si no existe uno válido
          // Nota: createMediaElementSource lanzará error si ya existe uno para este elemento
          source = audioCtx.createMediaElementSource(audioElem);
          if (parentMediaSourceRef) {
            parentMediaSourceRef.current = source;
          } else {
            sourceRef.current = source;
          }
        } catch (err) {
          console.warn('No se pudo crear MediaElementSource (probablemente ya existe):', err);
          // Si falla, intentamos recuperar el existente si es posible, o simplemente no conectamos
          // Si ya existe y está conectado a otro contexto, no podemos hacer mucho
        }
      }
    }

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 4096;
    analyser.smoothingTimeConstant = 0.8;
    analyserRef.current = analyser;

    // Conectar solo si el source pertenece al mismo contexto de audio
    if (source) {
      try {
        // Verificar si el source pertenece al contexto actual
        if (source.context === audioCtx) {
          try { source.disconnect(); } catch (e) {}
          source.connect(analyser);
        } else {
          console.warn('Source context mismatch', source.context.state, audioCtx.state);
        }
      } catch (err) {
        console.warn('Error conectando source al analyser:', err);
      }
    }
    try {
      // Solo conectar al destino (altavoces) si NO es en vivo.
      // En modo live (grabación), el audio ya se está monitoreando/procesando en el componente padre (DAFPage).
      // Si lo conectamos aquí también, tendremos doble audio (directo + procesado) causando eco y feedback.
      if (!isLive) {
        analyser.connect(audioCtx.destination);
      }
    } catch (err) {
      console.warn('Error conectando analyser al destination:', err);
    }

    // Asegurar que el contexto esté corriendo si no es live (en live depende del usuario)
    if (!isLive && audioCtx.state === 'suspended') {
       // No forzamos resume aquí para cumplir con políticas de autoplay, 
       // pero el manejador de eventos global lo hará al primer clic
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    spectrogramDataRef.current = [];

    // Dibujar fondo y ejes para espectrograma
    function drawSpectrogramBackground() {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Cuadrícula
      ctx.strokeStyle = '#e8e8e8';
      ctx.lineWidth = 1;
      
      // Líneas de cuadrícula horizontales (frecuencia)
      for (let i = 0; i <= 5; i++) {
        const y = (canvas.height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Líneas de cuadrícula verticales (tiempo)
      for (let i = 0; i <= 10; i++) {
        const x = (canvas.width / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    }

    function drawPitchBackground() {
      pitchCtx.fillStyle = '#f9f9f9';
      pitchCtx.fillRect(0, 0, pitchCanvas.width, pitchCanvas.height);
      
      // Líneas de cuadrícula
      pitchCtx.strokeStyle = '#e0e0e0';
      pitchCtx.lineWidth = 0.5;
      for (let i = 0; i <= 5; i++) {
        const y = (pitchCanvas.height / 5) * i;
        pitchCtx.beginPath();
        pitchCtx.moveTo(0, y);
        pitchCtx.lineTo(pitchCanvas.width, y);
        pitchCtx.stroke();
      }
    }

    drawSpectrogramBackground();
    drawPitchBackground();

    // Limpiar espectrograma cuando el audio termina

    let handleEnded: (() => void) | undefined;
    let handlePlay: (() => void) | undefined;
    let handleTimeUpdate: (() => void) | undefined;
    let handleLoadedMetadata: (() => void) | undefined;
    
    if (!isLive && audioElementRef.current) {
      handleEnded = () => {
        spectrogramDataRef.current = [];
        drawSpectrogramBackground();
        drawPitchBackground();
      };
      handlePlay = () => {
        // Reanudar AudioContext si estuviera suspendido para asegurar salida de audio
        try { if (audioCtx.state === 'suspended') audioCtx.resume(); } catch (_) {}
        if (audioElementRef.current && audioElementRef.current.currentTime < 0.1) {
          spectrogramDataRef.current = [];
          drawSpectrogramBackground();
          drawPitchBackground();
        }
      };
      handleTimeUpdate = () => {
        if (audioElementRef.current) {
          setCurrentTime(audioElementRef.current.currentTime);
        }
      };
      handleLoadedMetadata = () => {
        if (audioElementRef.current) {
          setAudioDuration(audioElementRef.current.duration);
        }
      };
      
      audioElementRef.current.addEventListener('ended', handleEnded);
      audioElementRef.current.addEventListener('play', handlePlay);
      audioElementRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioElementRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Intentar obtener la duración inmediatamente si ya está disponible
      if (audioElementRef.current.duration && !isNaN(audioElementRef.current.duration)) {
        setAudioDuration(audioElementRef.current.duration);
      }
    }

    function draw() {
      // En modo live siempre dibujar, en modo playback solo si está reproduciéndose o en pausa (para mantener el gráfico)
      const shouldDraw = isLive || !audioElementRef.current || !audioElementRef.current.paused;
      
      if (shouldDraw || spectrogramDataRef.current.length > 0) {
        analyser.getByteFrequencyData(dataArray);
        
        // Solo agregar nuevas columnas si realmente está reproduciendo
        if (shouldDraw) {
          // Agregar columna actual al espectrograma
          const column: number[] = [];
          for (let i = 0; i < bufferLength; i++) {
            column.push(dataArray[i]);
          }
          spectrogramDataRef.current.push(column);
          
          // Limitar ancho del espectrograma (scrolling)
          const maxColumns = canvas.width;
          if (spectrogramDataRef.current.length > maxColumns) {
            spectrogramDataRef.current.shift();
          }
        }

        // Siempre redibujar el espectrograma si hay datos
        if (spectrogramDataRef.current.length > 0) {
          // Dibujar espectrograma
          drawSpectrogramBackground();
          
          const columnWidth = canvas.width / spectrogramDataRef.current.length;
          spectrogramDataRef.current.forEach((col, x) => {
            for (let i = 0; i < Math.min(col.length, 200); i++) { // Limitar a ~5000Hz
              const intensity = col[i];
              const y = canvas.height - (i / 200) * canvas.height;
              
              // Escala de colores: azul oscuro -> amarillo -> rojo (similar a espectrogramas profesionales)
              let r, g, b;
              if (intensity < 85) {
                // Azul oscuro -> azul
                r = 0;
                g = 0;
                b = Math.floor(50 + (intensity / 85) * 155);
              } else if (intensity < 170) {
                // Azul -> verde -> amarillo
                const t = (intensity - 85) / 85;
                r = Math.floor(t * 255);
                g = Math.floor(100 + t * 155);
                b = Math.floor(205 - t * 205);
              } else {
                // Amarillo -> rojo
                const t = (intensity - 170) / 85;
                r = 255;
                g = Math.floor(255 - t * 155);
                b = 0;
              }
              
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
              ctx.fillRect(x * columnWidth, y - 1, columnWidth + 1, canvas.height / 200);
            }
          });

          // Dibujar curva de F0 (pitch) estimada
          drawPitchBackground();
          
          // Encontrar pico de energía como aproximación de F0
          let maxIntensity = 0;
          let maxIndex = 0;
          for (let i = 5; i < 100; i++) { // Rango típico de voz humana (80-500Hz aprox)
            if (dataArray[i] > maxIntensity) {
              maxIntensity = dataArray[i];
              maxIndex = i;
            }
          }
          
          // Dibujar curva suave de pitch
          const sampleRate = audioCtx.sampleRate;
          const nyquist = sampleRate / 2;
          const estimatedF0 = (maxIndex / bufferLength) * nyquist;
          
          if (spectrogramDataRef.current.length > 1) {
            pitchCtx.strokeStyle = '#2563eb';
            pitchCtx.lineWidth = 2;
            pitchCtx.beginPath();
            
            spectrogramDataRef.current.forEach((col, x) => {
              let colMaxIntensity = 0;
              let colMaxIndex = 0;
              for (let i = 5; i < 100; i++) {
                if (col[i] > colMaxIntensity) {
                  colMaxIntensity = col[i];
                  colMaxIndex = i;
                }
              }
              const f0 = (colMaxIndex / bufferLength) * nyquist;
              const normalizedF0 = Math.min(Math.max((f0 - 50) / 300, 0), 1);
              const y = pitchCanvas.height - (normalizedF0 * pitchCanvas.height);
              
              if (x === 0) {
                pitchCtx.moveTo(x * columnWidth, y);
              } else {
                pitchCtx.lineTo(x * columnWidth, y);
              }
            });
            pitchCtx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    }
    draw();

    // Limpieza
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      try { analyser.disconnect(); } catch (e) {}
      if (audioContextRef.current) {
        // No cerramos el contexto si viene del padre y está activo
        if (audioContextRef.current !== parentAudioCtxRef?.current) {
          audioContextRef.current.close();
        }
      }
      if (!isLive && audioElementRef.current) {
        if (handleEnded) audioElementRef.current.removeEventListener('ended', handleEnded);
        if (handlePlay) audioElementRef.current.removeEventListener('play', handlePlay);
        if (handleTimeUpdate) audioElementRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        if (handleLoadedMetadata) audioElementRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [audioUrl, isLive, stream]);

  // Generar marcadores de tiempo dinámicos
  const getTimeMarkers = () => {
    const duration = audioDuration || 10;
    const numMarkers = 11; // 0 a 10 marcadores (11 puntos)
    const markers = [];
    
    for (let i = 0; i < numMarkers; i++) {
      const time = (duration / (numMarkers - 1)) * i;
      markers.push(time.toFixed(1) + 's');
    }
    
    return markers;
  };

  return (
    <div className="w-full flex flex-col items-center mt-1 mb-2">
      {/* Curva de F0 (Pitch) */}
      <div className="w-full mb-3">
        <div className="text-xs text-gray-600 mb-1 font-semibold">F0 - Frecuencia fundamental (Pitch)</div>
        <div className="flex gap-2">
          <div className="flex flex-col justify-between text-xs text-gray-600" style={{paddingTop: '5px', paddingBottom: '5px'}}>
            <div>350 Hz</div>
            <div>250 Hz</div>
            <div>150 Hz</div>
            <div>50 Hz</div>
          </div>
          <div className="flex-1">
            <canvas 
              ref={pitchCanvasRef} 
              width={800} 
              height={120} 
              className="w-full rounded border border-gray-300 bg-white shadow-sm" 
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              {getTimeMarkers().map((marker, i) => (
                <div key={i}>{marker}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Espectrograma principal */}
      <div className="w-full mb-3">
        <div className="text-xs text-gray-600 mb-1 font-semibold">
          Espectrograma - <span className="text-blue-700">Frecuencia (Hz)</span> vs <span className="text-green-700">Tiempo (s)</span>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col justify-between text-xs text-gray-600 text-right" style={{paddingTop: '5px', paddingBottom: '5px'}}>
            <div>5000 Hz</div>
            <div>4000 Hz</div>
            <div>3000 Hz</div>
            <div>2000 Hz</div>
            <div>1000 Hz</div>
            <div>0 Hz</div>
          </div>
          <div className="flex-1">
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={250} 
              className="w-full rounded border border-gray-300 bg-white shadow-sm" 
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              {getTimeMarkers().map((marker, i) => (
                <div key={i}>{marker}</div>
              ))}
            </div>
            {currentTime > 0 && audioDuration > 0 && (
              <div className="mt-1 text-xs text-indigo-600 font-semibold">
                Reproduciendo: {currentTime.toFixed(1)}s / {audioDuration.toFixed(1)}s
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-700 w-full">
        <p className="mb-2 text-justify">
          <b>¿Qué muestra el espectrograma?</b> El <span className="font-semibold">eje horizontal</span> muestra el <span className="text-green-700 font-semibold">tiempo en segundos</span>, y el <span className="font-semibold">eje vertical</span> muestra la <span className="text-blue-700 font-semibold">frecuencia en Hertz (Hz)</span>. Cada punto de color representa la energía (intensidad) de una frecuencia específica en un momento dado. Las frecuencias bajas (parte inferior) corresponden a sonidos graves y las altas (parte superior) a sonidos agudos. Los colores indican intensidad: azul (bajo), verde-amarillo (medio), naranja (alto - más intenso).
        </p>
        <p className="text-xs text-gray-600 text-justify">
          <b>Elementos suprasegmentales del acento:</b> <br/>
          • <b>Articulatoriamente:</b> Incremento de la frecuencia de vibración de las cuerdas vocales y de la fuerza y tiempo de salida del aire<br/>
          • <b>Acústicamente:</b> Aumento de frecuencia fundamental, de intensidad o de duración de una sílaba<br/>
          • <b>Perceptivamente:</b> Prominencia en la altura tonal (agudo), en la intensidad (fuerte) o en la duración (largo) de una sílaba
        </p>
      </div>
    </div>
  );
}
