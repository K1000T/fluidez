import Image from 'next/image';

const ejercicios = [
  {
    titulo: 'Lectura rítmica',
    descripcion: 'Lee textos en voz alta marcando el ritmo con golpes suaves en la mesa. Ayuda a reducir la prolongación y mejora la fluidez.',
    imagen: '/imagenes/disfemia.jpg',
    categoria: 'Técnicas de ritmo'
  },
  {
    titulo: 'Habla con frases cortas',
    descripcion: 'Practica responder preguntas usando frases breves y pausadas. Favorece el control del ritmo y reduce bloqueos.',
    imagen: '/imagenes/disfemia2.jpg',
    categoria: 'Control del habla'
  },
  {
    titulo: 'Técnica de prolongación suave',
    descripcion: 'Pronuncia las primeras sílabas de palabras lentamente y con suavidad, luego continúa normalmente. Disminuye la tensión inicial.',
    imagen: '/imagenes/disfemia3.jpg',
    categoria: 'Técnicas de inicio'
  },
  {
    titulo: 'Respiración diafragmática',
    descripcion: 'Realiza ejercicios de respiración profunda antes de hablar. Ayuda a relajar el cuerpo y controlar la voz.',
    imagen: '/imagenes/disfemia4.jpg',
    categoria: 'Respiración'
  },
  {
    titulo: 'Habla coral',
    descripcion: 'Lee o habla en grupo, sincronizando el ritmo con los demás. Reduce la presión individual y mejora la fluidez.',
    imagen: '/imagenes/disfemia5.jpg',
    categoria: 'Práctica grupal'
  },
  {
    titulo: 'Técnica de canto',
    descripcion: 'Canta palabras o frases en vez de decirlas. El canto reduce la frecuencia de prolongaciones y bloqueos.',
    imagen: '/imagenes/disfemia6.jpg',
    categoria: 'Técnicas melódicas'
  },
  {
    titulo: 'Habla enlentecida',
    descripcion: 'Reduce conscientemente la velocidad del habla. Permite mayor control articulatorio y reduce las disfluencias. Recomendado por ASHA (American Speech-Language-Hearing Association).',
    imagen: '/imagenes/disfemia7.jpg',
    categoria: 'Control del habla'
  },
  {
    titulo: 'Contactos suaves',
    descripcion: 'Practica iniciar palabras con contactos labiales y linguales suaves, sin tensión. Técnica validada por fonoaudiólogos para reducir bloqueos.',
    imagen: '/imagenes/disfemia8.jpg',
    categoria: 'Técnicas de inicio'
  },
  {
    titulo: 'Habla continua',
    descripcion: 'Practica enlazar palabras sin pausas innecesarias, manteniendo un flujo constante de aire. Mejora la coordinación fono-respiratoria.',
    imagen: '/imagenes/disfemia10.png',
    categoria: 'Técnicas de ritmo'
  },
  {
    titulo: 'Auto-modelado',
    descripcion: 'Grábate hablando con fluidez y escucha la grabación repetidamente. Refuerza patrones de habla fluida mediante modelamiento.',
    imagen: '/imagenes/disfemia 11.png',
    categoria: 'Práctica con tecnología'
  },
  {
    titulo: 'Lectura coral',
    descripcion: 'Lee en voz alta simultáneamente con otra persona o audio. Reduce significativamente las disfluencias por efecto de enmascaramiento.',
    imagen: '/imagenes/disfemia 12.jpg',
    categoria: 'Práctica grupal'
  },
  {
    titulo: 'Pausas planificadas',
    descripcion: 'Introduce pausas intencionales entre frases para reorganizar el pensamiento y la respiración. Reduce la ansiedad anticipatoria.',
    imagen: '/imagenes/disfemia2.jpg',
    categoria: 'Control del habla'
  },
];

