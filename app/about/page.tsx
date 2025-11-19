"use client";
import React from 'react';

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#6B3F1D] mb-4">
            Sobre Fluidez Activa
          </h1>
          <div className="w-24 h-1 bg-[#F7C873] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Una herramienta innovadora para mejorar la fluidez del habla mediante tecnología
          </p>
        </div>

        {/* Propósito Principal */}
        <section className="mb-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 border-4 border-[#F7C873]">
          <h2 className="text-3xl font-bold text-[#6B3F1D] mb-6">
            Nuestro Propósito
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4 text-justify">
            <strong>Fluidez Activa</strong> es una aplicación web diseñada para ayudar a personas con 
            dificultades en la fluidez del habla (como tartamudez o disfluencias) a practicar, analizar 
            y mejorar su comunicación oral de manera autónoma y efectiva.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            Combinamos tecnologías de análisis de audio, visualización de espectrogramas y técnicas 
            terapéuticas como el <strong>DAF (Delayed Auditory Feedback)</strong> para ofrecer una 
            experiencia completa de entrenamiento vocal.
          </p>
        </section>

        {/* Características Principales */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#6B3F1D] mb-8 text-center">
            ¿Qué Ofrecemos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎤</div>
                <div>
                  <h3 className="text-xl font-bold text-[#6B3F1D] mb-2">
                    Grabación y Análisis
                  </h3>
                  <p className="text-gray-700 text-justify">
                    Graba tu voz y visualiza en tiempo real la forma de onda, espectrograma y 
                    frecuencia fundamental (F0) para entender mejor tu patrón de habla.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📝</div>
                <div>
                  <h3 className="text-xl font-bold text-[#6B3F1D] mb-2">
                    Transcripción Automática
                  </h3>
                  <p className="text-gray-700 text-justify">
                    Obtén transcripciones de tu habla con conteo de palabras, análisis de frecuencia 
                    y métricas lingüísticas como PVI, VarcoV y %V.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🔊</div>
                <div>
                  <h3 className="text-xl font-bold text-[#6B3F1D] mb-2">
                    DAF (Delayed Auditory Feedback)
                  </h3>
                  <p className="text-gray-700 text-justify">
                    Practica con retroalimentación auditiva retardada, una técnica clínicamente 
                    probada para mejorar la fluidez en personas con tartamudez.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📊</div>
                <div>
                  <h3 className="text-xl font-bold text-[#6B3F1D] mb-2">
                    Seguimiento de Progreso
                  </h3>
                  <p className="text-gray-700 text-justify">
                    Registra tus sesiones de práctica y visualiza tu evolución a lo largo del tiempo 
                    con gráficos y estadísticas detalladas.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎨</div>
                <div>
                  <h3 className="text-xl font-bold text-[#6B3F1D] mb-2">
                    Visualizaciones Avanzadas
                  </h3>
                  <p className="text-gray-700 text-justify">
                    Espectrogramas, TextGrid (segmentación temporal), nubes de palabras y métricas 
                    de ritmo para un análisis profundo.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🏋️</div>
                <div>
                  <h3 className="text-xl font-bold text-[#6B3F1D] mb-2">
                    Ejercicios Guiados
                  </h3>
                  <p className="text-gray-700 text-justify">
                    Accede a ejercicios específicos diseñados para reducir bloqueos, prolongaciones 
                    y mejorar el control del habla.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Para Quién es */}
        <section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-[#6B3F1D] mb-6">
            ¿Para Quién es Fluidez Activa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-3">🗣️</div>
              <h3 className="font-bold text-lg text-[#6B3F1D] mb-2">
                Personas con Tartamudez
              </h3>
              <p className="text-gray-700 text-sm">
                Herramientas para practicar técnicas de fluidez de manera autónoma
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">👨‍⚕️</div>
              <h3 className="font-bold text-lg text-[#6B3F1D] mb-2">
                Logopedas y Terapeutas
              </h3>
              <p className="text-gray-700 text-sm">
                Complemento tecnológico para sesiones terapéuticas y seguimiento
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🎓</div>
              <h3 className="font-bold text-lg text-[#6B3F1D] mb-2">
                Estudiantes y Profesionales
              </h3>
              <p className="text-gray-700 text-sm">
                Mejora tu comunicación oral para presentaciones y hablar en público
              </p>
            </div>
          </div>
        </section>

        {/* Tecnologías */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#6B3F1D] mb-6 text-center">
            Tecnología que Utilizamos
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-gray-700"><strong>Web Audio API</strong> para análisis de audio en tiempo real</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-gray-700"><strong>SpeechRecognition API</strong> para transcripción automática</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-gray-700"><strong>WaveSurfer.js</strong> para visualización de formas de onda</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-gray-700"><strong>Next.js y React</strong> para una experiencia moderna</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-gray-700"><strong>PostgreSQL (Supabase)</strong> para almacenamiento seguro</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-gray-700"><strong>Métricas lingüísticas</strong> basadas en investigación científica</span>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Profesional */}
        <section className="mb-16">
          <div className="bg-[#FBF1E6] rounded-2xl shadow-sm p-8 md:p-12 border border-[#E9D1A8]">
            <div className="flex items-start gap-4">
              <div>
                <h2 className="text-3xl font-bold text-[#6B3F1D] mb-6 flex items-center gap-3">
                  Importante: Esta Plataforma NO Reemplaza la Atención Profesional
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4 text-justify">
                  <strong>Fluidez Activa</strong> es una herramienta tecnológica de apoyo diseñada para <strong>democratizar el acceso</strong> a técnicas terapéuticas validadas científicamente. Nuestro propósito es empoderar a las personas hispanohablantes que viven con disfemia, brindándoles recursos accesibles para practicar y mejorar su fluidez verbal de manera autónoma.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4 text-justify">
                  Sin embargo, <strong>esta plataforma NO sustituye la evaluación, diagnóstico ni tratamiento de un fonoaudiólogo, logopeda o profesional de la salud del habla y lenguaje</strong>. Siempre recomendamos consultar con un especialista calificado para obtener un plan terapéutico personalizado y supervisión profesional.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4 text-justify">
                  Nuestro objetivo es eliminar las barreras económicas y lingüísticas que limitan el acceso a herramientas de calidad. Por eso, ofrecemos gratuitamente y en español tecnologías como el DAF, análisis de espectrogramas, transcripción automática y ejercicios terapéuticos, para que las personas con disfemia puedan:
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed mb-4 ml-4">
                  <li><strong>Mejorar su calidad de vida</strong> mediante la práctica autónoma</li>
                  <li><strong>Sentirse más seguras de sí mismas</strong> en su comunicación diaria</li>
                  <li><strong>Complementar</strong> el trabajo realizado con profesionales de la salud</li>
                  <li><strong>Acceder a recursos educativos</strong> sin importar su ubicación o recursos económicos</li>
                </ul>
                <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6 shadow-md">
                  <p className="text-base text-yellow-900 font-semibold">
                    🤎 <strong>Nuestro Compromiso:</strong> Fluidez Activa es un complemento, nunca un sustituto. Si experimentas dificultades significativas en tu habla o deseas un plan terapéutico integral, te animamos a buscar el apoyo de un profesional especializado en trastornos de la fluidez.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-[#7A4B2B] text-[#2B160D] rounded-2xl shadow-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para Mejorar tu Fluidez?
          </h2>
          <p className="text-lg mb-8 text-amber-100">
            Comienza a practicar hoy mismo con nuestras herramientas gratuitas
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="/signup" 
              className="bg-[#F7C873] text-[#6B3F1D] px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-300 transition shadow-lg"
            >
              Crear Cuenta Gratis
            </a>
            <a 
              href="/visualizacion" 
              className="bg-white text-[#6B3F1D] px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Probar Ahora
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
