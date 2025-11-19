'use client';

import { useState, useEffect } from 'react';

interface Palabra {
  texto: string;
  fonemaInicial: string;
  imagen?: string;
  pista: string;
}

const PALABRAS: Palabra[] = [
  // Palabras con P
  { texto: 'PERRO', fonemaInicial: '/p/', pista: 'Empieza con el sonido de "pe"' },
  { texto: 'PATO', fonemaInicial: '/p/', pista: 'Empieza con el sonido de "pa"' },
  { texto: 'PINO', fonemaInicial: '/p/', pista: 'Empieza con el sonido de "pi"' },
  { texto: 'PUERTA', fonemaInicial: '/p/', pista: 'Empieza con el sonido de "pue"' },
  { texto: 'PAPEL', fonemaInicial: '/p/', pista: 'Empieza con el sonido de "pa"' },
  { texto: 'PELOTA', fonemaInicial: '/p/', pista: 'Empieza con el sonido de "pe"' },
  
  // Palabras con B/V
  { texto: 'BARCO', fonemaInicial: '/b/', pista: 'Empieza con el sonido de "ba"' },
  { texto: 'VACA', fonemaInicial: '/b/', pista: 'Empieza con el sonido de "va"' },
  { texto: 'BESO', fonemaInicial: '/b/', pista: 'Empieza con el sonido de "be"' },
  { texto: 'VELA', fonemaInicial: '/b/', pista: 'Empieza con el sonido de "ve"' },
  { texto: 'BOLA', fonemaInicial: '/b/', pista: 'Empieza con el sonido de "bo"' },
  { texto: 'VINO', fonemaInicial: '/b/', pista: 'Empieza con el sonido de "vi"' },
  { texto: 'BURRO', fonemaInicial: '/b/', pista: 'Empieza con el sonido de "bu"' },
  
  // Palabras con T
  { texto: 'TAZA', fonemaInicial: '/t/', pista: 'Empieza con el sonido de "ta"' },
  { texto: 'TORO', fonemaInicial: '/t/', pista: 'Empieza con el sonido de "to"' },
  { texto: 'TELA', fonemaInicial: '/t/', pista: 'Empieza con el sonido de "te"' },
  { texto: 'TIGRE', fonemaInicial: '/t/', pista: 'Empieza con el sonido de "ti"' },
  { texto: 'TUBO', fonemaInicial: '/t/', pista: 'Empieza con el sonido de "tu"' },
  
  // Palabras con D
  { texto: 'DADO', fonemaInicial: '/d/', pista: 'Empieza con el sonido de "da"' },
  { texto: 'DEDO', fonemaInicial: '/d/', pista: 'Empieza con el sonido de "de"' },
  { texto: 'DINOSAURIO', fonemaInicial: '/d/', pista: 'Empieza con el sonido de "di"' },
  { texto: 'DONA', fonemaInicial: '/d/', pista: 'Empieza con el sonido de "do"' },
  { texto: 'DUCHA', fonemaInicial: '/d/', pista: 'Empieza con el sonido de "du"' },
  
  // Palabras con C/K/Q
  { texto: 'CASA', fonemaInicial: '/k/', pista: 'Empieza con el sonido de "ca"' },
  { texto: 'QUESO', fonemaInicial: '/k/', pista: 'Empieza con el sonido de "que"' },
  { texto: 'KILO', fonemaInicial: '/k/', pista: 'Empieza con el sonido de "ki"' },
  { texto: 'COCO', fonemaInicial: '/k/', pista: 'Empieza con el sonido de "co"' },
  { texto: 'CUNA', fonemaInicial: '/k/', pista: 'Empieza con el sonido de "cu"' },
  { texto: 'COMETA', fonemaInicial: '/k/', pista: 'Empieza con el sonido de "co"' },
  
  // Palabras con G
  { texto: 'GATO', fonemaInicial: '/g/', pista: 'Empieza con el sonido de "ga"' },
  { texto: 'GOMA', fonemaInicial: '/g/', pista: 'Empieza con el sonido de "go"' },
  { texto: 'GUERRA', fonemaInicial: '/g/', pista: 'Empieza con el sonido de "gue"' },
  { texto: 'GUITARRA', fonemaInicial: '/g/', pista: 'Empieza con el sonido de "gui"' },
  { texto: 'GUSTO', fonemaInicial: '/g/', pista: 'Empieza con el sonido de "gus"' },
  
  // Palabras con F
  { texto: 'FLOR', fonemaInicial: '/f/', pista: 'Empieza con el sonido de "f"' },
  { texto: 'FOCA', fonemaInicial: '/f/', pista: 'Empieza con el sonido de "fo"' },
  { texto: 'FOTO', fonemaInicial: '/f/', pista: 'Empieza con el sonido de "fo"' },
  { texto: 'FUEGO', fonemaInicial: '/f/', pista: 'Empieza con el sonido de "fue"' },
  { texto: 'FRESA', fonemaInicial: '/f/', pista: 'Empieza con el sonido de "fre"' },
  
  // Palabras con S/Z
  { texto: 'SILLA', fonemaInicial: '/s/', pista: 'Empieza con el sonido de "si"' },
  { texto: 'ZAPATO', fonemaInicial: '/s/', pista: 'Empieza con el sonido de "sa"' },
  { texto: 'SOL', fonemaInicial: '/s/', pista: 'Empieza con el sonido de "so"' },
  { texto: 'SAPO', fonemaInicial: '/s/', pista: 'Empieza con el sonido de "sa"' },
  { texto: 'SUMA', fonemaInicial: '/s/', pista: 'Empieza con el sonido de "su"' },
  { texto: 'CEBRA', fonemaInicial: '/s/', pista: 'Empieza con el sonido de "se"' },
  { texto: 'CIRCO', fonemaInicial: '/s/', pista: 'Empieza con el sonido de "ci"' },
  
  // Palabras con J/X
  { texto: 'JARRA', fonemaInicial: '/x/', pista: 'Empieza con el sonido fuerte de "ja"' },
  { texto: 'JIRAFA', fonemaInicial: '/x/', pista: 'Empieza con el sonido fuerte de "ji"' },
  { texto: 'JUGO', fonemaInicial: '/x/', pista: 'Empieza con el sonido fuerte de "ju"' },
  { texto: 'GENTE', fonemaInicial: '/x/', pista: 'Empieza con el sonido suave de "ge"' },
  
  // Palabras con M
  { texto: 'MESA', fonemaInicial: '/m/', pista: 'Empieza con el sonido de "me"' },
  { texto: 'MANO', fonemaInicial: '/m/', pista: 'Empieza con el sonido de "ma"' },
  { texto: 'MONO', fonemaInicial: '/m/', pista: 'Empieza con el sonido de "mo"' },
  { texto: 'MIEL', fonemaInicial: '/m/', pista: 'Empieza con el sonido de "mi"' },
  { texto: 'MURO', fonemaInicial: '/m/', pista: 'Empieza con el sonido de "mu"' },
  { texto: 'MARIPOSA', fonemaInicial: '/m/', pista: 'Empieza con el sonido de "ma"' },
  
  // Palabras con N
  { texto: 'NIÑO', fonemaInicial: '/n/', pista: 'Empieza con el sonido de "ni"' },
  { texto: 'NUBE', fonemaInicial: '/n/', pista: 'Empieza con el sonido de "nu"' },
  { texto: 'NIDO', fonemaInicial: '/n/', pista: 'Empieza con el sonido de "ni"' },
  { texto: 'NARIZ', fonemaInicial: '/n/', pista: 'Empieza con el sonido de "na"' },
  { texto: 'NOCHE', fonemaInicial: '/n/', pista: 'Empieza con el sonido de "no"' },
  
  // Palabras con Ñ
  { texto: 'ÑANDÚ', fonemaInicial: '/ɲ/', pista: 'Empieza con el sonido de "ña"' },
  { texto: 'ÑAME', fonemaInicial: '/ɲ/', pista: 'Empieza con el sonido de "ña"' },
  { texto: 'ÑOÑO', fonemaInicial: '/ɲ/', pista: 'Empieza con el sonido de "ño"' },
  
  // Palabras con L
  { texto: 'LIBRO', fonemaInicial: '/l/', pista: 'Empieza con el sonido de "li"' },
  { texto: 'LUNA', fonemaInicial: '/l/', pista: 'Empieza con el sonido de "lu"' },
  { texto: 'LORO', fonemaInicial: '/l/', pista: 'Empieza con el sonido de "lo"' },
  { texto: 'LANA', fonemaInicial: '/l/', pista: 'Empieza con el sonido de "la"' },
  { texto: 'LEÓN', fonemaInicial: '/l/', pista: 'Empieza con el sonido de "le"' },
  { texto: 'LIMÓN', fonemaInicial: '/l/', pista: 'Empieza con el sonido de "li"' },
  
  // Palabras con LL
  { texto: 'LLAVE', fonemaInicial: '/ʎ/', pista: 'Empieza con el sonido de "lla"' },
  { texto: 'LLUVIA', fonemaInicial: '/ʎ/', pista: 'Empieza con el sonido de "llu"' },
  { texto: 'LLAMA', fonemaInicial: '/ʎ/', pista: 'Empieza con el sonido de "lla"' },
  
  // Palabras con R
  { texto: 'RATÓN', fonemaInicial: '/r/', pista: 'Empieza con el sonido de "ra"' },
  { texto: 'ROSA', fonemaInicial: '/r/', pista: 'Empieza con el sonido de "ro"' },
  { texto: 'RÍO', fonemaInicial: '/r/', pista: 'Empieza con el sonido de "rí"' },
  { texto: 'REMO', fonemaInicial: '/r/', pista: 'Empieza con el sonido de "re"' },
  { texto: 'RUBI', fonemaInicial: '/r/', pista: 'Empieza con el sonido de "ru"' },
  
  // Palabras con CH
  { texto: 'CHOCOLATE', fonemaInicial: '/tʃ/', pista: 'Empieza con el sonido de "cha"' },
  { texto: 'CHIVO', fonemaInicial: '/tʃ/', pista: 'Empieza con el sonido de "chi"' },
  { texto: 'CHOZA', fonemaInicial: '/tʃ/', pista: 'Empieza con el sonido de "cho"' },
  { texto: 'CHUPETE', fonemaInicial: '/tʃ/', pista: 'Empieza con el sonido de "chu"' },
  
  // Palabras con A
  { texto: 'ÁRBOL', fonemaInicial: '/a/', pista: 'Empieza con vocal "a"' },
  { texto: 'AVIÓN', fonemaInicial: '/a/', pista: 'Empieza con vocal "a"' },
  { texto: 'AGUA', fonemaInicial: '/a/', pista: 'Empieza con vocal "a"' },
  { texto: 'ABEJA', fonemaInicial: '/a/', pista: 'Empieza con vocal "a"' },
  
  // Palabras adicionales con variedad
  { texto: 'ELEFANTE', fonemaInicial: '/e/', pista: 'Empieza con vocal "e"' },
  { texto: 'OSO', fonemaInicial: '/o/', pista: 'Empieza con vocal "o"' },
  { texto: 'ISLA', fonemaInicial: '/i/', pista: 'Empieza con vocal "i"' },
  { texto: 'UVA', fonemaInicial: '/u/', pista: 'Empieza con vocal "u"' },
  { texto: 'HELADO', fonemaInicial: '/e/', pista: 'Empieza con vocal "e"' },
  { texto: 'IGUANA', fonemaInicial: '/i/', pista: 'Empieza con vocal "i"' },
  { texto: 'OREJA', fonemaInicial: '/o/', pista: 'Empieza con vocal "o"' },
  { texto: 'UÑA', fonemaInicial: '/u/', pista: 'Empieza con vocal "u"' },
];