const trabalenguas = [
  {
    nivel: 'Fácil',
    ejercicios: [
      'Tres tristes tigres tragaban trigo en un trigal.',
      'Pablito clavó un clavito, ¿qué clavito clavó Pablito?',
      'El perro de San Roque no tiene rabo porque Ramón Ramírez se lo ha cortado.',
      'Erre con erre, guitarra; erre con erre, carril; rápido ruedan los carros, seguidos por el ferrocarril.',
    ]
  },
  {
    nivel: 'Intermedio',
    ejercicios: [
      'Cuando cuentes cuentos, cuenta cuántos cuentos cuentas, porque cuando cuentas cuentos nunca cuentas cuántos cuentos cuentas.',
      'El cielo está enladrillado, ¿quién lo desenladrillará? El desenladrillador que lo desenladrille, buen desenladrillador será.',
      'Si Sansón no sazona su salsa con sal, le sale sosa; le sale sosa su salsa a Sansón si la sazona sin sal.',
      'Perejil comí, perejil cené, y de tanto perejil me emperejilé.',
    ]
  },
  {
    nivel: 'Avanzado',
    ejercicios: [
      'Poquito a poquito, Paquito empaca poquitas copitas en pocos paquetes.',
      'En tres tristes trastos comían trigo tres tristes tigres.',
      'Compadre, cómpreme un coco. Compadre, no compro coco porque el que poco coco come, poco coco compra, y como yo poco coco como, poco coco compro.',
      'Mariana Magaña desenmarañará mañana la maraña que enmarañara Mariana Mañara.',
    ]
  }
];

const ejerciciosAvanzados = [
  {
    titulo: 'Técnica de Habla Continua (Continuous Phonation)',
    descripcion: 'Mantén el flujo de aire constante mientras hablas, conectando suavemente las palabras. Validada por Van Riper y aprobada por la Stuttering Foundation of America.',
    duracion: '10-15 min diarios',
    evidencia: 'Aprobada por SFA y ASHA'
  },
  {
    titulo: 'Método Lidcombe',
    descripcion: 'Practica conversaciones con retroalimentación positiva inmediata. Los padres/terapeutas elogian el habla fluida y corrigen gentilmente las disfluencias.',
    duracion: '15-20 min diarios',
    evidencia: 'Evidencia nivel I - Método más efectivo para niños'
  },
  {
    titulo: 'Habla en Bloque (Block Modification)',
    descripcion: 'Identifica el momento del bloqueo, pausa, libera la tensión y reintenta con inicio suave. Técnica de Van Riper validada clínicamente.',
    duracion: '5-10 repeticiones',
    evidencia: 'Aprobada por fonoaudiólogos certificados'
  },
  {
    titulo: 'Técnica de Resistencia (Pullout)',
    descripcion: 'Durante un bloqueo, reduce gradualmente la tensión y transiciona suavemente a la siguiente sílaba sin detener el habla.',
    duracion: 'Según necesidad',
    evidencia: 'Recomendada por National Stuttering Association'
  },
  {
    titulo: 'Habla con DAF (Delayed Auditory Feedback)',
    descripcion: 'Usa la funcionalidad DAF de esta aplicación. El feedback auditivo retardado reduce disfluencias en 70-80% de los casos.',
    duracion: '20-30 min diarios',
    evidencia: 'Múltiples estudios clínicos (Stuart et al., 2006)'
  },
  {
    titulo: 'Habla Rítmica Modificada',
    descripcion: 'Habla siguiendo un patrón rítmico (como metrónomo). Gradualmente acelera el ritmo manteniendo la fluidez.',
    duracion: '15 min diarios',
    evidencia: 'Método Speak More Fluently - Validado clínicamente'
  },
];

