"use client";
import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import WordCloud from '../../components/WordCloud';

const Spectrogram = dynamic(() => import('../visualizacion/Spectrogram'), { ssr: false });

export default function DAFPage() {
  const [delayMs, setDelayMs] = useState(200);
  const [isRecording, setIsRecording] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [audioName, setAudioName] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaSourceRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const playbackSourceRef = useRef<any>(null);
  const playbackDelayRef = useRef<DelayNode | null>(null);
  const playbackGainRef = useRef<GainNode | null>(null);

  const startTranscription = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('❌ SpeechRecognition no disponible en este navegador');
      alert('Tu navegador no soporta reconocimiento de voz. Por favor usa Chrome, Edge o Safari.');
      return;
    }
    
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    let finalTranscript = '';
    let hasError = false;
    
    recognition.onstart = () => {
      console.log('[DAF] Transcripción iniciada');
      setIsTranscribing(true);
    };
    
    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        console.log('[DAF] Resultado:', { text, isFinal: event.results[i].isFinal });
        
        if (event.results[i].isFinal) {
          finalTranscript += text + ' ';
        } else {
          interimTranscript += text;
        }
      }
      const currentTranscript = finalTranscript + interimTranscript;
      setTranscript(currentTranscript);
      
      // Actualizar conteo de palabras en tiempo real
      const words = currentTranscript.trim().split(/\s+/).filter(Boolean).length;
      setWordCount(words);
      console.log('[DAF] Transcripción actual:', { 
        length: currentTranscript.length, 
        wordCount: words,
        finalTranscript,
        interimTranscript
      });
    };
    
    recognition.onerror = (event: any) => {
      console.error('[DAF] Error en reconocimiento de voz:', event.error);
      hasError = true;
      
      // Manejo de errores específicos
      const errorMessages: { [key: string]: string } = {
        'no-speech': '❌ No se detectó voz. Asegúrate de que tu micrófono funciona y hablaste.',
        'network': '❌ Error de red. Intenta de nuevo.',
        'not-allowed': '❌ No se permitió el acceso al micrófono.',
        'service-not-allowed': '❌ El servicio de reconocimiento de voz no está disponible.',
        'aborted': '⚠️ El reconocimiento fue interrumpido.',
        'bad-grammar': '⚠️ Error en la configuración del lenguaje.'
      };
      
      const message = errorMessages[event.error] || `Error: ${event.error}`;
      console.log('[DAF] Mensaje de error:', message);
    };
    
    recognition.onend = () => {
      console.log('[DAF] Transcripción finalizada');
      setIsTranscribing(false);
      if (!hasError && !finalTranscript.trim()) {
        console.warn('[DAF] No se capturó audio durante la grabación');
      }
    };
    
    try {
      recognition.start();
      recognitionRef.current = recognition;
      console.log('[DAF] Reconocimiento de voz iniciado');
    } catch (err) {
      console.error('[DAF] Error al iniciar reconocimiento:', err);
      alert('Error al iniciar el reconocimiento de voz. Por favor, recarga la página e intenta de nuevo.');
    }
  };

  const stopTranscription = () => {
    if (recognitionRef.current) {
      try { 
        recognitionRef.current.stop(); 
        console.log('[DAF] Reconocimiento de voz detenido');
      } catch (e) {
        console.warn('[DAF] Error al detener reconocimiento:', e);
      }
      recognitionRef.current = null;
    }
    setIsTranscribing(false);
  };

  const clearTranscription = () => {
    setTranscript('');
    setWordCount(0);
    stopTranscription();
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

  const startRecordingWithDAF = async () => {
    try {
      // Solicitar permiso de micrófono con configuración optimizada
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true, // Activar para eliminar eco
          noiseSuppression: true, // Reducir ruido de fondo
          autoGainControl: true, // Activar para mejor control de volumen
          sampleRate: 48000, // Mayor calidad de audio
          channelCount: 1
        } 
      });
      streamRef.current = stream;

      // Crear AudioContext con sample rate alto para mejor calidad
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 48000
      });
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const delayNode = audioCtx.createDelay(5.0);
      const gainNode = audioCtx.createGain();
      
      sourceNodeRef.current = source;
      delayNodeRef.current = delayNode;
      gainNodeRef.current = gainNode;

      // Configurar delay
      delayNode.delayTime.value = delayMs / 1000;
      gainNode.gain.value = 0.5; // Reducir volumen para minimizar eco

      // Conectar: source -> delay -> gain -> destination (para escuchar en tiempo real)
      source.connect(delayNode);
      delayNode.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Intentar usar mejor codec disponible
      let mimeType = 'audio/webm;codecs=opus';
      const supportedTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4'
      ];
      
      for (const type of supportedTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          mimeType = type;
          console.log('[DAF] Usando codec:', mimeType);
          break;
        }
      }

      // Para grabar, usamos directamente el stream original (sin delay)
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 128000 // Mayor bitrate para mejor calidad
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log('[DAF] MediaRecorder detenido, chunks:', chunksRef.current.length);
        const blob = new Blob(chunksRef.current, { type: mimeType });
        console.log('[DAF] Blob creado, tamaño:', blob.size);
        const url = URL.createObjectURL(blob);
        console.log('[DAF] URL creada:', url);
        
        // Resetear source de reproducción para el nuevo audio
        playbackSourceRef.current = null;
        
        setAudioUrl(url);
        
        // Calcular duración
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
          console.log('[DAF] Duración:', audio.duration);
          setDuration(audio.duration);
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
      console.log('[DAF] Grabación iniciada');
      
      // Iniciar transcripción
      startTranscription();

    } catch (err) {
      console.error('Error al acceder al micrófono:', err);
      alert('No se pudo acceder al micrófono. Por favor, verifica los permisos.');
    }
  };

  const stopRecording = () => {
    // Detener MediaRecorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    // Detener transcripción
    stopTranscription();

    // Desconectar nodos
    if (sourceNodeRef.current && delayNodeRef.current) {
      try {
        sourceNodeRef.current.disconnect();
        delayNodeRef.current.disconnect();
        if (gainNodeRef.current) gainNodeRef.current.disconnect();
      } catch (e) {
        console.warn('Error al desconectar nodos:', e);
      }
    }

    // Cerrar AudioContext
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }

    // Detener stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setIsRecording(false);
  };

  const saveAudioToDatabase = async () => {
    if (!audioUrl) {
      setSaveMsg('No hay audio para guardar');
      return;
    }
    
    // Verificar si el usuario está logueado
    try {
      const meResponse = await fetch('/api/me', { credentials: 'include' });
      
      if (!meResponse.ok) {
        // Usuario NO está logueado
        alert('❌ Debes iniciar sesión para guardar audios en la base de datos.\n\nTu audio se guardará solo en tu navegador (localStorage). Para guardarlo en la nube, inicia sesión.');
        // Guardar solo en localStorage como fallback
        const record = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          source: 'daf',
          duration: duration,
          wordCount: wordCount,
          delay: delayMs,
          transcript: transcript,
          audioUrl: audioUrl // Solo URL local
        };
        
        const stored = localStorage.getItem('audio_records');
        const records = stored ? JSON.parse(stored) : [];
        records.push(record);
        localStorage.setItem('audio_records', JSON.stringify(records));
        
        setSaveMsg('✅ Audio guardado localmente (Inicia sesión para guardar en la nube)');
        return;
      }
      
      // Usuario SÍ está logueado, continuar con el guardado en BD
    } catch (err) {
      alert('❌ No se pudo verificar tu sesión. El audio se guardará solo localmente.');
      // Fallback a localStorage
      const record = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        source: 'daf',
        duration: duration,
        wordCount: wordCount,
        delay: delayMs,
        transcript: transcript,
        audioUrl: audioUrl
      };
      
      const stored = localStorage.getItem('audio_records');
      const records = stored ? JSON.parse(stored) : [];
      records.push(record);
      localStorage.setItem('audio_records', JSON.stringify(records));
      
      setSaveMsg('✅ Audio guardado localmente');
      return;
    }
    
    // Preguntar nombre del archivo
    const today = new Date();
    const defaultName = `DAF_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}_${String(today.getHours()).padStart(2, '0')}h${String(today.getMinutes()).padStart(2, '0')}`;
    const fileName = prompt('¿Qué nombre quieres darle al audio?', defaultName);
    
    if (fileName === null) return; // Usuario canceló
    
    const finalName = fileName.trim() || defaultName;
    
    setSaving(true);
    setSaveMsg('Guardando audio...');
    
    try {
      const blob = await fetch(audioUrl).then(r => r.blob());
      const formData = new FormData();
      formData.append('file', blob, `${finalName}.webm`);
      
      // Agregar metadatos importantes
      formData.append('source', 'daf');
      formData.append('duration', duration.toString());
      formData.append('wordCount', wordCount.toString());
      formData.append('transcript', transcript);
      formData.append('delay', delayMs.toString());
      formData.append('playbackRate', playbackRate.toString());
      
      console.log('[DAF] Intentando guardar audio:', finalName, 'Tamaño:', blob.size);
      console.log('[DAF] Metadatos:', { duration, wordCount, transcript: transcript.substring(0, 50), delayMs });
      
      const response = await fetch('/api/upload-to-supabase', { 
        method: 'POST', 
        body: formData,
        credentials: 'include'
      });
      
      const responseData = await response.json();
      console.log('[DAF] Respuesta del servidor:', responseData);
      
      if (response.ok && responseData.ok) {
        setSaveMsg('✅ ¡Audio guardado exitosamente en la base de datos!');
        
        // Guardar también el registro localmente
        const record = {
          id: responseData.id,
          date: new Date().toISOString(),
          source: 'daf',
          duration: duration,
          wordCount: wordCount,
          delay: delayMs,
          transcript: transcript,
          audioUrl: responseData.publicUrl
        };
        
        const stored = localStorage.getItem('audio_records');
        const records = stored ? JSON.parse(stored) : [];
        records.push(record);
        localStorage.setItem('audio_records', JSON.stringify(records));
        
        console.log('[DAF] Registro guardado localmente también');
      } else {
        setSaveMsg('❌ Error al guardar: ' + (responseData.error || 'Error desconocido'));
      }
    } catch (error) {
      console.error('[DAF] Error al guardar:', error);
      setSaveMsg('❌ Error de conexión al guardar en base de datos');
    } finally {
      setSaving(false);
    }
  };

  const saveScoreToDatabase = async () => {
    if (!transcript || wordCount === 0) {
      alert('❌ No hay datos para guardar. Primero graba una sesión con DAF.');
      return;
    }
    
    try {
      // Calcular una puntuación basada en métricas de fluidez
      const metricsScore = Math.round(
        (wordCount * 10) + // Más palabras = más puntos
        (duration > 0 ? (wordCount / duration * 60) * 5 : 0) // Palabras por minuto
      );
      
      const gameData = {
        game: 'daf-fluency',
        score: metricsScore,
        attempts: 1,
        metadata: {
          duration,
          wordCount,
          delayMs,
          playbackRate,
          wordsPerMinute: duration > 0 ? (wordCount / duration * 60) : 0,
          transcriptLength: transcript.length
        },
        timestamp: new Date().toISOString()
      };
      
      // Verificar autenticación
      const meResponse = await fetch('/api/me', { credentials: 'include' });
      const isAuthenticated = meResponse.ok;
      
      // Guardar en localStorage siempre
      const stored = localStorage.getItem('game_scores');
      const scores = stored ? JSON.parse(stored) : [];
      scores.push({...gameData, id: Date.now().toString()});
      localStorage.setItem('game_scores', JSON.stringify(scores));
      
      if (isAuthenticated) {
        // Intentar guardar en la nube
        const response = await fetch('/api/save-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(gameData)
        });
        
        if (response.ok) {
          alert('✅ ¡Puntuación guardada exitosamente en la base de datos!');
        } else {
          const errorData = await response.json().catch(() => ({}));
          alert(`⚠️ Error: ${errorData.error || 'Desconocido'}. Puntuación guardada localmente.`);
        }
      } else {
        alert('💾 Puntuación guardada localmente (Inicia sesión para guardar en la base de datos)');
      }
    } catch (err) {
      console.error('Error guardando puntuación:', err);
      alert('💾 Puntuación guardada localmente');
    }
  };

  const playAudioWithDelay = async () => {
    if (!audioUrl || !audioRef.current) {
      console.log('[DAF] No hay audio o referencia', { audioUrl, hasRef: !!audioRef.current });
      return;
    }
    
    try {
      console.log('[DAF] Iniciando reproducción de audio', { 
        readyState: audioRef.current.readyState,
        currentTime: audioRef.current.currentTime,
        playbackRate 
      });

      // Asegurar que el contexto de audio esté activo (resume si está suspendido)
      if (playbackCtxRef.current && playbackCtxRef.current.state === 'suspended') {
        try {
          await playbackCtxRef.current.resume();
          console.log('[DAF] Contexto de audio reanudado');
        } catch (e) {
          console.warn('[DAF] Error al reanudar contexto:', e);
        }
      }
      
      // Resetear la posición
      audioRef.current.currentTime = 0;
      
      // Configurar velocidad de reproducción
      audioRef.current.playbackRate = playbackRate;
      
      // Asegurarse de que el audio esté listo (readyState >= 2 = HAVE_CURRENT_DATA)
      if (audioRef.current.readyState >= 2) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          console.log('[DAF] Reproducción iniciada correctamente');
        }
      } else {
        console.log('[DAF] Audio no está listo, esperando...');
        // Esperar a que el audio esté listo
        const handleCanPlay = async () => {
          try {
            console.log('[DAF] Audio está listo (canplay), iniciando reproducción');
            const playPromise = audioRef.current!.play();
            if (playPromise !== undefined) {
              await playPromise;
              setIsPlaying(true);
            }
          } catch (err) {
            console.error('[DAF] Error al reproducir después de cargar:', err);
          }
          audioRef.current?.removeEventListener('canplay', handleCanPlay);
        };
        
        audioRef.current.addEventListener('canplay', handleCanPlay, { once: true });
        
        // Timeout de seguridad
        setTimeout(() => {
          audioRef.current?.removeEventListener('canplay', handleCanPlay);
        }, 5000);
      }
    } catch (err) {
      console.error('[DAF] Error en playAudioWithDelay:', err);
      alert('Error al reproducir audio. Por favor, intenta de nuevo.');
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const onDelayChange = (value: number) => {
    setDelayMs(value);
    // Actualizar delay durante grabación
    if (delayNodeRef.current) {
      delayNodeRef.current.delayTime.value = value / 1000;
    }
    // Actualizar delay durante reproducción
    if (playbackDelayRef.current) {
      playbackDelayRef.current.delayTime.value = value / 1000;
    }
  };

  const onPlaybackRateChange = (value: number) => {
    setPlaybackRate(value);
    // Actualizar velocidad en el reproductor de audio si existe
    if (audioRef.current) {
      audioRef.current.playbackRate = value;
    }
  };

  // Sincronizar eventos del elemento <audio> para asegurar pausa y progreso correctos
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    // asegurar tasa de reproducción al cargar fuente
    const handleLoaded = () => { el.playbackRate = playbackRate; };
    el.addEventListener('ended', handleEnded);
    el.addEventListener('pause', handlePause);
    el.addEventListener('play', handlePlay);
    el.addEventListener('loadedmetadata', handleLoaded);
    return () => {
      el.removeEventListener('ended', handleEnded);
      el.removeEventListener('pause', handlePause);
      el.removeEventListener('play', handlePlay);
      el.removeEventListener('loadedmetadata', handleLoaded);
    };
  }, [audioUrl, playbackRate]);

  // Resetear source de reproducción cuando cambia el audio
  // NOTA: Esto se hace ahora en onstop para evitar condiciones de carrera
  // Eliminamos el efecto que causaba problemas
  /*
  useEffect(() => {
    playbackSourceRef.current = null;
  }, [audioUrl]);
  */

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      stopTranscription();
      
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      
      if (audioCtxRef.current) {
        try {
          if (sourceNodeRef.current) sourceNodeRef.current.disconnect();
          if (delayNodeRef.current) delayNodeRef.current.disconnect();
          if (gainNodeRef.current) gainNodeRef.current.disconnect();
          audioCtxRef.current.close();
        } catch (e) {}
      }

      if (playbackCtxRef.current) {
        try {
          playbackCtxRef.current.close();
        } catch (e) {}
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 mt-16 md:mt-20">
      <h2 className="text-3xl font-bold mb-6 text-[#6B3F1D]">DAF (Delayed Auditory Feedback)</h2>
      
      {/* Layout de 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6">
        
        {/* Columna izquierda - Controles e información */}
        <div className="space-y-6">
          
          {/* Control de delay */}
          <div className="p-4 bg-white rounded-lg border-2 border-[#F7C873] shadow-lg">
            <label className="block mb-2 font-semibold text-gray-700">
              Retardo de audio: <span className="text-[#6B3F1D] text-xl">{delayMs} ms</span>
            </label>
            <input 
              type="range" 
              min={0} 
              max={1000} 
              step={1}
              value={delayMs} 
              onChange={(e) => onDelayChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6B3F1D]"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 ms</span>
              <span>500 ms</span>
              <span>1000 ms</span>
            </div>
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-[#F7C873]">
              <p className="text-sm text-[#6B3F1D]">
                <strong>💡 Recomendado:</strong> 50-200ms es el rango más efectivo para la mayoría de personas.
              </p>
            </div>
          </div>

          {/* Control de velocidad de reproducción */}
          {audioUrl && !isRecording && (
            <div className="p-4 bg-white rounded-lg border-2 border-[#F7C873] shadow-lg">
              <label className="block mb-2 font-semibold text-gray-700">
                Velocidad de reproducción: <span className="text-[#6B3F1D] text-xl">{playbackRate.toFixed(2)}x</span>
              </label>
              <input 
                type="range" 
                min={0.5} 
                max={2.0} 
                step={0.1}
                value={playbackRate} 
                onChange={(e) => onPlaybackRateChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6B3F1D]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5x (Lento)</span>
                <span>1x (Normal)</span>
                <span>2x (Rápido)</span>
              </div>
            </div>
          )}

          {/* Botones de control */}
          <div className="flex gap-3 flex-wrap">
            {!isRecording ? (
              <button 
                className="flex-1 px-6 py-3 rounded-lg bg-[#6B3F1D] text-white hover:bg-[#8B5F3D] font-semibold shadow-md transition-colors" 
                onClick={startRecordingWithDAF}
              >
                🎙️ Grabar con DAF
              </button>
            ) : (
              <button 
                className="flex-1 px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 font-semibold shadow-md transition-colors" 
                onClick={stopRecording}
              >
                ⏹ Detener Grabación
              </button>
            )}
          </div>

          {/* Información del DAF con imagen explicativa */}
          <div className="p-6 border-2 rounded-lg bg-gradient-to-br from-amber-50 to-orange-100 border-[#F7C873]">
            <p className="mb-3 font-bold text-[#6B3F1D] text-xl">📖 ¿Qué es el DAF?</p>
            
            <p className="text-sm text-gray-700 mb-4 text-justify leading-relaxed">
              <strong>DAF (Delayed Auditory Feedback)</strong> es una técnica que devuelve tu voz con un pequeño 
              retraso de tiempo (50-200ms). Este efecto ayuda a personas con disfluencias a mejorar su fluidez 
              del habla, reducir el ritmo, controlar las pausas y disminuir los bloqueos iniciales.
            </p>

            <div className="mb-4 bg-white p-4 rounded-lg border-2 border-[#F7C873]">
              <p className="text-sm font-semibold text-[#6B3F1D] mb-3">¿Cómo funciona?</p>
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <div className="text-4xl mb-2">🎤</div>
                  <p className="font-bold text-[#6B3F1D]">Hablas</p>
                  <p className="text-gray-600">Tu voz entra por el micrófono</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">⏱️</div>
                  <p className="font-bold text-[#6B3F1D]">Retraso</p>
                  <p className="text-gray-600">Se añade un delay de 50-200ms</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🎧</div>
                  <p className="font-bold text-[#6B3F1D]">Escuchas</p>
                  <p className="text-gray-600">Tu voz retrasada en tiempo real</p>
                </div>
              </div>
            </div>

            <p className="mb-2 font-semibold text-[#6B3F1D]">Pasos rápidos:</p>
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 leading-relaxed">
              <li>Ajusta el retardo con el control deslizante (recomendado: 150-200 ms)</li>
              <li>Haz clic en "🎙️ Grabar con DAF" para escuchar tu voz mientras grabas</li>
              <li>Habla con naturalidad y observa cómo el retardo afecta tu fluidez</li>
              <li>Detén la grabación y reproduce el audio para evaluar tu progreso</li>
            </ol>
          </div>

          {/* Métricas de transcripción */}
          {transcript && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FFF6ED] p-3 rounded-lg border-2 border-[#F7C873] shadow">
                <div className="text-xs text-gray-600">Palabras detectadas</div>
                <div className="text-2xl font-bold text-[#6B3F1D]">
                  {transcript.trim().split(/\s+/).filter(Boolean).length}
                </div>
              </div>
              <div className="bg-[#FFF6ED] p-3 rounded-lg border-2 border-[#F7C873] shadow">
                <div className="text-xs text-gray-600">Caracteres</div>
                <div className="text-2xl font-bold text-[#8B5F3D]">
                  {transcript.length}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Columna derecha - Visualizaciones */}
        <div className="space-y-6">
          
          {/* Transcripción en tiempo real */}
          {(isRecording || transcript) && (
            <div className="p-4 border-2 rounded-lg bg-white shadow-lg border-[#F7C873]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-[#6B3F1D]">📝 Transcripción en Tiempo Real</h3>
                {isTranscribing && (
                  <span className="flex items-center text-sm text-[#8B5F3D]">
                    <span className="animate-pulse mr-2 w-3 h-3 bg-[#8B5F3D] rounded-full"></span>
                    Escuchando...
                  </span>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded border min-h-[100px] max-h-[250px] overflow-y-auto">
                {transcript ? (
                  <p className="text-gray-800 leading-relaxed">{transcript}</p>
                ) : (
                  <p className="text-gray-400 italic">
                    {isRecording ? 'Esperando que empieces a hablar...' : 'No hay transcripción disponible'}
                  </p>
                )}
              </div>

              {transcript && (
                <button
                  onClick={clearTranscription}
                  className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Borrar transcripción
                </button>
              )}
            </div>
          )}

          {/* Audio grabado */}
          {audioUrl && !isRecording && (
            <div className="p-4 border-2 rounded-lg shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 border-green-300">
              <h3 className="text-lg font-semibold text-[#6B3F1D] mb-3">🎧 Audio Grabado</h3>
              
              {/* Reproductor de audio con mejor visibilidad */}
              <div className="bg-white p-4 rounded-lg border-2 border-[#6B3F1D] shadow-md mb-4">
                <audio 
                  key={audioUrl} 
                  ref={audioRef} 
                  controls 
                  src={audioUrl} 
                  className="w-full"
                  style={{
                    filter: 'contrast(1.2) saturate(1.3)',
                    accentColor: '#6B3F1D'
                  }}
                  preload="metadata"
                />
              </div>
              
              {duration > 0 && (
                <div className="mb-4 p-3 bg-white rounded-lg border shadow-sm">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-600">Duración</div>
                      <div className="text-xl font-bold text-[#6B3F1D]">{duration.toFixed(2)}s</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Retardo aplicado</div>
                      <div className="text-xl font-bold text-[#6B3F1D]">{delayMs}ms</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Palabras</div>
                      <div className="text-xl font-bold text-[#6B3F1D]">{wordCount}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mb-3">
                <button
                  onClick={isPlaying ? pauseAudio : playAudioWithDelay}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#6B3F1D] text-white hover:bg-[#8B5F3D] font-semibold transition-colors shadow-md"
                >
                  {isPlaying ? '⏸️ Pausar' : '▶️ Reproducir'}
                </button>
                <button
                  onClick={saveAudioToDatabase}
                  disabled={saving}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#8B5F3D] text-white hover:bg-[#6B3F1D] disabled:bg-gray-400 font-semibold transition-colors shadow-md"
                >
                  {saving ? 'Guardando...' : '💾 Guardar Audio'}
                </button>
              </div>
              
              {saveMsg && (
                <p className={`mt-2 text-sm ${saveMsg.includes('Error') ? 'text-red-600' : 'text-green-700'}`}>
                  {saveMsg}
                </p>
              )}
            </div>
          )}

          {/* Espectrograma */}
          {(audioUrl || isRecording) && (
            <div className="p-4 bg-white rounded-lg border-2 border-[#F7C873] shadow-lg">
              <h3 className="text-lg font-bold text-[#6B3F1D] mb-3">🎨 Espectrograma</h3>
              <Spectrogram 
                audioUrl={audioUrl} 
                stream={isRecording ? streamRef.current : null}
                isLive={isRecording}
                audioCtxRef={isRecording ? audioCtxRef : playbackCtxRef} 
                mediaSourceRef={isRecording ? mediaSourceRef : playbackSourceRef}
                audioRef={audioRef}
              />
              <p className="text-xs text-gray-600 mt-3 text-justify">
                💡 <strong>Cómo leer el espectrograma:</strong> El eje horizontal muestra el tiempo (segundos), 
                el eje vertical muestra la frecuencia (Hz). Los <strong>colores</strong> representan la intensidad 
                de energía: <span className="text-blue-600">azul</span> = baja intensidad, 
                <span className="text-yellow-600">verde-amarillo</span> = intensidad media, 
                <span className="text-orange-600">naranja</span> = alta intensidad (más intenso).
              </p>
            </div>
          )}

          {/* WordCloud - ahora visible en columna derecha */}
          {transcript && transcript.trim().split(/\s+/).filter(Boolean).length > 3 && (
            <div className="p-4 border-2 rounded-lg bg-white shadow-lg border-[#F7C873]">
              <h3 className="text-lg font-semibold text-[#6B3F1D] mb-3">☁️ Nube de Palabras</h3>
              <WordCloud transcript={transcript} maxWords={30} />
              <p className="text-xs text-gray-600 mt-3 text-justify">
                La nube de palabras muestra las palabras más utilizadas durante tu grabación. 
                El tamaño de cada palabra es proporcional a la frecuencia con la que la pronunciaste.
              </p>
            </div>
          )}

          {/* Métricas de Ritmo y Fluidez */}
          {transcript && duration > 0 && (
            <div className="p-4 border-2 border-[#8B5F3D] rounded-lg bg-gradient-to-br from-[#FFF6ED] to-[#F7C873] shadow-sm">
              <h3 className="text-base font-bold text-[#6B3F1D] mb-2 flex items-center gap-2">
                📈 Métricas de Ritmo y Fluidez
              </h3>
              <p className="text-xs text-gray-700 mb-3">
                Estas métricas ayudan a evaluar el ritmo del habla y las características prosódicas:
              </p>

              {/* Nota informativa sobre rangos normales */}
              <div className="mb-4 p-3 bg-white border-l-4 border-[#6B3F1D] rounded">
                <h4 className="font-bold text-[#6B3F1D] text-xs mb-1 flex items-center gap-1">
                  <span>📊</span> Rangos normales
                </h4>
                <div className="text-xs text-gray-700 space-y-0.5">
                  <p><strong>PPM:</strong> 125-175 palabras/minuto (conversación normal)</p>
                  <p><strong>PVI:</strong> Varía según idioma; valores altos = mayor variación rítmica</p>
                  <p><strong>VarcoV:</strong> Mayor variabilidad = ritmo más variable</p>
                  <p><strong>%V:</strong> ~40-45% es típico en español</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-[#8B5F3D]">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-sm text-[#6B3F1D]">PVI - Índice de Variación de Pares</h4>
                    <span className="text-lg font-bold text-[#8B5F3D]">
                      {calculatePVI(transcript).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">
                    Mide la variabilidad en la longitud de palabras consecutivas. 
                    Valores altos (&gt;50%) indican ritmo más marcado por acentos, mientras que valores bajos sugieren ritmo más uniforme.
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-[#8B5F3D]">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-sm text-[#6B3F1D]">VarcoV - Coeficiente de Variación Vocálica</h4>
                    <span className="text-lg font-bold text-[#8B5F3D]">
                      {calculateVarcoV(transcript, duration).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">
                    Coeficiente de variación normalizado de las duraciones vocálicas. 
                    Valores altos (&gt;40%) indican mayor variabilidad en la pronunciación de vocales, lo cual es típico de lenguas con ritmo acentual.
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-[#8B5F3D]">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-sm text-[#6B3F1D]">%V - Porcentaje Vocálico</h4>
                    <span className="text-lg font-bold text-[#8B5F3D]">
                      {calculatePercentV(transcript).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">
                    Porcentaje de vocales en el texto total (sin contar espacios). 
                    El español típicamente tiene entre 40-50% de vocales. Valores más altos pueden indicar pronunciación más clara y abierta.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
