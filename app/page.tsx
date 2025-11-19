import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF6ED] via-[#FFE8CC] to-[#FFD9A0] justify-between">
      {/* Hero Section Renovado */}
      <section className="w-full pt-20 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido Principal */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#FFE8CC] to-[#F7C873] text-[#6B3F1D] px-5 py-2 rounded-full text-sm font-semibold shadow-md">
                <span className="animate-pulse text-lg">✨</span>
                <span>Herramienta complementaria de apoyo</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                Una vida
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F7C873] via-[#E8A040] to-[#D2691E] animate-gradient">
                  más llevadera
                </span>
              </h1>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border-l-4 border-[#F7C873] text-justify">
                  La <strong className="text-[#6B3F1D]">ausencia de una plataforma accesible en español</strong> que combine técnicas de apoyo para personas hispanohablantes con disfemia, limita las oportunidades de mejora en la fluidez verbal.
                </p>
                <p className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border-l-4 border-[#D2691E] text-justify">
                  <strong className="text-[#8B4513]">Pero no te preocupes</strong>, llegamos para apoyarte con herramientas respaldadas por evidencia científica.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/signup"
                  className="group px-8 py-4 bg-gradient-to-r from-[#F7C873] via-[#E8A040] to-[#D2691E] text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-center relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Crear cuenta
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D2691E] via-[#E8A040] to-[#F7C873] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 bg-white text-[#6B3F1D] rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-[#F7C873] hover:border-[#D2691E] text-center"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
            
            {/* Grid de Imágenes */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#F7C873] via-[#E8A040] to-[#D2691E] rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative grid grid-cols-1 gap-4">
                {/* Imagen disfemia 13 */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#F7C873] to-[#D2691E] rounded-3xl blur opacity-25"></div>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500">
                    <Image 
                      src="/imagenes/disfemia 13.jpg" 
                      alt="Terapia de fluidez verbal - Persona practicando" 
                      width={700}
                      height={400}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </div>
                </div>
                {/* Imagen disfemia */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#D2691E] to-[#F7C873] rounded-3xl blur opacity-25"></div>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500">
                    <Image 
                      src="/imagenes/disfemia.jpg" 
                      alt="Ilustración sobre disfemia" 
                      width={700}
                      height={400}
                      className="w-full h-auto object-contain bg-white p-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas Mejoradas */}
      <section className="py-16 bg-white/80 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-110 transition-transform">
              <div className="inline-block p-6 bg-gradient-to-br from-[#F7C873] to-[#E8A040] rounded-3xl shadow-xl mb-4">
                <div className="text-5xl font-black text-white">70M+</div>
              </div>
              <p className="text-gray-700 font-semibold text-lg">Personas con disfemia en el mundo</p>
            </div>
            <div className="text-center group hover:scale-110 transition-transform">
              <div className="inline-block p-6 bg-gradient-to-br from-[#D2691E] to-[#8B4513] rounded-3xl shadow-xl mb-4">
                <div className="text-5xl font-black text-white">1%</div>
              </div>
              <p className="text-gray-700 font-semibold text-lg">De la población mundial afectada</p>
            </div>
            <div className="text-center group hover:scale-110 transition-transform">
              <div className="inline-block p-6 bg-gradient-to-br from-[#E8A040] to-[#D2691E] rounded-3xl shadow-xl mb-4">
                <div className="text-5xl font-black text-white">80%</div>
              </div>
              <p className="text-gray-700 font-semibold text-lg">Mejora con técnicas adecuadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Modernizada */}
      <section className="py-20 bg-gradient-to-br from-[#FFF6ED] to-[#FFE8CC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              Herramientas Profesionales a Tu Alcance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-justify">
              Utilizamos las mismas técnicas que los fonoaudiólogos profesionales, ahora disponibles en español y de forma gratuita.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tarjeta 1 - DAF */}
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#F7C873] hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#F7C873] to-[#E8A040] p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                  <span className="text-5xl">🎵</span>
                </div>
                <h3 className="text-2xl font-bold text-white">DAF</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed text-justify">
                  Retroalimentación Auditiva - Técnica que reproduce tu voz con retardo configurable para mejorar la fluidez.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs bg-green-100 text-green-800 px-3 py-2 rounded-full font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Evidencia clinica
                </div>
              </div>
            </div>

            {/* Tarjeta 2 - Visualización */}
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#E8A040] hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#E8A040] to-[#D2691E] p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                  <span className="text-5xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Espectrograma</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed text-justify">
                  Visualización del Habla - Espectrogramas, F0, métricas de ritmo (PVI, VarcoV, %V) en tiempo real.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs bg-blue-100 text-blue-800 px-3 py-2 rounded-full font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Análisis científico
                </div>
              </div>
            </div>

            {/* Tarjeta 3 - Progreso */}
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#D2691E] hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#D2691E] to-[#8B4513] p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                  <span className="text-5xl">📈</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Progreso</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed text-justify">
                  Seguimiento - Registra y revisa tu evolución con nuestro sistema de historial integrado.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs bg-amber-100 text-amber-800 px-3 py-2 rounded-full font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Gráficos detallados
                </div>
              </div>
            </div>

            {/* Tarjeta 4 - Transcripción */}
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FFB347] hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#FFB347] to-[#FF8C00] p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                  <span className="text-5xl">🎙️</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Transcripción</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed text-justify">
                  Transcripción - Convierte tu habla en texto para analizar patrones y palabras frecuentes.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs bg-yellow-100 text-yellow-800 px-3 py-2 rounded-full font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                  Transcripción en tiempo real
                </div>
              </div>
            </div>

            {/* Tarjeta 5 - Ejercicios */}
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#9ACD32] hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#9ACD32] to-[#7CB342] p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                  <span className="text-5xl">💪</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Ejercicios</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed text-justify">
                  Ejercicios Terapéuticos - Métodos validados: Lidcombe, Van Riper, habla continua, y más.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs bg-green-100 text-green-800 px-3 py-2 rounded-full font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Evidencia
                </div>
              </div>
            </div>

            {/* Tarjeta 6 - Nube */}
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF8C69] hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#FF8C69] to-[#E85D75] p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                  <span className="text-5xl">☁️</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Nube de Palabras</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed text-justify">
                  Análisis Lingüístico - Visualiza las palabras que más utilizas y los patrones de tu vocabulario.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs bg-pink-100 text-pink-800 px-3 py-2 rounded-full font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                  </svg>
                  Análisis lingüístico
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema y Solución con diseño moderno */}
      <section className="py-20 bg-gradient-to-br from-[#FFF8E1] via-[#FFE8CC] to-[#FFECB3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* El Problema */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-2xl">❌</div>
                <h2 className="text-4xl font-black text-gray-900">El Problema</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:scale-105 transition-transform">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🌐</div>
                    <div>
                      <strong className="text-gray-900 text-lg block mb-2">Falta de recursos en español</strong>
                      <p className="text-gray-600 text-justify">Las herramientas profesionales están principalmente en inglés</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:scale-105 transition-transform">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">💰</div>
                    <div>
                      <strong className="text-gray-900 text-lg block mb-2">Costos elevados</strong>
                      <p className="text-gray-600 text-justify">Terapias y dispositivos DAF pueden costar cientos de dólares</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:scale-105 transition-transform">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📉</div>
                    <div>
                      <strong className="text-gray-900 text-lg block mb-2">Falta de seguimiento</strong>
                      <p className="text-gray-600 text-justify">Difícil monitorear el progreso sin herramientas adecuadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Nuestra Solución */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-2xl">✅</div>
                <h2 className="text-4xl font-black text-gray-900">Nuestra Solución</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:scale-105 transition-transform">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🇪🇸</div>
                    <div>
                      <strong className="text-gray-900 text-lg block mb-2">100% en español</strong>
                      <p className="text-gray-600 text-justify">Interfaz, ejercicios y contenido completamente en tu idioma</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:scale-105 transition-transform">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🎁</div>
                    <div>
                      <strong className="text-gray-900 text-lg block mb-2">Gratuito y accesible</strong>
                      <p className="text-gray-600 text-justify">Todas las funciones sin costo, accesible desde cualquier navegador</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:scale-105 transition-transform">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📊</div>
                    <div>
                      <strong className="text-gray-900 text-lg block mb-2">Seguimiento automático</strong>
                      <p className="text-gray-600 text-justify">Gráficos de progreso, métricas y análisis detallados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para quién es */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              ¿Para Quién es Fluidez Activa?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diseñado para toda la comunidad hispanohablante
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-[#FFF8E1] to-[#FFECB3] rounded-3xl p-8 shadow-lg border-2 border-[#FFD54F] hover:border-[#FFC107] hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FFC107] to-[#FFB300] rounded-full flex items-center justify-center mx-auto mb-6 text-5xl group-hover:scale-110 transition-transform">
                👨‍👩‍👧‍👦
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Personas con Disfemia</h3>
              <p className="text-gray-700 text-justify leading-relaxed">
                Niños, adolescentes y adultos que buscan mejorar su fluidez verbal de forma autónoma y complementaria a la terapia.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] rounded-3xl p-8 shadow-lg border-2 border-[#FFB74D] hover:border-[#FF9800] hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-full flex items-center justify-center mx-auto mb-6 text-5xl group-hover:scale-110 transition-transform">
                👨‍⚕️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Profesionales</h3>
              <p className="text-gray-700 text-justify leading-relaxed">
                Fonoaudiólogos y logopedas que pueden usar la plataforma como herramienta complementaria en sus terapias.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-[#EFEBE9] to-[#D7CCC8] rounded-3xl p-8 shadow-lg border-2 border-[#A1887F] hover:border-[#8D6E63] hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-[#8D6E63] to-[#6D4C41] rounded-full flex items-center justify-center mx-auto mb-6 text-5xl group-hover:scale-110 transition-transform">
                👪
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Familiares</h3>
              <p className="text-gray-700 text-justify leading-relaxed">
                Padres y familiares que quieren apoyar a sus seres queridos en el proceso de mejora.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Moderno */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#F7C873]">
            <div className="bg-gradient-to-r from-[#F7C873] to-[#E8A040] p-6">
              <div className="flex items-center justify-center gap-3 text-white">
                <div className="text-4xl">ℹ️</div>
                <h3 className="text-2xl md:text-3xl font-bold">Nota Importante</h3>
              </div>
            </div>
            
            <div className="p-8 md:p-12 space-y-6">
              <p className="text-lg text-gray-800 leading-relaxed">
                <strong className="text-[#8B4513]">Fluidez Activa NO busca reemplazar la atención profesional</strong> de un fonoaudiólogo, logopeda o cualquier otro profesional de la salud. Esta plataforma ha sido diseñada como una <strong className="text-[#D2691E]">herramienta complementaria de apoyo</strong> para democratizar el acceso a técnicas terapéuticas respaldadas por evidencia científica.
              </p>
              
              <p className="text-lg text-gray-800 leading-relaxed">
                Nuestro objetivo es empoderar a las personas hispanohablantes que viven con disfemia, proporcionándoles recursos tecnológicos accesibles que les permitan practicar y trabajar en su fluidez verbal de manera autónoma. Sin embargo, <strong className="text-[#6B3F1D]">siempre recomendamos la evaluación y acompañamiento de un profesional calificado</strong> para un diagnóstico preciso y un plan terapéutico personalizado.
              </p>
              
              <p className="text-lg text-gray-800 leading-relaxed">
                Creemos firmemente que el acceso a herramientas de calidad no debe estar limitado por barreras económicas o lingüísticas. Por eso, Fluidez Activa ofrece de forma gratuita y en español tecnologías como el DAF, análisis de espectrogramas, transcripción automática y ejercicios terapéuticos, para que más personas puedan <strong className="text-[#E8A040]">mejorar su calidad de vida y sentirse seguras de sí mismas</strong> en su comunicación diaria.
              </p>
              
              <div className="bg-gradient-to-r from-[#FFF8E1] to-[#FFECB3] border-l-4 border-[#F7C873] p-6 rounded-xl mt-8">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">💡</div>
                  <p className="text-[#6B3F1D] font-semibold text-lg">
                    <strong>Recuerda:</strong> Esta plataforma es un complemento, no un sustituto. Si experimentas dificultades significativas en tu habla, te animamos a buscar el apoyo de un profesional de la salud del habla y lenguaje.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Final */}
      <section className="py-24 bg-gradient-to-r from-[#F7C873] via-[#E8A040] to-[#D2691E] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <span className="text-5xl">🚀</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight">
            ¿Listo para mejorar<br />tu fluidez verbal?
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 text-[#FFF8E1] max-w-3xl mx-auto leading-relaxed">
            Únete a nuestra comunidad y comienza tu camino hacia una comunicación más fluida. <strong className="text-white">Sin costo, sin barreras, 100% en español.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="group px-10 py-5 bg-white text-[#6B3F1D] rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-110 text-lg transform hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                🚀 Crear Cuenta Gratuita
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link
              href="/about"
              className="px-10 py-5 bg-transparent text-white rounded-2xl font-bold border-2 border-white hover:bg-white hover:text-indigo-700 transition-all hover:scale-110 text-lg transform hover:-translate-y-1"
            >
              📖 Más Información
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Gratis para siempre</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Sin tarjeta requerida</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>100% en español</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
