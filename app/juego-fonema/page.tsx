'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const FONEMAS = ['B', 'C', 'D', 'F', 'G', 'J', 'L', 'M', 'N', 'Ñ', 'P', 'R', 'S', 'T', 'CH', 'LL', 'V', 'Z', 'K', 'Q', 'Y', 'W', 'X'];

export default function JuegoFonemaInicial() {
  const [currentFonema, setCurrentFonema] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [recognizedWord, setRecognizedWord] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const recognitionRef = useState<any>(null)[0];

  useEffect(() => {
    return () => {
      if (recognitionRef) {
        try { recognitionRef.stop(); } catch (e) {}
      }
    };
  }, []);

  const startGame = () => {
    setScore(0);
    setAttempts(0);
    setGameStarted(true);
    setSaveMessage('');
    nextFonema();
  };

  const nextFonema = () => {
    const randomFonema = FONEMAS[Math.floor(Math.random() * FONEMAS.length)];
    setCurrentFonema(randomFonema);
    setFeedback('');
    setRecognizedWord('');
    setIsListening(false);
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback('❌ Tu navegador no soporta reconocimiento de voz');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setFeedback('🎤 Escuchando...');
    };

    recognition.onresult = (event: any) => {
      const word = event.results[0][0].transcript.trim().toLowerCase();
      if (!word) {
        setFeedback('❌ No se detectó ninguna palabra');
        setIsListening(false);
        return;
      }
      setRecognizedWord(word);
      checkWord(word);
    };

    recognition.onerror = () => {
      setFeedback('❌ Error al escuchar. Intenta de nuevo.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (err) {
      setFeedback('❌ Error al iniciar reconocimiento');
    }
  };

  const checkWord = (word: string) => {
    const wordUpper = word.toUpperCase();
    const fonemaLower = currentFonema.toLowerCase();
    
    setAttempts(attempts + 1);
    
    // Verificar si la palabra contiene el fonema en cualquier posición
    let isCorrect = false;
    let position = ''; // 'inicio', 'medio', 'final'
    
    // Función auxiliar para determinar la posición
    const getPosition = (index: number, length: number): string => {
      if (index === 0) return 'inicio';
      if (index >= length - currentFonema.length) return 'final';
      return 'medio';
    };
    
    if (currentFonema === 'C' && (wordUpper.includes('C') || wordUpper.includes('QU') || wordUpper.includes('K'))) {
      isCorrect = true;
      const indexC = wordUpper.indexOf('C');
      const indexQU = wordUpper.indexOf('QU');
      const indexK = wordUpper.indexOf('K');
      const firstIndex = Math.min(
        indexC >= 0 ? indexC : Infinity,
        indexQU >= 0 ? indexQU : Infinity,
        indexK >= 0 ? indexK : Infinity
      );
      position = getPosition(firstIndex, wordUpper.length);
    }
    else if (currentFonema === 'B' && (wordUpper.includes('B') || wordUpper.includes('V'))) {
      isCorrect = true;
      const indexB = wordUpper.indexOf('B');
      const indexV = wordUpper.indexOf('V');
      const firstIndex = Math.min(indexB >= 0 ? indexB : Infinity, indexV >= 0 ? indexV : Infinity);
      position = getPosition(firstIndex, wordUpper.length);
    }
    else if (currentFonema === 'V' && (wordUpper.includes('B') || wordUpper.includes('V'))) {
      isCorrect = true;
      const indexB = wordUpper.indexOf('B');
      const indexV = wordUpper.indexOf('V');
      const firstIndex = Math.min(indexB >= 0 ? indexB : Infinity, indexV >= 0 ? indexV : Infinity);
      position = getPosition(firstIndex, wordUpper.length);
    }
    else if (currentFonema === 'J' && (wordUpper.includes('J') || wordUpper.includes('G'))) {
      isCorrect = true;
      const indexJ = wordUpper.indexOf('J');
      const indexG = wordUpper.indexOf('G');
      const firstIndex = Math.min(indexJ >= 0 ? indexJ : Infinity, indexG >= 0 ? indexG : Infinity);
      position = getPosition(firstIndex, wordUpper.length);
    }
    else if (currentFonema === 'CH' && wordUpper.includes('CH')) {
      isCorrect = true;
      position = getPosition(wordUpper.indexOf('CH'), wordUpper.length);
    }
    else if (currentFonema === 'LL' && wordUpper.includes('LL')) {
      isCorrect = true;
      position = getPosition(wordUpper.indexOf('LL'), wordUpper.length);
    }
    else if (currentFonema === 'Q' && (wordUpper.includes('QU') || wordUpper.includes('Q'))) {
      isCorrect = true;
      const indexQU = wordUpper.indexOf('QU');
      const indexQ = wordUpper.indexOf('Q');
      const firstIndex = Math.min(indexQU >= 0 ? indexQU : Infinity, indexQ >= 0 ? indexQ : Infinity);
      position = getPosition(firstIndex, wordUpper.length);
    }
    else if (currentFonema === 'K' && (wordUpper.includes('K') || wordUpper.includes('C') || wordUpper.includes('QU'))) {
      isCorrect = true;
      const indexK = wordUpper.indexOf('K');
      const indexC = wordUpper.indexOf('C');
      const indexQU = wordUpper.indexOf('QU');
      const firstIndex = Math.min(
        indexK >= 0 ? indexK : Infinity,
        indexC >= 0 ? indexC : Infinity,
        indexQU >= 0 ? indexQU : Infinity
      );
      position = getPosition(firstIndex, wordUpper.length);
    }
    else if (currentFonema === 'Z' && (wordUpper.includes('Z') || wordUpper.includes('C'))) {
      isCorrect = true;
      const indexZ = wordUpper.indexOf('Z');
      const indexC = wordUpper.indexOf('C');
      const firstIndex = Math.min(indexZ >= 0 ? indexZ : Infinity, indexC >= 0 ? indexC : Infinity);
      position = getPosition(firstIndex, wordUpper.length);
    }
    else if (currentFonema === 'Ñ' && wordUpper.includes('Ñ')) {
      isCorrect = true;
      position = getPosition(wordUpper.indexOf('Ñ'), wordUpper.length);
    }
    else if (wordUpper.includes(currentFonema)) {
      isCorrect = true;
      position = getPosition(wordUpper.indexOf(currentFonema), wordUpper.length);
    }
    
    if (isCorrect) {
      setScore(score + 10);
      let positionText = '';
      if (position === 'inicio') {
        positionText = 'al inicio';
      } else if (position === 'medio') {
        positionText = 'en el medio';
      } else if (position === 'final') {
        positionText = 'al final';
      }
      setFeedback(`✅ ¡Correcto! El fonema /${fonemaLower}/ está ${positionText} de "${word}"`);
      setTimeout(() => nextFonema(), 2000);
    } else {
      setFeedback(`❌ "${word}" no contiene el fonema /${fonemaLower}/. Intenta otra palabra.`);
    }
  };

  const saveScore = async () => {
    setSaveMessage('Guardando...');
    try {
      // Verificar si hay usuario autenticado
      const meResponse = await fetch('/api/me', { credentials: 'include' });
      const isAuthenticated = meResponse.ok;

      if (isAuthenticated) {
        // Usuario registrado: intentar guardar en la nube
        const response = await fetch('/api/save-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            game: 'fonema-inicial',
            score,
            attempts,
            timestamp: new Date().toISOString()
          })
        });
        
        // Siempre guardar en localStorage también
        const stored = localStorage.getItem('game_scores');
        const scores = stored ? JSON.parse(stored) : [];
        scores.push({
          id: Date.now().toString(),
          game: 'fonema-inicial',
          score,
          attempts,
          timestamp: new Date().toISOString()
        });
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
        scores.push({
          id: Date.now().toString(),
          game: 'fonema-inicial',
          score,
          attempts,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('game_scores', JSON.stringify(scores));
        setSaveMessage('💾 Guardado localmente (Inicia sesión para guardar en la base de datos)');
      }
    } catch (err) {
      console.error('Error saving score:', err);
      // Fallback: guardar en localStorage
      const stored = localStorage.getItem('game_scores');
      const scores = stored ? JSON.parse(stored) : [];
      scores.push({
        id: Date.now().toString(),
        game: 'fonema-inicial',
        score,
        attempts,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('game_scores', JSON.stringify(scores));
      setSaveMessage('💾 Guardado localmente');
    }
    
    setTimeout(() => setSaveMessage(''), 4000);
  };

  const endGame = () => {
    saveScore();
    setTimeout(() => setGameStarted(false), 1500);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-8 mt-16 md:mt-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            🎯 Juego de Fonemas
          </h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-[#6B3F1D] mb-4">¿Cómo jugar?</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Se mostrará un fonema grande en pantalla (B, C, D, etc.)</li>
              <li>Presiona el botón del micrófono</li>
              <li>Di una palabra que empiece con ese fonema</li>
              <li>¡Gana 10 puntos por cada palabra correcta!</li>
            </ol>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>💡 Beneficio terapéutico:</strong> Las prolongaciones suelen aparecer al iniciar palabras. 
                Practicar fonemas iniciales reduce la tensión y mejora el ataque suave.
              </p>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full py-4 bg-gradient-to-r from-[#6B3F1D] to-[#8B5F3D] text-white text-xl font-bold rounded-xl hover:shadow-lg transition-all"
          >
            🎮 Iniciar Juego
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-8 mt-16 md:mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="bg-white px-6 py-3 rounded-lg shadow-md">
            <span className="text-sm text-gray-600">Puntos</span>
            <p className="text-3xl font-bold text-[#6B3F1D]">{score}</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={saveScore}
              className="px-6 py-2 bg-[#6B3F1D] text-white rounded-lg hover:bg-[#8B5F3D] transition-colors font-semibold shadow-md"
            >
              💾 Guardar Progreso
            </button>
            <button
              onClick={endGame}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-md"
            >
              🏁 Terminar
            </button>
          </div>
        </div>

        {saveMessage && (
          <div className={`mb-4 p-3 rounded-lg text-center font-semibold ${
            saveMessage.includes('✅') ? 'bg-green-100 text-green-800' : 
            saveMessage.includes('❌') ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {saveMessage}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 text-center">
          <h2 className="text-gray-600 mb-4">Di una palabra que empiece con:</h2>
          <div className="inline-block bg-gradient-to-br from-[#F7C873] to-[#e6b35a] rounded-full p-8 shadow-xl mb-8">
            <span className="text-9xl font-black text-[#6B3F1D]">/{currentFonema.toLowerCase()}/</span>
          </div>

          {recognizedWord && (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-lg text-gray-700">
                Escuché: <strong>"{recognizedWord}"</strong>
              </p>
            </div>
          )}

          {feedback && (
            <div className={`mb-6 p-4 rounded-lg text-lg font-semibold ${
              feedback.includes('✅') ? 'bg-green-100 text-green-800' : 
              feedback.includes('🎤') ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {feedback}
            </div>
          )}

          <button
            onClick={startListening}
            disabled={isListening}
            className={`px-12 py-6 rounded-xl text-2xl font-bold shadow-lg transition-all ${
              isListening 
                ? 'bg-red-500 text-white cursor-wait animate-pulse' 
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-2xl hover:scale-105'
            }`}
          >
            {isListening ? '🎤 Escuchando...' : '🎤 Presiona para hablar'}
          </button>

          <div className="mt-8 grid grid-cols-1 gap-4 max-w-md mx-auto">
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600">Precisión</div>
              <div className="text-2xl font-bold text-purple-700">
                {attempts > 0 ? Math.round((score / (attempts * 10)) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