const FONEMAS_OPCIONES = [
  { fonema: '/p/', letra: 'P', color: 'bg-pink-100 hover:bg-pink-200' },
  { fonema: '/b/', letra: 'B/V', color: 'bg-blue-100 hover:bg-blue-200' },
  { fonema: '/t/', letra: 'T', color: 'bg-purple-100 hover:bg-purple-200' },
  { fonema: '/d/', letra: 'D', color: 'bg-indigo-100 hover:bg-indigo-200' },
  { fonema: '/k/', letra: 'C/K/Q', color: 'bg-green-100 hover:bg-green-200' },
  { fonema: '/g/', letra: 'G', color: 'bg-yellow-100 hover:bg-yellow-200' },
  { fonema: '/f/', letra: 'F', color: 'bg-red-100 hover:bg-red-200' },
  { fonema: '/s/', letra: 'S/Z', color: 'bg-teal-100 hover:bg-teal-200' },
  { fonema: '/x/', letra: 'J/G', color: 'bg-orange-100 hover:bg-orange-200' },
  { fonema: '/m/', letra: 'M', color: 'bg-cyan-100 hover:bg-cyan-200' },
  { fonema: '/n/', letra: 'N', color: 'bg-lime-100 hover:bg-lime-200' },
  { fonema: '/ɲ/', letra: 'Ñ', color: 'bg-amber-100 hover:bg-amber-200' },
  { fonema: '/l/', letra: 'L', color: 'bg-emerald-100 hover:bg-emerald-200' },
  { fonema: '/ʎ/', letra: 'LL', color: 'bg-sky-100 hover:bg-sky-200' },
  { fonema: '/r/', letra: 'R', color: 'bg-rose-100 hover:bg-rose-200' },
  { fonema: '/tʃ/', letra: 'CH', color: 'bg-violet-100 hover:bg-violet-200' },
  { fonema: '/a/', letra: 'A', color: 'bg-fuchsia-100 hover:bg-fuchsia-200' },
  { fonema: '/e/', letra: 'E', color: 'bg-pink-200 hover:bg-pink-300' },
  { fonema: '/i/', letra: 'I', color: 'bg-blue-200 hover:bg-blue-300' },
  { fonema: '/o/', letra: 'O', color: 'bg-orange-200 hover:bg-orange-300' },
  { fonema: '/u/', letra: 'U', color: 'bg-purple-200 hover:bg-purple-300' },
];

