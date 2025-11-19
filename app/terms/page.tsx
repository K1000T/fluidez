'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFF6ED] py-12 px-4 sm:px-6 lg:px-8 mt-16 md:mt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <Link href="/" className="text-[#6B3F1D] hover:underline flex items-center gap-2">
            ← Volver al inicio
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-[#6B3F1D] mb-6">
          Términos y Condiciones
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-600">
            <strong>Última actualización:</strong> 17 de noviembre de 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder y utilizar Fluidez Activa, usted acepta estar sujeto a estos Términos y Condiciones. 
              Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestra aplicación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              2. Descripción del Servicio
            </h2>
            <p>
              Fluidez Activa es una aplicación web diseñada para ayudar a personas con disfemia (tartamudez) 
              a mejorar su fluidez del habla mediante ejercicios interactivos, técnicas de retroalimentación 
              auditiva retardada (DAF), visualización de patrones de habla y juegos terapéuticos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              3. Protección de Datos Personales - Ley 1581 de 2012
            </h2>
            
            <div className="bg-[#F7C873] border-l-4 border-[#6B3F1D] p-6 my-6">
              <h3 className="text-xl font-bold text-[#6B3F1D] mb-3">
                Información sobre la Ley Estatutaria 1581 de 2012
              </h3>
              <p className="mb-4 text-[#6B3F1D]">
                En cumplimiento de la <strong>Ley 1581 de 2012</strong> "Por la cual se dictan disposiciones 
                generales para la protección de datos personales" y del Decreto Reglamentario 1377 de 2013, 
                Fluidez Activa se compromete a proteger la privacidad y garantizar el derecho al habeas data 
                de todos sus usuarios.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-[#6B3F1D] mt-6 mb-3">
              3.1 Autorización para el Tratamiento de Datos Personales
            </h3>
            <p>
              Al aceptar estos términos y condiciones, usted autoriza expresamente a Fluidez Activa para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Recolectar, almacenar, usar, circular, suprimir, compartir, actualizar y transmitir sus datos personales</li>
              <li>Utilizar la información proporcionada para mejorar nuestros servicios</li>
              <li>Enviar comunicaciones relacionadas con el servicio, actualizaciones y mejoras</li>
              <li>Analizar patrones de uso de forma anónima con fines de investigación y mejora del servicio</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#6B3F1D] mt-6 mb-3">
              3.2 Datos que Recopilamos
            </h3>
            <p>
              Conforme a la Ley 1581 de 2012, recopilamos los siguientes tipos de datos personales:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Datos de identificación:</strong> Nombre completo, correo electrónico, fecha de nacimiento</li>
              <li><strong>Datos de ubicación:</strong> País y ciudad de residencia</li>
              <li><strong>Datos demográficos:</strong> Género</li>
              <li><strong>Datos de uso:</strong> Grabaciones de audio, transcripciones, puntuaciones de ejercicios, progreso en juegos</li>
              <li><strong>Datos técnicos:</strong> Dirección IP, tipo de navegador, sistema operativo</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#6B3F1D] mt-6 mb-3">
              3.3 Finalidades del Tratamiento de Datos
            </h3>
            <p>
              Sus datos personales serán utilizados para las siguientes finalidades:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Proveer los servicios de la plataforma Fluidez Activa</li>
              <li>Personalizar la experiencia del usuario</li>
              <li>Generar estadísticas de uso y reportes de progreso</li>
              <li>Mejorar nuestros algoritmos y técnicas terapéuticas</li>
              <li>Realizar investigación académica anónima sobre fluidez del habla</li>
              <li>Comunicar actualizaciones, mantenimiento y nuevas funcionalidades</li>
              <li>Cumplir con obligaciones legales y reglamentarias</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#6B3F1D] mt-6 mb-3">
              3.4 Derechos del Titular de los Datos
            </h3>
            <p>
              De conformidad con la Ley 1581 de 2012, usted tiene los siguientes derechos:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Acceso:</strong> Conocer, actualizar y rectificar sus datos personales</li>
              <li><strong>Actualización:</strong> Solicitar la corrección de datos inexactos o desactualizados</li>
              <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos cuando no sean necesarios</li>
              <li><strong>Revocación:</strong> Revocar la autorización para el tratamiento de sus datos</li>
              <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos en ciertos casos</li>
              <li><strong>Consulta:</strong> Consultar de forma gratuita sus datos almacenados</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#6B3F1D] mt-6 mb-3">
              3.5 Ejercicio de Derechos
            </h3>
            <p>
              Para ejercer cualquiera de sus derechos como titular de datos personales, puede contactarnos a través de:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg my-4">
              <p><strong>Correo electrónico:</strong> privacidad@fluidezactiva.com</p>
              <p><strong>Plazo de respuesta:</strong> 15 días hábiles a partir de la recepción de su solicitud</p>
            </div>

            <h3 className="text-xl font-semibold text-[#6B3F1D] mt-6 mb-3">
              3.6 Seguridad de los Datos
            </h3>
            <p>
              Implementamos medidas técnicas, humanas y administrativas para proteger sus datos personales 
              contra pérdida, acceso no autorizado, modificación o divulgación. Sin embargo, ningún sistema 
              de transmisión por Internet es completamente seguro.
            </p>

            <h3 className="text-xl font-semibold text-[#6B3F1D] mt-6 mb-3">
              3.7 Transferencia Internacional de Datos
            </h3>
            <p>
              Sus datos pueden ser almacenados en servidores ubicados fuera de Colombia. En estos casos, 
              garantizamos que los países destinatarios cuentan con niveles adecuados de protección de datos 
              o que existen garantías contractuales apropiadas.
            </p>

            <h3 className="text-xl font-semibold text-[#6B3F1D] mt-6 mb-3">
              3.8 Conservación de Datos
            </h3>
            <p>
              Conservaremos sus datos personales únicamente durante el tiempo necesario para cumplir con las 
              finalidades descritas o según lo requiera la ley. Una vez cumplida la finalidad y/o obligaciones 
              legales, procederemos a la supresión segura de sus datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              4. Uso de Audio y Grabaciones
            </h2>
            <p>
              La aplicación requiere acceso al micrófono para las funciones de grabación y transcripción. 
              Las grabaciones de audio se almacenan de forma segura y son utilizadas únicamente para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Proporcionarle retroalimentación sobre su progreso</li>
              <li>Generar visualizaciones (espectrogramas, nubes de palabras)</li>
              <li>Mejorar los algoritmos de transcripción</li>
            </ul>
            <p className="mt-4">
              Usted puede eliminar sus grabaciones en cualquier momento desde su perfil de usuario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              5. Responsabilidad Médica
            </h2>
            <div className="bg-red-50 border-l-4 border-red-600 p-6 my-6">
              <p className="font-semibold text-red-900">
                Fluidez Activa es una herramienta de apoyo terapéutico y NO sustituye la atención 
                profesional de un terapeuta del habla o logopeda certificado.
              </p>
            </div>
            <p>
              La aplicación está diseñada como complemento a la terapia profesional. Siempre debe consultar 
              con un profesional de la salud calificado antes de realizar cambios significativos en su 
              tratamiento para la disfemia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              6. Propiedad Intelectual
            </h2>
            <p>
              Todo el contenido de Fluidez Activa, incluyendo pero no limitado a textos, gráficos, logotipos, 
              imágenes, videos, clips de audio y software, es propiedad de Fluidez Activa o de sus licenciantes 
              y está protegido por las leyes de propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              7. Conducta del Usuario
            </h2>
            <p>
              Al utilizar Fluidez Activa, usted se compromete a:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Proporcionar información veraz y actualizada</li>
              <li>Mantener la confidencialidad de su contraseña</li>
              <li>No utilizar la aplicación para fines ilegales o no autorizados</li>
              <li>No intentar acceder a áreas restringidas del sistema</li>
              <li>No transmitir virus, malware o código malicioso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              8. Limitación de Responsabilidad
            </h2>
            <p>
              Fluidez Activa se proporciona "tal cual" y "según disponibilidad". No garantizamos que:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>El servicio será ininterrumpido o libre de errores</li>
              <li>Los resultados obtenidos serán exactos o confiables</li>
              <li>Todos los errores serán corregidos</li>
            </ul>
            <p className="mt-4">
              No seremos responsables por daños indirectos, incidentales, especiales o consecuentes 
              derivados del uso o la imposibilidad de uso de la aplicación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              9. Modificaciones a los Términos
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. 
              Las modificaciones entrarán en vigor inmediatamente después de su publicación en la aplicación. 
              Su uso continuado de Fluidez Activa después de dichas modificaciones constituye su aceptación 
              de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              10. Terminación de Cuenta
            </h2>
            <p>
              Usted puede cancelar su cuenta en cualquier momento contactándonos. Nos reservamos el derecho 
              de suspender o terminar su acceso a Fluidez Activa si:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Viola estos Términos y Condiciones</li>
              <li>Proporciona información falsa o engañosa</li>
              <li>Realiza actividades que perjudiquen a otros usuarios o al servicio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              11. Ley Aplicable
            </h2>
            <p>
              Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de la 
              República de Colombia, especialmente la <strong>Ley 1581 de 2012</strong> sobre protección 
              de datos personales, sin dar efecto a ningún principio de conflictos de leyes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#6B3F1D] mt-8 mb-4">
              12. Contacto
            </h2>
            <p>
              Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos en:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg my-4">
              <p><strong>Email:</strong> soporte@fluidezactiva.com</p>
              <p><strong>Email (Protección de Datos):</strong> privacidad@fluidezactiva.com</p>
            </div>
          </section>

          <div className="bg-gradient-to-r from-[#F7C873] to-[#e6b35a] p-8 rounded-xl mt-8 border-4 border-[#6B3F1D] shadow-xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-[#6B3F1D]">
                Declaración de Aceptación
              </h3>
            </div>
            <p className="text-[#6B3F1D] text-lg mb-4 font-medium">
              Al marcar la casilla de "Acepto los términos y condiciones" durante el registro, 
              usted declara que:
            </p>
            <ul className="space-y-3 ml-4 mt-4">
              <li className="flex items-start gap-3 text-[#6B3F1D] font-medium">
                <span className="text-green-700 text-xl font-bold">•</span>
                <span>Ha leído y comprendido estos Términos y Condiciones</span>
              </li>
              <li className="flex items-start gap-3 text-[#6B3F1D] font-medium">
                <span className="text-green-700 text-xl font-bold">•</span>
                <span>Acepta cumplir con todas las disposiciones aquí establecidas</span>
              </li>
              <li className="flex items-start gap-3 text-[#6B3F1D] font-medium">
                <span className="text-green-700 text-xl font-bold">•</span>
                <span>Autoriza expresamente el tratamiento de sus datos personales conforme a la Ley 1581 de 2012</span>
              </li>
              <li className="flex items-start gap-3 text-[#6B3F1D] font-medium">
                <span className="text-green-700 text-xl font-bold">•</span>
                <span>Comprende que esta aplicación es un complemento y no un sustituto de atención profesional</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-300 text-center">
          <Link 
            href="/signup" 
            className="inline-block px-6 py-3 bg-[#6B3F1D] text-white rounded-lg hover:bg-[#8B5F3D] transition-colors font-semibold"
          >
            Volver al Registro
          </Link>
        </div>
      </div>
    </div>
  );
}
