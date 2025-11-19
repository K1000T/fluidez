"use client";
import React, { useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

export default function VisualizacionHabla() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string|null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder|null>(null);
  const chunksRef = useRef<any[]>([]);

  // Start recording
  const startRecording = async () => {
    setRecording(true);
    setAudioUrl(null);
    setDuration(0);
    setWordCount(0);
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
      mediaRecorder.start();
    } catch (err) {
      alert('No se pudo acceder al micrófono.');
      setRecording(false);
    }
  };

  // Stop recording
  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current?.stop();
  };

  // Analyze audio: duration and word count (using SpeechRecognition if available)
  const analyzeAudio = (blob: Blob) => {
    const audio = new Audio(URL.createObjectURL(blob));
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
    // Word count: try SpeechRecognition API
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setWordCount(transcript.trim().split(/\s+/).length);
      };
      recognition.onerror = () => setWordCount(0);
      recognition.start();
      audio.play();
    }
  };

  // Visualize waveform
  // ...existing code...

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
      waveColor: '#4f46e5',
      progressColor: '#f59e42',
      height: 80
    });
    ws.load(url);
    setWavesurfer(ws);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      analyzeAudio(file);
      visualizeWaveform(url);
    }
  };

  // Save audio to backend
  const saveAudio = async () => {
    if (!audioUrl) return;
    const res = await fetch('/api/audio', {
      method: 'POST',
      body: await fetch(audioUrl).then(r => r.blob()),
      headers: { 'Content-Type': 'audio/webm' },
    });
    if (res.ok) alert('Audio guardado en la base de datos');
    else alert('Error al guardar el audio');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Visualización del habla</h2>
      <div className="flex gap-4 mb-4">
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={recording ? stopRecording : startRecording}
        >
          <span className="material-icons">mic</span>
          {recording ? 'Detener grabación' : 'Grabar voz'}
        </button>
        <input
          type="file"
          accept="audio/*,video/mp4"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button
          className="bg-gray-200 px-4 py-2 rounded"
          onClick={() => fileInputRef.current?.click()}
        >
          Cargar archivo
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={saveAudio}
          disabled={!audioUrl}
        >
          Guardar audio
        </button>
      </div>
      <div className="mb-2">Tiempo: {duration ? duration.toFixed(2) + 's' : '--'}</div>
      <div className="mb-2">Cantidad de palabras: {wordCount || '--'}</div>
      <div id="waveform" className="mb-4" style={{ minHeight: 80 }}></div>
      {audioUrl && (
        <audio controls src={audioUrl} ref={audioRef} className="w-full" />
      )}
      <p className="mt-4 text-gray-600 text-sm">
        Esta sección permite grabar tu voz, cargar archivos de audio y visualizar la forma de onda. Así puedes analizar tu ritmo y cantidad de palabras, lo que ayuda a reducir las prolongaciones al hablar.

      </p>
    </div>
  );
}