export default function JuegoSilabas() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPalabra, setCurrentPalabra] = useState<Palabra | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [palabrasUsadas, setPalabrasUsadas] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showPista, setShowPista] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [racha, setRacha] = useState(0);
  const [mejorRacha, setMejorRacha] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setAttempts(0);
    setPalabrasUsadas(new Set());
    setGameOver(false);
    setRacha(0);
    nextPalabra();
  };

  const nextPalabra = () => {
    const disponibles = PALABRAS.filter(p => !palabrasUsadas.has(p.texto));
    
    if (disponibles.length === 0) {
      // Juego terminado
      setGameOver(true);
      saveScore();
      return;
    }

    const randomIndex = Math.floor(Math.random() * disponibles.length);
    const nuevaPalabra = disponibles[randomIndex];
    setCurrentPalabra(nuevaPalabra);
    setShowFeedback(null);
    setShowPista(false);
  };

  const handleFonemaClick = (fonemaSeleccionado: string) => {
    if (!currentPalabra || showFeedback) return;

    setAttempts(prev => prev + 1);

    if (fonemaSeleccionado === currentPalabra.fonemaInicial) {
      // Respuesta correcta
      setScore(prev => prev + 1);
      setRacha(prev => {
        const nuevaRacha = prev + 1;
        if (nuevaRacha > mejorRacha) setMejorRacha(nuevaRacha);
        return nuevaRacha;
      });
      setShowFeedback('correct');
      setPalabrasUsadas(prev => {
        const newSet = new Set(prev);
        newSet.add(currentPalabra.texto);
        return newSet;
      });

      // Reproducir sonido de éxito si está disponible
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('¡Correcto!');
        utterance.lang = 'es-ES';
        utterance.rate = 1.2;
        utterance.volume = 0.5;
        window.speechSynthesis.speak(utterance);
      }

      setTimeout(() => {
        nextPalabra();
      }, 1500);
    } else {
      // Respuesta incorrecta
      setRacha(0);
      setShowFeedback('incorrect');
      setTimeout(() => {
        setShowFeedback(null);
      }, 1000);
    }
  };

  const speakWord = () => {
    if (!currentPalabra || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentPalabra.texto);
    utterance.lang = 'es-ES';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const saveScore = async () => {
    setSaveMessage('Guardando...');
    try {
      const gameData = {
        game: 'silabas-sonidos',
        score: score,
        attempts: attempts,
        timestamp: new Date().toISOString()
      };

      // Siempre guardar en localStorage primero
      const stored = localStorage.getItem('game_scores');
      const scores = stored ? JSON.parse(stored) : [];
      scores.push({...gameData, id: Date.now().toString()});
      localStorage.setItem('game_scores', JSON.stringify(scores));

      // Verificar autenticación para intentar guardar en la base de datos
      const meResponse = await fetch('/api/me', { credentials: 'include' });
      const isAuthenticated = meResponse.ok;

      if (isAuthenticated) {
        // Intentar guardar en la base de datos
        const response = await fetch('/api/save-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(gameData)
        });

        if (response.ok) {
          setSaveMessage('✅ ¡Guardado exitosamente en la base de datos!');
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('Error guardando en base de datos:', errorData);
          setSaveMessage(`⚠️ Error: ${errorData.error || 'Desconocido'}. Guardado localmente.`);
        }
      } else {
        setSaveMessage('💾 Guardado localmente (Inicia sesión para guardar en la base de datos)');
      }

    } catch (err) {
      console.error('Error guardando puntuación:', err);
      setSaveMessage('💾 Guardado localmente');
    }
    
    setTimeout(() => setSaveMessage(''), 4000);
  };

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[#6B3F1D] mb-2">Sílabas y Sonidos</h1>
            <p className="text-lg text-gray-600 mb-6">
              Gana <strong>+1 punto</strong> por cada respuesta correcta
            </p>
            <p className="text-xl text-gray-700 mb-8">
              Identifica el fonema inicial de cada palabra
            </p>

            <div className="bg-gradient-to-r from-[#F7C873] to-[#e6b35a] rounded-2xl p-6 mb-8 text-left">
              <h2 className="text-2xl font-bold text-[#6B3F1D] mb-4">📖 ¿Cómo jugar?</h2>
              <ol className="space-y-3 text-gray-800">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-white text-[#6B3F1D] rounded-full flex items-center justify-center font-bold">1</span>
                  <span>Verás una palabra en la pantalla</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-white text-[#6B3F1D] rounded-full flex items-center justify-center font-bold">2</span>
                  <span>Escucha la palabra usando el botón de audio 🔊</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-white text-[#6B3F1D] rounded-full flex items-center justify-center font-bold">3</span>
                  <span>Identifica el sonido inicial y haz clic en el fonema correcto</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-white text-[#6B3F1D] rounded-full flex items-center justify-center font-bold">4</span>
                  <span>¡Acumula puntos y mantén tu racha!</span>
                </li>
              </ol>
            </div>

            <div className="bg-amber-50 rounded-xl p-5 mb-8 border-2 border-[#F7C873]">
              <h3 className="font-bold text-[#6B3F1D] mb-2">💡 Beneficios Terapéuticos</h3>
              <p className="text-sm text-gray-700 text-left">
                Este juego ayuda a desarrollar <strong>conciencia fonológica</strong>, 
                mejora la <strong>discriminación auditiva</strong> y fortalece la 
                <strong> articulación precisa</strong> de sonidos iniciales. 
                Ideal para personas que trabajan en mejorar su fluidez verbal.
              </p>
            </div>

            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-[#6B3F1D] to-[#8B5F3D] text-white text-2xl font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              🎮 Comenzar Juego
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[#6B3F1D] mb-4">🎉 ¡Juego Completado!</h1>
            
            <div className="grid grid-cols-2 gap-6 my-8">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-green-800">{score}</div>
                <div className="text-sm text-green-700 font-semibold mt-2">Respuestas Correctas</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-blue-800">{accuracy}%</div>
                <div className="text-sm text-blue-700 font-semibold mt-2">Precisión</div>
              </div>
              <div className="bg-gradient-to-br from-[#F7C873] to-[#e6b35a] rounded-2xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-[#6B3F1D]">{mejorRacha}</div>
                <div className="text-sm text-[#6B3F1D] font-semibold mt-2">Mejor Racha</div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-purple-800">{PALABRAS.length}</div>
                <div className="text-sm text-purple-700 font-semibold mt-2">Palabras Totales</div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-5 mb-6 border-2 border-[#F7C873]">
              <p className="text-lg text-gray-700">
                {accuracy >= 80 ? '🌟 ¡Excelente trabajo! Tu conciencia fonológica es sobresaliente.' :
                 accuracy >= 60 ? '👍 ¡Buen trabajo! Sigue practicando para mejorar.' :
                 '💪 Sigue intentando. La práctica hace al maestro.'}
              </p>
            </div>

            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-[#6B3F1D] to-[#8B5F3D] text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              🔄 Jugar de Nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6 pt-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Barra de estadísticas superior */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-3xl font-bold text-[#8B5F3D]">{score}</div>
            <div className="text-xs text-gray-600 mt-1">Correctas</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-3xl font-bold text-[#6B3F1D]">{attempts}</div>
            <div className="text-xs text-gray-600 mt-1">Intentos</div>
          </div>
        </div>

        {/* Palabra actual */}
        {currentPalabra && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-6">¿Cuál es el fonema inicial?</h2>
              
              <div className={`inline-block text-6xl font-black mb-6 px-12 py-8 rounded-3xl transition-all duration-300 ${
                showFeedback === 'correct' ? 'bg-green-200 text-green-800 scale-110' :
                showFeedback === 'incorrect' ? 'bg-red-200 text-red-800 shake' :
                'bg-gradient-to-r from-[#F7C873] to-[#e6b35a] text-[#6B3F1D]'
              }`}>
                {currentPalabra.texto}
              </div>

              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={speakWord}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg flex items-center gap-2"
                >
                  🔊 Escuchar palabra
                </button>
                <button
                  onClick={() => setShowPista(!showPista)}
                  className="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors shadow-lg flex items-center gap-2"
                >
                  💡 {showPista ? 'Ocultar' : 'Ver'} pista
                </button>
              </div>

              {showPista && (
                <div className="bg-amber-50 rounded-xl p-4 border-2 border-[#F7C873] inline-block">
                  <p className="text-lg text-gray-700">{currentPalabra.pista}</p>
                </div>
              )}
              
              {/* Mensaje de guardado */}
              {saveMessage && (
                <div className={`mt-4 p-3 rounded-lg text-center font-semibold ${
                  saveMessage.includes('✅') ? 'bg-green-100 text-green-800' : 
                  saveMessage.includes('⚠️') ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {saveMessage}
                </div>
              )}
              
              {/* Botón para guardar progreso */}
              <div className="mt-6">
                <button
                  onClick={saveScore}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg flex items-center gap-2 mx-auto"
                >
                  💾 Guardar progreso
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Guarda tu puntuación actual para verla en la página de progreso
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Opciones de fonemas */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-[#6B3F1D] mb-6 text-center">Selecciona el fonema:</h3>
          
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {FONEMAS_OPCIONES.map((opcion) => (
              <button
                key={opcion.fonema}
                onClick={() => handleFonemaClick(opcion.fonema)}
                disabled={showFeedback !== null}
                className={`${opcion.color} border-2 border-transparent hover:border-[#6B3F1D] rounded-xl p-4 transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl`}
              >
                <div className="text-2xl font-bold">{opcion.letra}</div>
                <div className="text-xs text-gray-600 mt-1">{opcion.fonema}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback visual */}
        {showFeedback && (
          <div className={`fixed inset-0 flex items-center justify-center pointer-events-none z-50`}>
            <div className={`text-9xl animate-bounce ${showFeedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
              {showFeedback === 'correct' ? '✓' : '✗'}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}