export default function EjerciciosPage() {
  return (
    <div className="min-h-screen bg-[#FFF6ED] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-[#6B3F1D] text-center mb-4 font-[Fredoka] mt-16">Ejercicios para la fluidez verbal</h1>
        <p className="text-lg text-[#6B3F1D] text-center max-w-3xl mx-auto mb-12">
          Estos ejercicios están basados en <strong>evidencia médica</strong> y aprobados por fonoaudiólogos y logopedas certificados. Practícalos regularmente para mejorar tu comunicación.
        </p>

        {/* Ejercicios básicos */}
        <h2 className="text-3xl font-bold text-[#6B3F1D] mb-6 font-[Fredoka]">📚 Ejercicios Básicos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ejercicios.map((ej, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg border-2 border-[#F7C873] p-6 flex flex-col items-center hover:scale-[1.03] transition-transform">
              <div className="text-xs bg-[#F7C873] text-[#6B3F1D] px-3 py-1 rounded-full mb-3">{ej.categoria}</div>
              <div className="w-32 h-32 mb-4 relative flex items-center justify-center">
                <Image src={ej.imagen} alt={ej.titulo} width={128} height={128} className="object-cover rounded-lg border-2 border-[#F7C873] bg-[#FFF6ED]" />
              </div>
              <h2 className="text-2xl font-bold text-[#6B3F1D] mb-2 text-center font-[Fredoka]">{ej.titulo}</h2>
              <p className="text-[#6B3F1D] text-center md:text-justify text-base font-medium">{ej.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Ejercicios avanzados con evidencia */}
        <h2 className="text-3xl font-bold text-[#6B3F1D] mb-6 font-[Fredoka]">🎓 Ejercicios Avanzados (Aprobados por Profesionales)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {ejerciciosAvanzados.map((ej, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg border-2 border-[#F7C873] p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-[#6B3F1D] mb-3 font-[Fredoka]">{ej.titulo}</h3>
              <p className="text-[#6B3F1D] mb-3 text-justify">{ej.descripcion}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs bg-orange-100 text-[#6B3F1D] px-3 py-1 rounded-full">⏱️ {ej.duracion}</span>
                <span className="text-xs bg-orange-100 text-[#6B3F1D] px-3 py-1 rounded-full">✅ {ej.evidencia}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trabalenguas */}
        <h2 className="text-3xl font-bold text-[#6B3F1D] mb-6 font-[Fredoka]">🗣️ Trabalenguas para Practicar</h2>
        <p className="text-base text-[#6B3F1D] mb-6 max-w-3xl text-justify">
          Los trabalenguas son excelentes para mejorar la articulación, la velocidad del habla y el control motor. Comienza lento y aumenta gradualmente la velocidad.
        </p>
        <div className="space-y-8">
          {trabalenguas.map((grupo, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg border-2 border-[#F7C873] p-6">
              <h3 className="text-2xl font-bold text-[#6B3F1D] mb-4 font-[Fredoka] flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  grupo.nivel === 'Fácil' ? 'bg-orange-100 text-[#6B3F1D]' :
                  grupo.nivel === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>{grupo.nivel}</span>
              </h3>
              <ul className="space-y-3">
                {grupo.ejercicios.map((trabalengua, tidx) => (
                  <li key={tidx} className="text-[#6B3F1D] bg-[#FFF6ED] p-3 rounded-lg border border-[#F7C873] text-justify">
                    <span className="font-semibold mr-2">{tidx + 1}.</span>
                    {trabalengua}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Referencias */}
        <div className="mt-12 bg-amber-50 rounded-xl p-6 border-2 border-[#F7C873]">
          <h3 className="text-xl font-bold text-[#6B3F1D] mb-3">Referencias</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• American Speech-Language-Hearing Association (ASHA) - Guidelines for Stuttering Treatment</li>
            <li>• Stuttering Foundation of America - Evidence-Based Practices</li>
            <li>• Van Riper, C. (1973) - The Treatment of Stuttering</li>
            <li>• Lidcombe Program - Randomized Controlled Trials</li>
            <li>• Stuart, A. et al. (2006) - Delayed Auditory Feedback Research</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
