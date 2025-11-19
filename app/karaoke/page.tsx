'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const FRASES = [
  // Frases cortas y simples
  "El sol brilla en el cielo azul",
  "Mi perro corre por el parque verde",
  "La luna llena ilumina la noche oscura",
  "Los pájaros cantan en la mañana fresca",
  
  // Frases motivacionales y de superación
  "La perseverancia convierte los sueños en realidad cada día",
  "Cada palabra que pronuncio me acerca más a la fluidez perfecta",
  "Hoy elijo hablar con confianza y sin miedo al error",
  "Mi voz es importante y merece ser escuchada con claridad",
  "La práctica constante transforma las dificultades en fortalezas duraderas",
  "Cada intento es un paso adelante en mi camino de mejora",
  "Respiro profundo y hablo con calma y seguridad total",
  "Mi progreso es real aunque a veces parezca invisible",
  "Acepto mis desafíos y celebro cada pequeño logro alcanzado",
  "La fluidez llega cuando menos la espero y más la practico",
  
  // Frases filosóficas y reflexivas
  "El silencio también es una forma válida de comunicación profunda",
  "Las palabras tienen poder cuando nacen del corazón sincero",
  "La paciencia es la virtud que acompaña todo aprendizaje verdadero",
  "El camino hacia la maestría se construye paso a paso",
  "La imperfección es parte natural del proceso de crecimiento humano",
  
  // Frases de la naturaleza y poéticas
  "El viento susurra secretos antiguos entre las hojas verdes",
  "Las olas del mar danzan al ritmo eterno de la luna",
  "El amanecer pinta el cielo con colores de esperanza",
  "Las estrellas brillan intensamente en la oscuridad profunda",
  "La lluvia acaricia suavemente la tierra sedienta esperando",
  "Los árboles centenarios guardan historias de tiempos pasados",
  "El arcoíris emerge majestuoso después de la tormenta violenta",
  
  // Frases terapéuticas profesionales
  "La respiración profunda y controlada mejora la articulación precisa",
  "El inicio suave de las palabras reduce la tensión muscular",
  "La velocidad pausada permite mayor control sobre el habla",
  "Los ejercicios diarios fortalecen los músculos de la pronunciación",
  "La conciencia articulatoria transforma la manera de comunicarnos efectivamente",
  "El ritmo constante facilita la coordinación entre pensamiento y palabra",
  
  // Citas famosas adaptadas
  "La única forma de hacer un gran trabajo es amar lo que haces - Steve Jobs",
  "El éxito es la suma de pequeños esfuerzos repetidos día tras día - Robert Collier",
  "No cuentes los días haz que los días cuenten realmente - Muhammad Ali",
  "La mejor manera de predecir el futuro es crearlo tú mismo - Peter Drucker",
  "Todo lo que puedas imaginar es real si trabajas por ello - Pablo Picasso",
  "El fracaso es simplemente la oportunidad de comenzar de nuevo con más inteligencia - Henry Ford",
  "La vida es como montar en bicicleta para mantener el equilibrio debes seguir moviéndote - Albert Einstein",
  
  // Fragmentos de poemas famosos
  "Caminante no hay camino se hace camino al andar - Antonio Machado",
  "Volverán las oscuras golondrinas en tu balcón sus nidos a colgar - Gustavo Adolfo Bécquer",
  "En un lugar de la Mancha de cuyo nombre no quiero acordarme - Miguel de Cervantes",
  "Por una mirada un mundo por una sonrisa un cielo - Gustavo Adolfo Bécquer",
  "Verde que te quiero verde verde viento verdes ramas - Federico García Lorca",
  
  // Trabalenguas suaves (para práctica avanzada)
  "Tres tristes tigres tragaban trigo en un trigal asoleado",
  "Pablito clavó un clavito en la calva de un calvito",
  "El cielo está enladrillado quien lo desenladrillará",
  "Como poco coco como poco coco compro y siempre digo poco coco compro",
  
  // Frases sobre la comunicación y el lenguaje
  "Las palabras son ventanas o pueden ser muros que separan",
  "Escuchar con atención es el primer paso hacia la comprensión mutua",
  "La comunicación efectiva requiere claridad honestidad y empatía profunda",
  "Cada conversación es una oportunidad para conectar con otra alma",
  "El lenguaje corporal comunica más que las palabras pronunciadas",
  
  // Afirmaciones positivas
  "Soy capaz de superar cualquier obstáculo con determinación",
  "Mi voz merece ser escuchada y respetada por todos",
  "Cada día mi comunicación es más clara y efectiva",
  "Confío plenamente en mi capacidad de expresarme con fluidez",
  "Acepto mis imperfecciones y celebro mis fortalezas únicas",
  
  // Frases de sabiduría popular
  "Más vale pájaro en mano que cien volando por el cielo",
  "No por mucho madrugar amanece más temprano nunca",
  "A quien madruga Dios le ayuda siempre en sus empresas",
  "En boca cerrada no entran moscas ni problemas innecesarios",
  "El que siembra vientos cosecha tempestades inevitablemente",
  
  // Frases sobre el tiempo y la paciencia
  "El tiempo cura todas las heridas si le damos espacio",
  "La paciencia es amarga pero su fruto es dulce siempre",
  "Roma no se construyó en un día ni tu fluidez tampoco",
  "Cada momento presente es una oportunidad de empezar de nuevo",
  "El mañana pertenece a quienes se preparan hoy con dedicación"
];

