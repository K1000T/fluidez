'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function EjerciciosFonemaPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Explicación introductoria
  const introText = `
    ¿Por qué estos ejercicios ayudan a reducir las prolongaciones?

    Las personas con disfemia (tartamudez) a menudo experimentan prolongaciones, bloqueos y repeticiones al hablar. Los ejercicios específicos de fonemas ayudan porque al practicar conscientemente cómo se produce cada sonido, aumentas tu control sobre los órganos del habla, desarrollando una mayor conciencia articulatoria que resulta fundamental para mejorar la fluidez.

    Muchos fonemas difíciles generan tensión muscular en las personas con disfemia. Practicarlos de forma aislada y gradual ayuda a relajar esa tensión, permitiendo que la articulación sea más natural y menos forzada. Además, la práctica repetida crea memoria muscular, haciendo que la producción del sonido sea más fluida y menos consciente, lo que se traduce en una automatización del movimiento que reduce significativamente los bloqueos.

    Conocer exactamente cómo producir un sonido reduce la ansiedad anticipatoria que a menudo desencadena bloqueos. Esta anticipación positiva, combinada con patrones de respiración adecuados integrados en estos ejercicios, mejora el flujo de aire necesario para una articulación suave y controlada. Practicar fonemas en diferentes contextos, como al inicio, medio o final de palabra, mejora las transiciones entre sonidos, facilitando un habla más continua.

    La práctica regular y sistemática de estos ejercicios puede reducir significativamente la frecuencia e intensidad de las prolongaciones, proporcionando herramientas concretas para enfrentar situaciones comunicativas con mayor confianza y fluidez.
  `;

  const fonemas = [
    {
      fonema: '/b/',
      letra: 'B, V',
      categoria: 'Bilabiales',
      titulo: 'Bilabial sonora',
      explicacion: 'El fonema /b/ se produce juntando ambos labios y dejando vibrar las cuerdas vocales. Es importante que no haya tensión excesiva en los labios.',
      imagen: '/fonemas/fonema b.png',
      palabras: ['bala', 'bebé', 'vaca', 'vivir', 'barco', 'vino'],
      oraciones: [
        'La bebé bebe vino en el barco.',
        'Bárbara vio una vaca bonita.'
      ],
      consejo: 'Practica frente al espejo. Toca tus labios suavemente para sentir la vibración.'
    },
    {
      fonema: '/k/',
      letra: 'C, QU, K',
      categoria: 'Velares',
      titulo: 'Velar sorda',
      explicacion: 'El fonema /k/ se produce al levantar la parte posterior de la lengua hacia el velo del paladar. El aire se acumula y se libera de golpe.',
      imagen: '/fonemas/fonema c-q.png',
      palabras: ['casa', 'queso', 'kilo', 'poco', 'que', 'cama'],
      oraciones: [
        'Carmen compró queso en casa.',
        'El kilo de café cuesta poco.'
      ],
      consejo: 'Empieza despacio. Siente cómo la parte posterior de tu lengua toca el paladar blando.'
    },
    {
      fonema: '/d/',
      letra: 'D',
      categoria: 'Dentales',
      titulo: 'Dental sonora',
      explicacion: 'El fonema /d/ se produce colocando la punta de la lengua detrás de los dientes superiores. Las cuerdas vocales vibran.',
      imagen: '/fonemas/fonema d.png',
      palabras: ['dedo', 'dado', 'nada', 'todo', 'día', 'dos'],
      oraciones: [
        'David da dos dados.',
        'El dedo duele todo el día.'
      ],
      consejo: 'La lengua debe tocar los dientes muy suavemente, sin presión.'
    },
    {
      fonema: '/f/',
      letra: 'F',
      categoria: 'Labiodentales',
      titulo: 'Labiodental sorda',
      explicacion: 'El fonema /f/ se produce al colocar el labio inferior contra los dientes superiores y dejar pasar el aire sin vibración de cuerdas vocales.',
      imagen: '/fonemas/fonema f.png',
      palabras: ['foca', 'feliz', 'sofá', 'café', 'foto', 'fácil'],
      oraciones: [
        'La foca feliz está en el sofá.',
        'La foto del café es fácil.'
      ],
      consejo: 'Mantén el contacto suave entre labio y dientes. Deja fluir el aire constantemente.'
    },
    {
      fonema: '/g/',
      letra: 'G, GU',
      categoria: 'Velares',
      titulo: 'Velar sonora',
      explicacion: 'El fonema /g/ se produce de manera similar a /k/, pero con vibración de las cuerdas vocales. La parte posterior de la lengua toca el velo del paladar.',
      imagen: '/fonemas/fonema g.png',
      palabras: ['gato', 'guerra', 'lago', 'amigo', 'gol', 'guiso'],
      oraciones: [
        'El gato gris vive en el lago.',
        'Mi amigo ganó un gol en la guerra.'
      ],
      consejo: 'Siente la vibración en tu garganta mientras produces el sonido.'
    },
    {
      fonema: '/x/',
      letra: 'J, G (ge, gi)',
      categoria: 'Velares',
      titulo: 'Velar fricativa sorda',
      explicacion: 'El fonema /x/ (jota) se produce creando fricción en la parte posterior de la boca. El aire pasa por un canal estrecho en el velo del paladar.',
      imagen: '/fonemas/fonema j.png',
      palabras: ['gente', 'jirafa', 'caja', 'gesto', 'jamón', 'girar'],
      oraciones: [
        'La jirafa gira en la caja.',
        'Jorge come jamón con gente.'
      ],
      consejo: 'No fuerces la garganta. El sonido debe salir con el aire, no con tensión.'
    },
    {
      fonema: '/l/',
      letra: 'L',
      categoria: 'Laterales',
      titulo: 'Lateral alveolar',
      explicacion: 'El fonema /l/ se produce colocando la punta de la lengua en los alvéolos (detrás de los dientes) y dejando que el aire salga por los lados.',
      imagen: '/fonemas/fonema L.png',
      palabras: ['lana', 'sala', 'malo', 'ala', 'luna', 'palo'],
      oraciones: [
        'Laura lava la lana en la sala.',
        'El ala del palo tiene luna llena.'
      ],
      consejo: 'La lengua debe mantenerse relajada. Siente cómo el aire sale por ambos lados.'
    },
    {
      fonema: '/ʎ/',
      letra: 'LL',
      categoria: 'Palatales',
      titulo: 'Lateral palatal',
      explicacion: 'El fonema /ʎ/ (elle) se produce colocando el dorso de la lengua contra el paladar duro, dejando salir el aire por los lados. Nota sobre yeísmo: En la mayoría de regiones hispanohablantes (España, América Latina), este sonido se pronuncia igual que /y/, fenómeno lingüístico llamado "yeísmo". Es completamente válido y natural pronunciar "calle" como "caye" o "pollo" como "poyo".',
      imagen: '/fonemas/fonema LL.png',
      palabras: ['llave', 'lluvia', 'calle', 'pollo', 'silla', 'ella'],
      oraciones: [
        'Ella tiene la llave de la calle.',
        'El pollo está bajo la lluvia en la silla.'
      ],
      consejo: 'Si te resulta difícil, puedes pronunciarlo como /y/ (yeísmo), que es común en español y se considera correcto.'
    },
    {
      fonema: '/m/',
      letra: 'M',
      categoria: 'Nasales',
      titulo: 'Nasal bilabial',
      explicacion: 'El fonema /m/ se produce cerrando los labios y dejando que el aire y la vibración salgan por la nariz.',
      imagen: '/fonemas/fonema m.png',
      palabras: ['mano', 'mamá', 'mesa', 'cama', 'amor', 'comer'],
      oraciones: [
        'Mi mamá come en la mesa.',
        'El amor de mi mano está en la cama.'
      ],
      consejo: 'Siente la vibración en tu nariz. Los labios deben estar relajados.'
    },
    {
      fonema: '/n/',
      letra: 'N',
      categoria: 'Nasales',
      titulo: 'Nasal alveolar',
      explicacion: 'El fonema /n/ se produce colocando la punta de la lengua en los alvéolos y dejando que el aire salga por la nariz.',
      imagen: '/fonemas/fonema n.png',
      palabras: ['nariz', 'nido', 'nieve', 'mano', 'pan', 'con'],
      oraciones: [
        'Nora tiene una nariz bonita.',
        'En el nido hay pan con nieve.'
      ],
      consejo: 'La lengua toca el mismo lugar que en /l/, pero el aire sale por la nariz.'
    },
    {
      fonema: '/ɲ/',
      letra: 'Ñ',
      categoria: 'Palatales',
      titulo: 'Nasal palatal',
      explicacion: 'El fonema /ɲ/ (eñe) se produce colocando el dorso de la lengua contra el paladar duro y dejando salir el aire por la nariz.',
      imagen: '/fonemas/fonema ñ.png',
      palabras: ['niño', 'año', 'señor', 'España', 'caña', 'uña'],
      oraciones: [
        'El niño de España tiene un año.',
        'El señor corta la caña con la uña.'
      ],
      consejo: 'Es como /n/ pero más atrás en la boca, con más superficie de lengua contra el paladar.'
    },
    {
      fonema: '/j/',
      letra: 'Y',
      categoria: 'Palatales',
      titulo: 'Aproximante palatal',
      explicacion: 'El fonema /j/ (ye) se produce elevando el dorso de la lengua hacia el paladar sin tocarlo completamente, dejando pasar el aire.',
      imagen: '/fonemas/fonema LL.png',
      palabras: ['yo', 'ayer', 'playa', 'mayo', 'yema', 'yogur'],
      oraciones: [
        'Yo fui ayer a la playa.',
        'La yema del yogur es de mayo.'
      ],
      consejo: 'La lengua se acerca al paladar pero no lo toca. Es un sonido suave y continuo.'
    },
    {
      fonema: '/θ/',
      letra: 'Z, C (antes de e, i)',
      categoria: 'Fricativas',
      titulo: 'Interdental fricativa sorda',
      explicacion: 'El fonema /θ/ (zeta) se produce colocando la punta de la lengua entre los dientes y dejando pasar el aire. En América Latina se pronuncia como /s/. Esto se conoce como seseo',
      imagen: '/fonemas/fonema s.png',
      palabras: ['zapato', 'cereza', 'cielo', 'luz', 'paz', 'vez'],
      oraciones: [
        'El zapato tiene una cereza.',
        'La luz del cielo trae paz otra vez.'
      ],
      consejo: 'Saca ligeramente la lengua entre los dientes. Si hablas español latinoamericano, pronúncialo como S.'
    },
    {
      fonema: '/x/',
      letra: 'J, G (antes de e, i)',
      categoria: 'Fricativas',
      titulo: 'Velar fricativa sorda',
      explicacion: 'El fonema /x/ (jota) se produce al acercar la parte posterior de la lengua al velo del paladar, creando fricción al pasar el aire.',
      imagen: '/fonemas/fonema j.png',
      palabras: ['jarra', 'jugo', 'gente', 'girasol', 'rojo', 'caja'],
      oraciones: [
        'La jarra de jugo está en la caja.',
        'La gente roja tiene un girasol.'
      ],
      consejo: 'Es el sonido más áspero del español. Siente la fricción en la parte trasera de la garganta.'
    },
    {
      fonema: '/p/',
      letra: 'P',
      categoria: 'Bilabiales',
      titulo: 'Bilabial sorda',
      explicacion: 'El fonema /p/ se produce juntando los labios, acumulando aire detrás y liberándolo de golpe sin vibración de cuerdas vocales.',
      imagen: '/fonemas/fonema p.png',
      palabras: ['papa', 'pato', 'peso', 'poco', 'palo', 'papel'],
      oraciones: [
        'Pedro pone papel en el palo.',
        'El pato come papa con poco peso.'
      ],
      consejo: 'No tenses los labios. El aire debe salir suavemente, como una pequeña explosión.'
    },
    {
      fonema: '/r/',
      letra: 'R (simple)',
      categoria: 'Vibrantes',
      titulo: 'Vibrante simple',
      explicacion: 'El fonema /r/ simple se produce con un solo toque rápido de la lengua contra los alvéolos. Es el sonido de "caro", "pero".',
      imagen: '/fonemas/fonema r.png',
      palabras: ['caro', 'pero', 'loro', 'cara', 'mira', 'para'],
      oraciones: [
        'Mira el loro en la cara.',
        'Pero el caro palo es para ti.'
      ],
      consejo: 'La lengua solo debe tocar los alvéolos UNA vez, muy rápido. Como un "tap" suave.'
    },
    {
      fonema: '/rr/',
      letra: 'R (inicial), RR',
      categoria: 'Vibrantes',
      titulo: 'Vibrante múltiple',
      explicacion: 'El fonema /rr/ fuerte se produce con múltiples vibraciones rápidas de la lengua contra los alvéolos. Es el sonido más desafiante del español.',
      imagen: '/fonemas/fonema rr.png',
      palabras: ['perro', 'carro', 'guitarra', 'correo', 'horrible', 'tierra'],
      oraciones: [
        'El perro corre por la tierra.',
        'El carro rojo está en el correo.'
      ],
      consejo: 'Relaja la lengua completamente. El aire debe hacerla vibrar, no la fuerzas tú. Practica "erre con erre cigarro".'
    },
    {
      fonema: '/s/',
      letra: 'S',
      categoria: 'Fricativas',
      titulo: 'Fricativa alveolar sorda',
      explicacion: 'El fonema /s/ se produce creando un canal estrecho entre la lengua y los alvéolos, dejando pasar el aire de forma continua.',
      imagen: '/fonemas/fonema s.png',
      palabras: ['casa', 'sol', 'sal', 'seis', 'sapo', 'salsa'],
      oraciones: [
        'El sapo sale de casa al sol.',
        'La sal de la salsa tiene seis gramos.'
      ],
      consejo: 'Mantén un flujo de aire constante. La lengua no debe tocar los dientes ni el paladar.'
    },
    {
      fonema: '/t/',
      letra: 'T',
      categoria: 'Dentales',
      titulo: 'Dental sorda',
      explicacion: 'El fonema /t/ se produce colocando la punta de la lengua detrás de los dientes superiores y liberando el aire de golpe.',
      imagen: '/fonemas/fonema t.png',
      palabras: ['taza', 'tela', 'toro', 'gato', 'mata', 'pato'],
      oraciones: [
        'El gato toma té en la taza.',
        'La tela del toro está en el pato.'
      ],
      consejo: 'Similar a /d/ pero sin vibración de cuerdas vocales. El contacto debe ser suave.'
    },
    {
      fonema: '/tʃ/',
      letra: 'CH',
      categoria: 'Africadas',
      titulo: 'Africada palatal sorda',
      explicacion: 'El fonema /tʃ/ (che) se produce con un bloqueo inicial seguido de una fricción. Es como combinar /t/ y /sh/.',
      imagen: '/fonemas/fonema ch.png',
      palabras: ['chico', 'noche', 'chocolate', 'leche', 'ocho', 'coche'],
      oraciones: [
        'El chico come chocolate de noche.',
        'Ocho coches tienen leche.'
      ],
      consejo: 'Empieza con la lengua tocando el paladar, luego suelta el aire creando fricción.'
    },
    {
      fonema: '/b/ (v)',
      letra: 'V',
      categoria: 'Bilabiales',
      titulo: 'Bilabial sonora (V)',
      explicacion: 'En español, la V se pronuncia igual que la B. Ambas producen el fonema /b/.',
      imagen: '/fonemas/fonema v.png',
      palabras: ['vaca', 'vivir', 'vela', 'vino', 'vaso', 'verde'],
      oraciones: [
        'La vaca vive en el valle verde.',
        'El vino está en el vaso de vidrio.'
      ],
      consejo: 'No intentes pronunciar V como en inglés. En español, V y B suenan igual.'
    }
  ];

  const categorias = ['Todos', 'Bilabiales', 'Dentales', 'Velares', 'Fricativas', 'Laterales', 'Nasales', 'Vibrantes', 'Palatales', 'Labiodentales', 'Africadas'];

  const fonemasFiltrados = selectedCategory === 'Todos' 
    ? fonemas 
    : fonemas.filter(f => f.categoria === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8 mt-16 md:mt-20">
      <div className="max-w-[1800px] mx-auto">
        {/* Título */}
        <h1 className="text-4xl font-bold text-[#6B3F1D] mb-6 text-center">
          Ejercicios con Fonemas
        </h1>

        {/* Introducción */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border-l-4 border-[#6B3F1D]">
          <h2 className="text-2xl font-bold text-[#6B3F1D] mb-4">
            ¿Por qué algunas imágenes de fonemas se repiten?
          </h2>
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line text-justify">
            {introText}
          </div>
        </div>

        {/* Filtros por categoría */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#6B3F1D] text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-amber-100 shadow'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de fonemas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fonemasFiltrados.map((fonema, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-[#F7C873]"
            >
              {/* Imagen */}
              <div className="relative h-80 bg-gradient-to-br from-[#6B3F1D] to-[#8B5F3D] flex items-center justify-center">
                <img
                  src={fonema.imagen}
                  alt={`Fonema ${fonema.fonema}`}
                  className="w-full h-full object-contain p-6"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/400x300/6B3F1D/ffffff?text=${encodeURIComponent(fonema.fonema)}`;
                  }}
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="text-2xl font-bold text-[#6B3F1D]">{fonema.fonema}</span>
                </div>
                <div className="absolute top-4 right-4 bg-[#F7C873] px-3 py-1 rounded-full shadow-md">
                  <span className="text-sm font-bold text-[#6B3F1D]">{fonema.letra}</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#d69a4f] px-3 py-1 rounded-full shadow-md">
                  <span className="text-xs font-semibold text-white">{fonema.categoria}</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{fonema.titulo}</h2>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed text-justify">{fonema.explicacion}</p>

                <div className="mb-4 p-3 bg-amber-50 rounded-lg border-2 border-[#F7C873]">
                  <p className="text-sm font-semibold text-[#6B3F1D] mb-1">💡 Consejo:</p>
                  <p className="text-sm text-gray-700 text-justify">{fonema.consejo}</p>
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mb-2">📝 Palabras para practicar:</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {fonema.palabras.map((palabra, i) => (
                    <span
                      key={i}
                      className="bg-[#F7C873] text-[#6B3F1D] px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                    >
                      {palabra}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mb-2">📖 Oraciones de ejemplo:</h3>
                <ul className="space-y-2">
                  {fonema.oraciones.map((oracion, i) => (
                    <li key={i} className="text-sm text-gray-700 italic bg-amber-50 p-2 rounded border-l-4 border-[#d69a4f]">
                      "{oracion}"
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Consejos generales finales */}
        <div className="mt-12 bg-gradient-to-r from-[#8B5F3D] to-[#6B3F1D] rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">Consejos para una práctica efectiva</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-white text-[#6B3F1D] rounded-full flex items-center justify-center font-bold">1</div>
              <p className="text-justify">Practica 10-15 minutos diarios. La consistencia es más importante que la duración.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-white text-[#6B3F1D] rounded-full flex items-center justify-center font-bold">2</div>
              <p className="text-justify">Usa un espejo para observar la posición de tu lengua y labios.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-white text-[#6B3F1D] rounded-full flex items-center justify-center font-bold">3</div>
              <p className="text-justify">Grábate y escucha tu progreso. Esto te ayudará a identificar áreas de mejora.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-white text-[#6B3F1D] rounded-full flex items-center justify-center font-bold">4</div>
              <p className="text-justify">Respira profundamente antes de cada ejercicio. La relajación es clave.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-white text-[#6B3F1D] rounded-full flex items-center justify-center font-bold">5</div>
              <p className="text-justify">Empieza con fonemas más fáciles y progresa gradualmente a los más difíciles.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-white text-[#6B3F1D] rounded-full flex items-center justify-center font-bold">6</div>
              <p className="text-justify">Si sientes tensión o frustración, haz una pausa. El estrés empeora la fluidez.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
