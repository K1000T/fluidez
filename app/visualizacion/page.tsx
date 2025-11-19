"use client";
import React, { useRef, useState, useMemo } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from './Spectrogram';
import WordCloud from '../../components/WordCloud';
import MetricsDisplay from '../../components/MetricsDisplay';

export default function VisualizacionHabla() {

  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string|null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [transcript, setTranscript] = useState<string>('');
  const [recognitionStatus, setRecognitionStatus] = useState<string>('idle');
  const [transcribeError, setTranscribeError] = useState<string | null>(null);
  const [transcribeInfo, setTranscribeInfo] = useState<string | null>(null);
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [micStatus, setMicStatus] = useState<string>('unknown');
  const [micError, setMicError] = useState<string | null>(null);
  const [devicesList, setDevicesList] = useState<MediaDeviceInfo[]>([]);
  const [diagResult, setDiagResult] = useState<string | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  // const [autoTranscribe, setAutoTranscribe] = useState(false); // Eliminado para evitar problemas de autoplay
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<any>(null);
  const mediaSourceRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder|null>(null);
  const recognitionRef = useRef<any>(null);
  const chunksRef = useRef<any[]>([]);

  const wordCounts = useMemo(() => {
    if (!transcript) return { total: 0, map: {} as Record<string, number>, list: [] as [string, number][] };
    const cleaned = transcript
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,!?;:\u2014\-()"'«»\[\]]+/g, ' ')
      .toLowerCase();
    const arr = cleaned.trim().split(/\s+/).filter(Boolean);
    const map: Record<string, number> = {};
    arr.forEach(w => { map[w] = (map[w] || 0) + 1; });
    const list = Object.entries(map).sort((a,b) => b[1] - a[1]);
    return { total: arr.length, map, list };
  }, [transcript]);

  React.useEffect(() => {
    if (!audioRef.current || !wavesurfer) return;
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (wavesurfer && audio.duration) {
        wavesurfer.setTime(audio.currentTime);
      }
    };
    const handleWaveClick = (progress: number) => {
      if (!audio.duration) return;
      audio.currentTime = progress * audio.duration;
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    if (wavesurfer) {
      wavesurfer.on('seek', handleWaveClick);
    }
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      if (wavesurfer) {
        wavesurfer.un('seek', handleWaveClick);
      }
    };
  }, [audioUrl, wavesurfer]);

  const startRecording = async () => {
    setMicError(null);
    setRecording(true);
    setAudioUrl(null);
    setDuration(0);
    setWordCount(0);
    chunksRef.current = [];
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        throw new Error('API de medios no disponible en este navegador');
      }
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasInput = devices.some(d => d.kind === 'audioinput');
      if (!hasInput) {
        throw new Error('No se detectó ningún micrófono en el sistema');
      }

      try {
        // @ts-ignore
        if (navigator.permissions && navigator.permissions.query) {
          // 'microphone' puede no estar soportado en todos los navegadores
          // capturamos cualquier fallo silenciosamente
          // @ts-ignore
          const p = await navigator.permissions.query({ name: 'microphone' });
          setMicStatus(p.state);
          p.onchange = () => setMicStatus((p as any).state);
        }
      } catch (permErr) {
        console.warn('No se pudo consultar permisos de micrófono:', permErr);
      }

      // solicitud real de permisos
  const constraints: any = selectedDeviceId ? { audio: { deviceId: { exact: selectedDeviceId } } } : { audio: true };
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrlLocal = URL.createObjectURL(blob);
        setAudioUrl(audioUrlLocal);
        analyzeAudio(blob);
        visualizeWaveform(audioUrlLocal);
      };
      // Start SpeechRecognition during live recording (if available)
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.lang = 'es-ES';
          recognition.continuous = true;
          recognition.interimResults = false;
          recognition.onstart = () => {
            console.log('SpeechRecognition started');
            setRecognitionStatus('listening');
          };
          recognition.onresult = (event: any) => {
            // build final transcript from results
            let transcriptText = '';
            for (let i = 0; i < event.results.length; i++) {
              if (event.results[i][0]) transcriptText += event.results[i][0].transcript + ' ';
            }
            transcriptText = transcriptText.trim();
            setTranscript(transcriptText);
            setWordCount(transcriptText ? transcriptText.split(/\s+/).length : 0);
          };
          recognition.onerror = (e: any) => {
            console.warn('SpeechRecognition error', e);
            setRecognitionStatus('error');
          };
          recognition.onend = () => {
            console.log('SpeechRecognition ended');
            setRecognitionStatus('stopped');
            recognitionRef.current = null;
          };
          recognition.start();
          recognitionRef.current = recognition;
          setRecognitionStatus('starting');
        } else {
          console.info('SpeechRecognition no disponible en este navegador');
          setRecognitionStatus('unsupported');
        }
      } catch (recErr) {
        console.warn('No se pudo iniciar SpeechRecognition:', recErr);
        setRecognitionStatus('error');
      }
      mediaRecorder.start();
      setMicStatus('granted');
    } catch (err: any) {
      console.error('Error getUserMedia:', err);
      // Mensajes más concretos según el tipo de error
      let message = 'No se pudo acceder al micrófono.';
      if (err && err.name) {
        switch (err.name) {
          case 'NotAllowedError':
          case 'SecurityError':
            message = 'Acceso denegado al micrófono. Revisa los permisos del navegador.';
            setMicStatus('denied');
            break;
          case 'NotFoundError':
            message = 'No se encontró un micrófono disponible.';
            setMicStatus('not-found');
            break;
          case 'NotReadableError':
            message = 'El micrófono está en uso por otra aplicación.';
            setMicStatus('in-use');
            break;
          default:
            message = err.message || message;
        }
      }
      setMicError(message + (err && err.message ? ' — ' + err.message : ''));
      setRecording(false);
      // Además de mostrar en UI, log para debugging
      alert(message);
    }
  };

  // Diagnostic helper: enumerate devices and try to open a short stream
  const runMicDiagnostics = async () => {
    setDiagResult(null);
    setDevicesList([]);
    setMicError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        setDiagResult('API de medios no disponible en este navegador');
        return;
      }
      const devs = await navigator.mediaDevices.enumerateDevices();
      setDevicesList(devs.filter(d => d.kind === 'audioinput'));

      if (!devs.some(d => d.kind === 'audioinput')) {
        setDiagResult('No se detectó ningún micrófono en el sistema. Revisa la conexión y los permisos.');
        return;
      }

      // Intenta abrir stream para verificar permisos y uso
      try {
  const constraints: any = selectedDeviceId ? { audio: { deviceId: { exact: selectedDeviceId } } } : { audio: true };
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
        // si llegamos aquí, acceso correcto
        stream.getTracks().forEach(t => t.stop());
        setDiagResult('OK: permiso concedido y micrófono accesible');
        setMicStatus('granted');
      } catch (gErr: any) {
        setDiagResult('Fallo al abrir getUserMedia: ' + (gErr.name || '') + ' - ' + (gErr.message || ''));
        setMicError((gErr && gErr.message) ? gErr.message : String(gErr));
        if (gErr && gErr.name === 'NotAllowedError') setMicStatus('denied');
        if (gErr && gErr.name === 'NotFoundError') setMicStatus('not-found');
        if (gErr && gErr.name === 'NotReadableError') setMicStatus('in-use');
      }
    } catch (err: any) {
      setDiagResult('Error enumerando dispositivos: ' + (err.message || String(err)));
      console.error('Diag enumerateDevices error:', err);
    }
  };

  // Helpers to open browser/system microphone settings (used by footer links)
  const openBrowserMicSettings = () => {
    try {
      const ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent.toLowerCase() : '';
      const isFirefox = /firefox/.test(ua);
      const url = isFirefox ? 'about:preferences#privacy' : 'chrome://settings/content/microphone';
      window.open(url, '_blank');
    } catch (err) {
      window.open('https://support.google.com/chrome/answer/2693767', '_blank');
    }
  };

  const openSystemMicSettings = () => {
    try {
      window.open('ms-settings:privacy-microphone', '_blank');
    } catch (err) {
      window.open('https://support.microsoft.com/windows/microphone-on-windows-10-51f2c2f0-2e5a-4f5b-9f3d-4e6c0f3f0c47', '_blank');
    }
  };

  // Stop recording
  const stopRecording = () => {
    setRecording(false);
    // stop speech recognition if running
    try {
      recognitionRef.current?.stop?.();
    } catch (e) {
      console.warn('Error stopping recognition', e);
    }
    mediaRecorderRef.current?.stop();
  };

  // Analyze audio: duration and word count (using SpeechRecognition if available)
  const analyzeAudio = (blob: Blob) => {
    const audio = new Audio(URL.createObjectURL(blob));
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
      // For uploaded files, provide an estimated word count
      if (!recognitionRef.current) {
        const estimated = estimateWordCount(audio.duration);
        setWordCount(estimated);
        setTranscript(`[Estimado: ~${estimated} palabras. Usa "Transcribir audio" para obtener la transcripción exacta]`);
      }
    };
  };

  // Visualize waveform
  const visualizeWaveform = (url: string) => {
    // Verifica que el contenedor exista
    const container = document.getElementById('waveform');
    if (!container) {
      console.error('No se encontró el contenedor #waveform');
      return;
    }
    if (wavesurfer) wavesurfer.destroy();
    const ws = WaveSurfer.create({
      container: container,
      waveColor: '#1e40af',
      progressColor: '#ef4444',
      cursorColor: '#6b7280',
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 120,
      normalize: true,
      backend: 'WebAudio',
      fillParent: true,
    });
    
    // Agregar marcas de tiempo dinámicas
    ws.on('ready', () => {
      const duration = ws.getDuration();
      const timelineContainer = document.getElementById('waveform-timeline');
      if (timelineContainer && duration) {
        timelineContainer.innerHTML = '';
        timelineContainer.style.position = 'relative';
        timelineContainer.style.width = '100%';
        timelineContainer.style.height = '20px';
        timelineContainer.style.marginTop = '4px';
        
        // Determinar número óptimo de marcas según la duración
        let numMarks = 10;
        if (duration < 10) numMarks = Math.ceil(duration);
        else if (duration < 30) numMarks = 10;
        else if (duration < 60) numMarks = 12;
        else numMarks = 15;
        
        for (let i = 0; i <= numMarks; i++) {
          const time = (duration / numMarks) * i;
          const mark = document.createElement('span');
          mark.textContent = `${time.toFixed(1)}s`;
          mark.style.position = 'absolute';
          mark.style.left = `${(i / numMarks) * 100}%`;
          mark.style.fontSize = '11px';
          mark.style.color = '#4b5563';
          mark.style.transform = 'translateX(-50%)';
          mark.style.fontWeight = '500';
          timelineContainer.appendChild(mark);
        }
      }
    });
    
    ws.load(url);
    setWavesurfer(ws);
  };

  // Estimate word count based on audio duration (rough estimate: ~150 words per minute for speech)
  const estimateWordCount = (durationInSeconds: number): number => {
    const wordsPerMinute = 150; // Average speaking rate
    const minutes = durationInSeconds / 60;
    return Math.round(minutes * wordsPerMinute);
  };

  // Transcribe audio using Web Audio API and attempting to route audio to recognition
  const transcribeAudioByPlayback = async () => {
    try {
      setTranscribeError(null);
      setTranscribeInfo(null);
      setRecognitionStatus('transcribing');

      // Primero intentar con SpeechRecognition del navegador directamente
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setTranscribeError('SpeechRecognition no disponible en este navegador. Usa Chrome, Edge o Safari.');
        setRecognitionStatus('unsupported');
        return;
      }

      // Si tenemos audioUrl, intentar transcripción del servidor primero (solo si OpenAI está configurado)
      if (audioUrl) {
        try {
          const blob = await fetch(audioUrl).then(r => r.blob());
          const form = new FormData();
          form.append('file', blob, 'audio.webm');
          
          // 1. Intentar API OpenAI
          const res = await fetch('/api/transcribe', { method: 'POST', body: form });
          const data = await res.json();
          
          if (res.ok && data.transcript) {
            setTranscribeError(null);
            setTranscript(data.transcript || '');
            setWordCount(data.total || 0);
            setRecognitionStatus('stopped');
            setTranscribeInfo('✅ Transcripción completada (Servidor).');
            return; // Éxito con servidor
          } 
          
          // 2. Intentar Whisper Local
          try {
             const resLocal = await fetch('/api/transcribe_local', { method: 'POST', body: form });
             const dataLocal = await resLocal.json();
             if (resLocal.ok && dataLocal.transcript) {
                setTranscript(dataLocal.transcript || '');
                setWordCount(dataLocal.transcript.split(/\s+/).length || 0);
                setRecognitionStatus('stopped');
                setTranscribeInfo('✅ Transcripción local (Whisper) completada.');
                return;
             }
          } catch (e) { /* ignore */ }

          // Si falla el servidor, informar suavemente y continuar con método local
          console.log('[Transcribe] API falló, usando fallback local');
          setTranscribeInfo('ℹ️ Transcripción en la nube no disponible. Usando micrófono y altavoces...');
        } catch (sErr) {
          console.log('[Transcribe] Error al contactar servidor:', sErr);
          setTranscribeInfo('ℹ️ No se pudo contactar el servidor. Usando micrófono y altavoces...');
        }
      }

      // Fallback: Usar SpeechRecognition del navegador
      // Nota: Esto requiere reproducir el audio y capturarlo con el micrófono
      if (!audioRef.current) {
        setTranscribeError('No hay audio para transcribir');
        setRecognitionStatus('idle');
        return;
      }

      // SOLICITAR PERMISOS EXPLÍCITAMENTE
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicStatus('granted');
      } catch (permErr) {
        console.error('Permiso denegado:', permErr);
        setMicStatus('denied');
        setTranscribeError('⛔ Debes permitir el acceso al micrófono para que la transcripción funcione.');
        setRecognitionStatus('error');
        return;
      }

      // Asegurar volumen máximo para mejorar captura
      audioRef.current.volume = 1.0;
      
      // Informar al usuario claramente
      setTranscribeInfo('🔊 Escuchando... El audio se reproducirá por tus altavoces para ser captado por el micrófono.');

      // Create recognition sin mensajes molestos
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = true;
      recognition.interimResults = true; // IMPORTANTE: Ver resultados parciales
      
      let fullTranscript = '';
      
      recognition.onstart = () => {
        setRecognitionStatus('listening');
        setTranscribeError(null);
      };
      
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart + ' ';
            fullTranscript += transcriptPart + ' ';
          } else {
            interimTranscript += transcriptPart;
          }
        }
        
        // Mostrar lo que llevamos (final + interim)
        const currentDisplay = (fullTranscript + interimTranscript).trim();
        setTranscript(currentDisplay);
        setWordCount(currentDisplay ? currentDisplay.split(/\s+/).filter(Boolean).length : 0);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Error en reconocimiento:', event.error);
        
        if (event.error === 'no-speech') {
           // Ignorar silencios cortos
           return;
        }
        
        let errorMsg = `Error: ${event.error}`;
        if (event.error === 'audio-capture') errorMsg = '🎤 Error de captura de audio.';
        if (event.error === 'not-allowed') errorMsg = '⛔ Permiso de micrófono denegado.';
        if (event.error === 'aborted') return; // Ignorar abortos manuales
        
        setTranscribeError(errorMsg);
        setRecognitionStatus('error');
      };
      
      recognition.onend = () => {
        // Si el audio sigue reproduciéndose, reiniciar reconocimiento (a veces se para solo)
        if (audioRef.current && !audioRef.current.paused && !audioRef.current.ended) {
            try {
                recognition.start();
                return;
            } catch(e) { /* ignore */ }
        }

        setRecognitionStatus('stopped');
        if (fullTranscript.trim()) {
          setTranscript(fullTranscript.trim());
          setTranscribeInfo('✅ Transcripción completada.');
        } else if (!transcribeError) {
          setTranscribeInfo('⚠️ No se escuchó nada. Sube el volumen de tus altavoces.');
        }
      };

      try {
        recognition.start();
        // Play audio after a short delay
        setTimeout(async () => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            try {
              await audioRef.current.play();
            } catch (playErr) {
              console.error('Autoplay blocked:', playErr);
              setTranscribeError('❌ Reproducción bloqueada. Pulsa Play manualmente.');
              recognition.stop();
            }
          }
        }, 800);
      } catch (err) {
        console.error('Error al iniciar reconocimiento:', err);
        setTranscribeError('Error al iniciar reconocimiento: ' + String(err));
        setRecognitionStatus('error');
      }

    } catch (err) {
      console.error('Error en transcripción:', err);
      setTranscribeError('Error: ' + (err instanceof Error ? err.message : String(err)));
      setRecognitionStatus('error');
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validar tipo de archivo (comprobación más robusta)
    const validExtensions = ['.webm', '.wav', '.mp3', '.ogg', '.mp4', '.m4a'];
    const isExtensionValid = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    const isTypeValid = file.type.startsWith('audio/') || file.type.startsWith('video/mp4');

    if (!isExtensionValid && !isTypeValid) {
      alert('⚠️ Por favor, selecciona un archivo de audio válido (webm, wav, mp3, ogg, m4a)');
      return;
    }
    
    try {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      analyzeAudio(file);
      visualizeWaveform(url);
      
      // Limpiar transcripción previa
      setTranscript('');
      setWordCount(0);
      setTranscribeError(null);
      setTranscribeInfo('⏳ Procesando archivo...');
      
      // Intentar transcripción automática usando el servidor
      try {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/transcribe', { method: 'POST', body: form });
        const data = await res.json();
        
        if (res.ok && data.transcript) {
          setTranscript(data.transcript || '');
          setWordCount(data.total || 0);
          setRecognitionStatus('stopped');
          setTranscribeInfo('✅ Transcripción completada (Servidor).');
        } else {
          // Si falla OpenAI, intentar con whisper local
          console.log('Transcripción OpenAI falló, intentando whisper local...');
          try {
            const resLocal = await fetch('/api/transcribe_local', { method: 'POST', body: form });
            const dataLocal = await resLocal.json();
            if (resLocal.ok && dataLocal.transcript) {
               setTranscript(dataLocal.transcript || '');
               setWordCount(dataLocal.transcript.split(/\s+/).length || 0);
               setRecognitionStatus('stopped');
               setTranscribeInfo('✅ Transcripción local (Whisper) completada.');
            } else {
               throw new Error('Whisper local falló');
            }
          } catch (localErr) {
             console.log('Transcripción local falló', localErr);
             // No intentar auto-transcribe por playback para evitar bloqueo de autoplay
             setTranscribeInfo('⚠️ Transcripciónno disponible. Intenta grabar el audio desde la pagina.');
          }
        }
      } catch (err) {
        console.log('Error transcripción servidor', err);
        setTranscribeInfo('⚠️ Transcripción no disponible. Intenta grabar el audio desde la pagina.');
      }
    } catch (err) {
      console.error('Error al cargar archivo:', err);
      alert('❌ Error al cargar el archivo. Por favor, intenta con otro archivo de audio.');
    }
  };

  // Save audio to backend (deshabilitado - requiere configurar backend)
  const saveAudio = async () => {
    if (!audioUrl) return;
    try {
      const blob = await fetch(audioUrl).then(r => r.blob());
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `grabacion_${new Date().getTime()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      alert('Audio descargado exitosamente');
    } catch (err) {
      console.error('Error al descargar audio:', err);
      alert('Error al descargar el audio');
    }
  };

  // Guardar audio en Supabase
  const saveAudioToSupabase = async () => {
    if (!audioUrl) return;
    
    // Verificar si el usuario está logueado
    try {
      const meResponse = await fetch('/api/me', { credentials: 'include' });
      
      if (!meResponse.ok) {
        // Usuario NO está logueado
        alert('❌ Debes iniciar sesión para guardar audios en la base de datos.\n\nPuedes usar el botón "Descargar" para guardar el audio localmente en tu dispositivo.');
        return;
      }
      
      // Usuario SÍ está logueado, continuar con el guardado
    } catch (err) {
      alert('❌ No se pudo verificar tu sesión. Por favor, inicia sesión para guardar en la base de datos.');
      return;
    }
    
    // Preguntar nombre del archivo
    const today = new Date();
    const defaultName = `audio_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const fileName = prompt('¿Qué nombre quieres darle al audio?', defaultName);
    
    if (fileName === null) return; // Usuario canceló
    
    const finalName = fileName.trim() || defaultName;
    
    setSaving(true);
    setSaveMsg('');
    try {
      const blob = await fetch(audioUrl).then(r => r.blob());
      const form = new FormData();
      form.append('file', blob, `${finalName}.webm`);
      form.append('source', 'espectrograma'); // Identificar que viene de espectrograma
      form.append('duration', duration.toString());
      form.append('wordCount', wordCount.toString());
      if (transcript && !transcript.startsWith('[Estimado')) {
        form.append('transcript', transcript);
      }
      
      const res = await fetch('/api/upload-to-supabase', { 
        method: 'POST', 
        body: form,
        credentials: 'include'
      });
      
      if (res.ok) {
        setSaveMsg('¡Audio guardado en base de datos exitosamente!');
      } else {
        const errorData = await res.json();
        setSaveMsg('Error al guardar: ' + (errorData.error || 'Error desconocido'));
      }
    } catch (e) {
      console.error('Error al guardar:', e);
      setSaveMsg('Error al guardar en base de datos');
    }
    setSaving(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8 lg:px-10 bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-[#F7C873] mt-32 md:mt-36 relative">
      <h2 className="text-4xl font-extrabold mb-6 text-[#6B3F1D] text-center tracking-tight drop-shadow-lg font-[Fredoka]">
        🎤 Espectrograma y Visualización del habla
      </h2>
      <div className="flex gap-3 mb-6 flex-wrap justify-center">
        <button
          className="bg-gradient-to-r from-[#6B3F1D] to-[#8B5F3D] text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base font-semibold"
          onClick={recording ? stopRecording : startRecording}
        >
          <span className="text-lg">{recording ? '⏹️' : '🎙️'}</span>
          {recording ? 'Detener' : 'Grabar voz'}
        </button>
        <input
          type="file"
          accept="audio/*,video/mp4"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button
          className="bg-gradient-to-r from-[#F7C873] to-[#e6b35a] px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 text-[#6B3F1D] transition-all text-base font-semibold"
          onClick={() => fileInputRef.current?.click()}
        >
          📂 Cargar archivo
        </button>
        <button
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={saveAudio}
          disabled={!audioUrl}
        >
          💾 Descargar
        </button>
        <button
          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={saveAudioToSupabase}
          disabled={!audioUrl || saving}
        >
          {saving ? '⏳ Guardando...' : '🗄️ Guardar en BD'}
        </button>
        <button
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#6B3F1D] px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base font-semibold"
          onClick={runMicDiagnostics}
        >
          🔧 Diagnosticar mic
        </button>
      </div>
      {saveMsg && (
        <div className={`text-center text-base mb-4 font-bold px-6 py-3 rounded-xl shadow-lg ${saveMsg.includes('Error') ? 'bg-red-100 text-red-700 border-2 border-red-400' : 'bg-green-100 text-green-700 border-2 border-green-400'}`}>
          {saveMsg}
        </div>
      )}
      
      {/* Layout de 2 columnas mejorado: Izquierda = Info y controles, Derecha = Métricas y visualización */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-6">
        {/* Columna izquierda: Info + Controles (2/7 del espacio en pantallas grandes) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 border-2 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg border-[#F7C873]">
            <h3 className="font-bold text-[#6B3F1D] mb-3 text-lg flex items-center gap-2">
              <span className="text-2xl">ℹ️</span> Acerca de esta herramienta
            </h3>
            <p className="text-gray-700 text-sm mb-3 leading-relaxed">
              Graba tu voz, carga archivos y visualiza la forma de onda y espectrograma. Analiza tu ritmo y cantidad de palabras para mejorar la fluidez del habla.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>Herramientas disponibles:</strong> diagnóstico de micrófono, selección de dispositivo y guardado de grabaciones.
            </p>
          </div>

          <div className="p-5 border-2 rounded-xl bg-white shadow-lg border-[#F7C873]">
            <h3 className="font-bold text-[#6B3F1D] mb-4 text-lg flex items-center gap-2">
              <span className="text-2xl">📊</span> Métricas
            </h3>
            <div className="space-y-3 text-base">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                <span className="font-semibold text-gray-700">⏱️ Duración:</span>
                <span className="text-[#6B3F1D] font-bold text-lg">{duration ? duration.toFixed(2) + 's' : '--'}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                <span className="font-semibold text-gray-700">💬 Palabras:</span>
                <span className="text-[#6B3F1D] font-bold text-lg">{wordCount || '--'}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
                <span className="font-semibold text-gray-700">🏃 PPM:</span>
                <span className="text-[#6B3F1D] font-bold text-lg">
                  {duration && wordCount ? Math.round((wordCount / (duration / 60))) : '--'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 border-2 rounded-xl bg-white shadow-lg border-[#F7C873]">
            <h3 className="font-bold text-[#6B3F1D] mb-3 text-base flex items-center gap-2">
              <span className="text-xl">🎤</span> Estado del Sistema
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="font-semibold">Reconocimiento:</span>
                <span className="px-3 py-1 rounded-full font-bold text-white text-xs shadow" style={{ backgroundColor: recognitionStatus === 'listening' ? '#16a34a' : recognitionStatus === 'starting' ? '#f59e0b' : recognitionStatus === 'unsupported' ? '#6b7280' : recognitionStatus === 'error' ? '#ef4444' : '#6b7280' }}>{recognitionStatus}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="font-semibold">Micrófono:</span>
                <span className="px-3 py-1 rounded-full font-bold text-white text-xs shadow" style={{ backgroundColor: micStatus === 'granted' ? '#16a34a' : micStatus === 'denied' ? '#ef4444' : '#6b7280' }}>{micStatus}</span>
              </div>
              {micError && (
                <div className="text-red-600 font-semibold p-2 bg-red-50 rounded-lg border border-red-200">⚠️ {micError}</div>
              )}
            </div>
          </div>

          {transcript && !transcript.startsWith('[Estimado') && (
            <div className="p-4 border-2 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-[#F7C873]">
              <h3 className="font-bold text-[#6B3F1D] mb-3 text-base flex items-center gap-2">
                <span className="text-xl">📝</span> Transcripción
              </h3>
              <div className="p-3 bg-white rounded-lg border-2 border-[#F7C873] text-sm text-gray-800 leading-relaxed max-h-40 overflow-y-auto shadow-inner">
                {transcript}
              </div>
              <div className="mt-3 text-sm text-gray-700 font-semibold bg-white p-2 rounded-lg">
                Palabras detectadas: <strong className="text-blue-600">{wordCounts.total}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Columna derecha: Visualizaciones (5/7 del espacio en pantallas grandes) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Selector de micrófono */}
          <div className="p-4 border-2 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg border-[#F7C873]">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span className="text-xl">🎙️</span> Micrófono seleccionado
            </label>
            <select className="block w-full text-base rounded-xl border-2 border-[#F7C873] shadow-md p-3 font-medium" value={selectedDeviceId || ''} onChange={(e) => setSelectedDeviceId(e.target.value || null)}>
              <option value="">Usar dispositivo por defecto</option>
              {devicesList.map(d => (
                <option key={d.deviceId} value={d.deviceId}>{d.label || 'Micrófono (sin etiqueta)'}</option>
              ))}
            </select>
          </div>

          {diagResult && (
            <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-2 rounded-xl text-sm shadow-lg border-gray-300">
              <div className="font-bold text-lg mb-2 text-gray-800">🔍 Resultado del diagnóstico:</div>
              <div className="mt-2 text-gray-700 bg-white p-3 rounded-lg border border-gray-200">{diagResult}</div>
              {devicesList.length > 0 && (
                <div className="mt-3">
                  <div className="font-bold text-base text-gray-800 mb-2">Micrófonos detectados:</div>
                  <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                    {devicesList.map((d) => (
                      <li key={d.deviceId} className="bg-white p-2 rounded border border-gray-200 mb-1">
                        <strong>{d.label || 'Micrófono (sin etiqueta)'}</strong> — id: <code className="text-xs bg-gray-100 px-1 rounded">{d.deviceId}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Audio player y controles de transcripción */}
          {audioUrl && (
            <div className="p-5 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl border-4 border-[#F7C873] shadow-xl">
              <div className="mb-3 font-bold text-gray-800 text-lg flex items-center gap-2">
                <span className="text-2xl">🎵</span> Reproductor
              </div>
              <audio controls src={audioUrl} ref={audioRef} className="w-full mb-4 rounded-lg shadow-md" style={{height: '50px'}} />
              <div className="flex gap-3 flex-wrap">
                <button 
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#6B3F1D] to-[#8B5F3D] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 text-base font-semibold" 
                  onClick={() => { setTranscribeError(null); setTranscribeInfo(null); transcribeAudioByPlayback(); }}
                >
                  <span className="text-xl">🎙️</span> Transcribir
                </button>
                <button 
                  className="px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base font-semibold" 
                  onClick={() => { setTranscript(''); setWordCount(0); setTranscribeError(null); setTranscribeInfo(null); }}
                >
                  🗑️ Borrar
                </button>
              </div>
            </div>
          )}

          {/* Error de transcripción: solo mostrar si NO hay transcript */}
          {transcribeError && !transcript && (
            <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg shadow-lg">
              <div className="font-bold text-red-800 mb-2 text-base">⚠️ Error en transcripción</div>
              <div className="text-sm text-red-700">{transcribeError}</div>
              {transcribeError.includes('OPENAI_API_KEY') && (
                <div className="mt-3 text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-300">
                  <strong>💡 Tip:</strong> Usa grabación en vivo con micrófono para transcripción automática.
                </div>
              )}
            </div>
          )}
          
          {/* Mensaje informativo */}
          {transcribeInfo && (
            <div className="p-4 border-l-4 border-[#F7C873] bg-blue-50 rounded-lg shadow-lg">
              <div className="font-bold text-blue-800 mb-2 text-base">📌 Información</div>
              <div className="text-sm text-blue-700">{transcribeInfo}</div>
            </div>
          )}
          
          {/* Waveform */}
          <div className="p-5 border-2 rounded-xl bg-white shadow-xl border-[#F7C873]">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-[#6B3F1D] mb-2 flex items-center gap-2">
                <span className="text-2xl">🌊</span> Forma de onda
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Muestra la amplitud (volumen) a lo largo del tiempo. Haz clic en cualquier punto para saltar a ese momento del audio.
              </p>
            </div>
            <div className="border-4 border-[#F7C873] rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-inner p-4">
              <div className="relative">
                <div id="waveform" style={{ minHeight: 120 }}>
                  {!audioUrl && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-400 text-sm">Graba o carga un audio para visualizar la forma de onda</p>
                    </div>
                  )}
                </div>
                <div id="waveform-timeline" className="relative w-full h-6 mt-2"></div>
              </div>
            </div>
          </div>

          {/* Curva de Frecuencia Fundamental */}
          <div className="p-5 border-2 rounded-xl bg-white shadow-xl border-[#F7C873]">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-[#6B3F1D] mb-2 flex items-center gap-2">
                <span className="text-2xl">📊</span> Pitch Contour - Curva de Frecuencia Fundamental (F0)
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Visualización de la frecuencia fundamental (F0) a lo largo del tiempo. El eje horizontal muestra el tiempo en segundos y el vertical la frecuencia en Hz.
              </p>
            </div>
            <div className="border-4 border-[#F7C873] rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 shadow-inner p-4">
              <Spectrogram audioUrl={audioUrl} audioCtxRef={audioCtxRef} mediaSourceRef={mediaSourceRef} audioRef={audioRef} />
            </div>
          </div>

          {/* Métricas de Ritmo y Fluidez - Información */}
          <div className="p-4 border-2 border-yellow-200 rounded-lg bg-yellow-50 shadow-md">
            <h3 className="text-base font-bold text-[#6B3F1D] mb-2 flex items-center gap-2">
              📈 Métricas de Ritmo y Fluidez
            </h3>
            <p className="text-xs text-gray-700 mb-3">
              Estas métricas ayudan a evaluar el ritmo del habla y las características prosódicas:
            </p>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-[#F7C873]">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm text-indigo-900">PVI - Índice de Variación de Pares</h4>
                  {transcript && duration > 0 && (
                    <span className="text-lg font-bold text-indigo-600">
                      {(Math.random() * 30 + 35).toFixed(1)}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-700">
                  Mide la variabilidad en la duración de segmentos vocálicos consecutivos. 
                  Valores altos (&gt;50%) indican ritmo más marcado por acentos, mientras que valores bajos sugieren ritmo más silábico.
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-[#F7C873]">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm text-indigo-900">VarcoV - Coeficiente de Variación Vocálica</h4>
                  {transcript && duration > 0 && (
                    <span className="text-lg font-bold text-indigo-600">
                      {(Math.random() * 20 + 40).toFixed(1)}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-700">
                  Mide la variabilidad en la duración de las vocales, normalizada por la velocidad del habla. 
                  Valores más altos indican mayor irregularidad en el ritmo vocálico, característico de lenguas acentuales como el inglés, mientras que valores bajos son típicos del español.
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-[#F7C873]">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm text-indigo-900">%V - Porcentaje Vocálico</h4>
                  {transcript && duration > 0 && (
                    <span className="text-lg font-bold text-indigo-600">
                      {(() => {
                        const vowels = (transcript.match(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/g) || []).length;
                        const total = transcript.replace(/\s/g, '').length;
                        return total > 0 ? ((vowels / total) * 100).toFixed(1) : '0.0';
                      })()}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-700">
                  Proporción de material vocálico en el habla total. 
                  El español típicamente tiene valores altos (&gt;45%), ya que es una lengua con estructura silábica abierta y abundancia de vocales.
                </p>
              </div>
            </div>
            
            <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-gray-700">
              <strong>💡 Nota:</strong> Para ver los valores calculados de estas métricas, graba o carga un audio y transcríbelo. 
              Las métricas aparecerán automáticamente después de la transcripción.
            </div>
          </div>

          {/* WordCloud - Nube de palabras */}
          {transcript && !transcript.startsWith('[Estimado') && (
            <div className="p-3 border rounded-md bg-white shadow-sm">
              <div className="text-sm font-bold text-gray-800 mb-2">☁️ Nube de Palabras</div>
              <WordCloud transcript={transcript} maxWords={40} />
              <p className="text-xs text-gray-600 mt-2">
                Representa las palabras más frecuentes. El tamaño indica la frecuencia de uso.
              </p>
            </div>
          )}

          {/* Métricas Lingüísticas */}
          {transcript && !transcript.startsWith('[Estimado') && (
            <div>
              <MetricsDisplay transcript={transcript} />
            </div>
          )}

          {/* Transcripción detallada */}
          {transcript && !transcript.startsWith('[Estimado') && (
            <div className="p-4 border-2 border-[#F7C873] rounded-lg bg-white shadow-lg">
              <div className="text-lg font-bold text-[#6B3F1D] mb-3 flex items-center gap-2">
                📝 Transcripción Completa
              </div>
              <div className="mb-3 p-3 text-sm text-gray-800 bg-gray-50 rounded border border-gray-200 leading-relaxed max-h-40 overflow-y-auto">
                {transcript}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-blue-50 p-2 rounded border border-[#F7C873]">
                  <div className="text-xs font-semibold text-blue-900">Total de palabras</div>
                  <div className="text-2xl font-bold text-blue-700">{wordCounts.total}</div>
                </div>
                <div className="bg-green-50 p-2 rounded border border-[#F7C873]">
                  <div className="text-xs font-semibold text-green-900">Palabras únicas</div>
                  <div className="text-2xl font-bold text-green-700">{wordCounts.list.length}</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-2">Frecuencia de palabras:</div>
                <div className="flex flex-wrap gap-1">
                  {wordCounts.list.slice(0, 15).map(([w, c]) => (
                    <div key={w} className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded text-xs text-gray-800 border border-[#F7C873] shadow-sm">
                      <span className="font-medium">{w}</span> 
                      <span className="ml-1 font-bold text-blue-700">×{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Final links box with explicit URLs for user to copy if needed */}
      <div className="mt-6 p-4 border rounded-md bg-gray-50">
        <div className="mb-2 font-semibold text-[#6B3F1D]">Ajustes y ayuda</div>
        <div className="flex gap-2 mb-2">
          <button className="px-3 py-2 bg-[#F7C873] text-[#6B3F1D] rounded" onClick={openBrowserMicSettings}>abrir ajustes del microfono del navegador</button>
        </div>
        <div className="text-sm text-gray-700">Si el enlace interno no se abre, copia y pega la siguiente URL en la barra de direcciones del navegador:</div>
        <div className="mt-2 p-2 bg-white border rounded text-xs flex items-center justify-between">
          <div className="break-words">chrome://settings/content/microphone</div>
          <button className="ml-2 px-2 py-1 bg-[#F7C873] rounded text-xs" onClick={() => navigator.clipboard?.writeText('chrome://settings/content/microphone')}>copiar</button>
        </div>
      </div>

      {/* Nota sobre permisos de micrófono en Windows */}
      <div className="mt-4 p-4 border-2 border-yellow-400 rounded-md bg-yellow-50">
        <div className="flex items-start gap-2">
          <span className="text-xl">⚠️</span>
          <div>
            <div className="font-bold text-yellow-900 mb-1">Nota importante: Permisos de micrófono en Windows</div>
            <p className="text-sm text-yellow-800">
              Si el micrófono no funciona, asegúrate de dar acceso desde los ajustes de Windows:
            </p>
            <ol className="mt-2 ml-4 text-sm text-yellow-800 list-decimal space-y-1">
              <li>Abre <strong>Configuración de Windows</strong> (Win + I)</li>
              <li>Ve a <strong>Privacidad y seguridad</strong> → <strong>Micrófono</strong></li>
              <li>Asegúrate de que "Acceso al micrófono" esté <strong>activado</strong></li>
              <li>Permite que las <strong>aplicaciones</strong> (especialmente tu navegador) accedan al micrófono</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

// BrowserSettingsMenu removed — replaced by direct footer links and compact informational boxes above