export default function JuegoKaraoke() {
  const [selectedPhrase, setSelectedPhrase] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [speed, setSpeed] = useState(1.2); // segundos por palabra
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathProgress, setBreathProgress] = useState(0);
  const [wordsSpoken, setWordsSpoken] = useState<Set<number>>(new Set()); // Track palabras ya contadas
  const wordsSpokenRef = useRef<Set<number>>(new Set());
  const [wordTimestamps, setWordTimestamps] = useState<Map<number, number>>(new Map()); // Timestamp de cada palabra
  const [lateWords, setLateWords] = useState<number[]>([]); // Palabras dichas tarde
  const [correctWords, setCorrectWords] = useState<number[]>([]); // Palabras correctas
  const [saveMessage, setSaveMessage] = useState(''); // Mensaje de guardado
  const [showWarning, setShowWarning] = useState(false); // Alerta de retraso
  const [gameEnded, setGameEnded] = useState(false); // Para mostrar estadísticas finales
  const intervalRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const currentWordRef = useRef<HTMLSpanElement | null>(null);
  const wordStartTimeRef = useRef<number>(0);

  // Efecto para hacer scroll automático a la palabra actual
  useEffect(() => {
    if (currentWordRef.current && isPlaying) {
      currentWordRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }, [currentWordIndex, isPlaying]);

  useEffect(() => {
    return () => {
      stopGame();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const selectPhrase = (phrase: string) => {
    setSelectedPhrase(phrase);
    setWords(phrase.split(' '));
    setCurrentWordIndex(-1);
    setScore(0);
  };

  const speakPhrase = (phrase: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancelar cualquier lectura previa
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9; // Velocidad un poco más lenta para claridad
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tu navegador no soporta síntesis de voz');
    }
  };

  const startBreathing = () => {
    setShowBreathing(true);
    let progress = 0;
    const breathInterval = setInterval(() => {
      progress += 2;
      setBreathProgress(progress);
      if (progress >= 100) {
        clearInterval(breathInterval);
        setShowBreathing(false);
        startKaraoke();
      }
    }, 40); // 2 segundos total
  };

  const startGame = async () => {
    if (!selectedPhrase) {
      alert('Selecciona una frase primero');
      return;
    }

    setGameStarted(true);
    
    // Iniciar micrófono para detección de voz
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      
      source.connect(analyser);
      
      // Empezar con ejercicio de respiración
      startBreathing();
    } catch (err) {
      alert('No se pudo acceder al micrófono');
      setGameStarted(false);
    }
  };

  const startKaraoke = () => {
    setCurrentWordIndex(0);
    setIsPlaying(true);
    setWordsSpoken(new Set()); // Reset palabras contadas
    wordsSpokenRef.current = new Set();
    setWordTimestamps(new Map());
    setLateWords([]);
    setCorrectWords([]);
    setGameEnded(false);
    wordStartTimeRef.current = Date.now();
    
    let index = 0;
    intervalRef.current = setInterval(() => {
      index++;
      wordStartTimeRef.current = Date.now(); // Timestamp de inicio de esta palabra
      
      if (index >= words.length) {
        // Auto-terminar cuando se acaban las palabras
        setTimeout(() => {
          endGameWithStats();
        }, 500);
        clearInterval(intervalRef.current);
      } else {
        setCurrentWordIndex(index);
      }
    }, speed * 1000);
  };

  const stopGame = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    checkVoiceActivity(); // Detener detección
  };

  const checkVoiceActivity = () => {
    if (!analyserRef.current || !isPlaying) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const check = () => {
      if (!isPlaying || !analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      
      // Si hay actividad de voz (umbral ajustable)
      if (average > 30) {
        setIsSpeaking(true);
        // Si está hablando cuando toca la palabra y NO ha sido contada aún
        if (currentWordIndex >= 0 && currentWordIndex < words.length && !wordsSpokenRef.current.has(currentWordIndex)) {
          const elapsedTime = Date.now() - wordStartTimeRef.current;
          const isLate = elapsedTime > (speed * 1000 * 0.7); // Si se tarda más del 70% del tiempo
          
          // Marcar como contada inmediatamente en el ref para evitar duplicados por frames
          wordsSpokenRef.current.add(currentWordIndex);
          setWordsSpoken(new Set(wordsSpokenRef.current));
          
          if (isLate) {
            // Palabra dicha tarde: -2 puntos
            setLateWords(prev => [...prev, currentWordIndex]);
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 1500);
          } else {
            // Palabra a tiempo: +10 puntos
            setCorrectWords(prev => [...prev, currentWordIndex]);
          }

          // Calcular puntaje derivado con estado "virtual" actualizado
          const newLateCount = lateWords.length + (isLate ? 1 : 0);
          const newCorrectCount = correctWords.length + (isLate ? 0 : 1);
          const newScore = newCorrectCount * 10 - newLateCount * 2;
          setScore(newScore);
        }
      } else {
        setIsSpeaking(false);
      }
      
      requestAnimationFrame(check);
    };
    
    check();
  };

  useEffect(() => {
    if (isPlaying) {
      checkVoiceActivity();
    }
  }, [isPlaying, currentWordIndex]);

  const saveScore = async () => {
    setSaveMessage('Guardando...');
    const gameData = {
      game: 'karaoke-fluido',
      score,
      attempts: words.length,
      correct: correctWords.length,
      late: lateWords.length,
      missed: words.length - correctWords.length - lateWords.length,
      timestamp: new Date().toISOString()
    };
    
    try {
      // Verificar si hay usuario autenticado
      const meResponse = await fetch('/api/me', { credentials: 'include' });
      const isAuthenticated = meResponse.ok;

      if (isAuthenticated) {
        // Usuario registrado: guardar en la nube (base de datos)
        const response = await fetch('/api/save-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(gameData)
        });

        // Siempre guardar en localStorage primero
        const stored = localStorage.getItem('game_scores');
        const scores = stored ? JSON.parse(stored) : [];
        scores.push({...gameData, id: Date.now().toString()});
        localStorage.setItem('game_scores', JSON.stringify(scores));

        if (response.ok) {
          setSaveMessage('✅ ¡Guardado exitosamente en la base de datos!');
        } else {
          // Intentar obtener el error específico
          const errorData = await response.json().catch(() => ({}));
          console.error('Error guardando en base de datos:', errorData);
          setSaveMessage(`⚠️ Error: ${errorData.error || 'Desconocido'}. Guardado localmente.`);
        }
      } else {
        // Usuario NO registrado: guardar solo en localStorage
        const stored = localStorage.getItem('game_scores');
        const scores = stored ? JSON.parse(stored) : [];
        scores.push({...gameData, id: Date.now().toString()});
        localStorage.setItem('game_scores', JSON.stringify(scores));
        setSaveMessage('💾 Guardado localmente (Inicia sesión para guardar en la nube)');
      }
    } catch (err) {
      console.error('Error saving score:', err);
      // Fallback: siempre guardar en localStorage
      const stored = localStorage.getItem('game_scores');
      const scores = stored ? JSON.parse(stored) : [];
      scores.push({...gameData, id: Date.now().toString()});
      localStorage.setItem('game_scores', JSON.stringify(scores));
      setSaveMessage('✅ Guardado localmente');
    }
    
    setTimeout(() => setSaveMessage(''), 4000);
  };
  
  const endGameWithStats = () => {
    stopGame();
    setGameEnded(true);
  };

  const endGame = () => {
    stopGame();
    setGameStarted(false);
    setGameEnded(false);
    setSelectedPhrase('');
    setWords([]);
    setScore(0);
    setCorrectWords([]);
    setLateWords([]);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8 mt-16 md:mt-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
            🎤 Karaoke con Frases
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Gana <strong>+10 puntos</strong> por cada palabra pronunciada a tiempo
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-[#6B3F1D] mb-4">¿Cómo jugar?</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li>Selecciona una frase o canción de la lista</li>
              <li>Primero harás un ejercicio de respiración (2 segundos)</li>
              <li>Las palabras se iluminarán una por una</li>
              <li>Lee cada palabra cuando se ilumine</li>
              <li>¡Gana puntos por mantener el ritmo!</li>
            </ol>

            <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-900">
                <strong>⭐ ¿Cómo se ganan puntos?</strong><br/>
                El sistema detecta cuando hablas usando el micrófono. Ganas <strong>+10 puntos</strong> por cada palabra que pronuncias 
                mientras está iluminada. El puntaje final refleja qué tan bien mantuviste el ritmo de lectura.
              </p>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">
                Velocidad: {speed.toFixed(1)}s por palabra
              </label>
              <input
                type="range"
                min="0.8"
                max="2.5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Rápido</span>
                <span>Normal</span>
                <span>Lento</span>
              </div>
            </div>
            
            <div className="p-4 bg-[#F7C873] bg-opacity-30 rounded-lg border border-[#6B3F1D]">
              <p className="text-sm text-[#6B3F1D]">
                <strong>💡 Beneficio terapéutico:</strong> Seguir una guía visual reduce la presión interna y ayuda a controlar 
                velocidad y pausas, evitando bloqueos iniciales.
              </p>
            </div>
          </div>

          {/* Lista de frases */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Selecciona una frase:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
              {FRASES.map((frase, i) => (
                <div key={i} className="flex gap-2">
                  <button
                    onClick={() => selectPhrase(frase)}
                    className={`flex-1 p-3 rounded-lg text-left text-sm transition-all ${
                      selectedPhrase === frase
                        ? 'bg-gradient-to-r from-[#F7C873] to-[#e6b35a] text-[#6B3F1D] font-semibold shadow-md'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {frase}
                  </button>
                  <button
                    onClick={() => speakPhrase(frase)}
                    className="px-3 py-2 bg-[#8B5F3D] text-white rounded-lg hover:bg-[#6B3F1D] transition-colors text-sm"
                    title="Escuchar frase"
                  >
                    🔊
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            disabled={!selectedPhrase}
            className="w-full py-4 bg-gradient-to-r from-[#6B3F1D] to-[#8B5F3D] text-white text-xl font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎮 Iniciar Karaoke
          </button>

          <Link 
            href="/progreso" 
            className="block mt-4 text-center text-[#6B3F1D] hover:underline"
          >
            📊 Ver mi progreso
          </Link>
        </div>
      </div>
    );
  }

  if (showBreathing) {
    const size = 100 + (breathProgress / 100) * 100; // Crece de 100px a 200px
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center mt-16 md:mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Respira profundamente</h2>
          <div className="flex justify-center mb-4">
            <div 
              className="rounded-full bg-gradient-to-br from-[#F7C873] to-[#e6b35a] transition-all duration-300"
              style={{
                width: `${size}px`,
                height: `${size}px`,
              }}
            />
          </div>
          <p className="text-xl text-gray-600">
            {breathProgress < 50 ? 'Inhala...' : 'Exhala...'}
          </p>
        </div>
      </div>
    );
  }

  // Pantalla de estadísticas finales
  if (gameEnded) {
    const totalWords = words.length;
    const missed = totalWords - correctWords.length - lateWords.length;
    const precision = totalWords > 0 ? ((correctWords.length / totalWords) * 100) : 0;
    const precisionRounded = Math.round(precision * 10) / 10; // 1 decimal
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8 mt-16 md:mt-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
              🎉 ¡Karaoke Completado!
            </h1>
            
            <div className="bg-gradient-to-r from-[#F7C873] to-[#e6b35a] text-white p-6 rounded-lg mb-6 text-center">
              <p className="text-lg mb-2">Puntuación Final</p>
              <p className="text-6xl font-bold">{score}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#FFF6ED] border-2 border-[#F7C873] p-4 rounded-lg text-center">
                <p className="text-4xl mb-2">✅</p>
                <p className="text-3xl font-bold text-[#6B3F1D]">{correctWords.length}</p>
                <p className="text-sm text-gray-600">A tiempo (+10 pts)</p>
              </div>
              
              <div className="bg-yellow-100 border-2 border-yellow-500 p-4 rounded-lg text-center">
                <p className="text-4xl mb-2">⏰</p>
                <p className="text-3xl font-bold text-yellow-700">{lateWords.length}</p>
                <p className="text-sm text-gray-600">Tardías (-2 pts)</p>
              </div>
              
              <div className="bg-red-100 border-2 border-red-500 p-4 rounded-lg text-center">
                <p className="text-4xl mb-2">❌</p>
                <p className="text-3xl font-bold text-red-700">{missed}</p>
                <p className="text-sm text-gray-600">Omitidas (0 pts)</p>
              </div>
            </div>
            
            <div className="bg-[#FFF6ED] p-4 rounded-lg mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Resumen</h3>
              <p className="text-gray-700">
                <strong>Precisión:</strong> {precisionRounded}% (a tiempo / total palabras)
              </p>
              <p className="text-gray-700">
                <strong>Total palabras:</strong> {totalWords}
              </p>
              <p className="text-gray-700">
                <strong>Frase:</strong> "{selectedPhrase}"
              </p>
            </div>
            
            {saveMessage && (
              <div className="px-4 py-3 bg-[#FFF6ED] text-[#6B3F1D] rounded-lg font-semibold mb-4 text-center border-2 border-[#F7C873]">
                {saveMessage}
              </div>
            )}
            
            <div className="flex gap-4 mb-4">
              <button
                onClick={saveScore}
                className="flex-1 px-6 py-3 bg-[#8B5F3D] text-white rounded-lg hover:bg-[#6B3F1D] transition-colors font-bold"
              >
                💾 Guardar Puntuación
              </button>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setGameEnded(false);
                  setGameStarted(false);
                  setSelectedPhrase('');
                  setWords([]);
                }}
                className="flex-1 px-6 py-3 bg-[#F7C873] text-[#6B3F1D] rounded-lg hover:bg-[#e6b35a] transition-colors font-bold"
              >
                🎤 Jugar otra vez
              </button>
              
              <Link 
                href="/progreso"
                className="flex-1 px-6 py-3 bg-[#6B3F1D] text-white rounded-lg hover:bg-[#56321a] transition-colors font-bold text-center"
              >
                📊 Ver progreso
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8 mt-16 md:mt-20">
      <div className="max-w-5xl mx-auto">
        {/* Alerta de retraso */}
        {showWarning && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-8 py-4 rounded-lg shadow-2xl z-50 animate-bounce">
            <p className="text-xl font-bold">⚠️ ¡Tarde! -2 puntos</p>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white px-6 py-3 rounded-lg shadow-md">
            <span className="text-sm text-gray-600">Puntos</span>
            <p className="text-3xl font-bold text-[#6B3F1D]">{score}</p>
          </div>
          <div className="flex items-center gap-4">
            <div 
              className={`px-4 py-2 rounded-lg ${ isSpeaking ? 'bg-[#8B5F3D] text-white' : 'bg-[#6B3F1D] text-white'}`}
              title={isSpeaking ? 'El micrófono detecta que estás hablando' : 'El micrófono detecta silencio'}
            >
              {isSpeaking ? '🎤 Hablando ✓' : '🔇 Silencio'}
            </div>
            {saveMessage && (
              <div className="px-4 py-2 bg-[#FFF6ED] text-[#6B3F1D] rounded-lg font-semibold animate-pulse border-2 border-[#F7C873]">
                {saveMessage}
              </div>
            )}
            <button
              onClick={saveScore}
              className="px-6 py-2 bg-[#8B5F3D] text-white rounded-lg hover:bg-[#6B3F1D] transition-colors font-semibold"
            >
              💾 Guardar
            </button>
            <button
              onClick={endGame}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Terminar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-12">
          <div className="flex flex-wrap justify-center gap-4 text-3xl font-bold leading-relaxed">
            {words.map((word, index) => (
              <span
                key={index}
                ref={index === currentWordIndex ? currentWordRef : null}
                className={`transition-all duration-300 px-4 py-2 rounded-lg ${
                  index === currentWordIndex
                    ? 'bg-gradient-to-r from-[#F7C873] to-[#e6b35a] text-[#6B3F1D] scale-125 shadow-lg'
                    : index < currentWordIndex
                    ? 'text-gray-400'
                    : 'text-gray-700'
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600">
          Palabra {currentWordIndex + 1} de {words.length}
        </div>
      </div>
    </div>
  );
}
