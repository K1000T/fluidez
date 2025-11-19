import Link from 'next/link';

export default function Footer() {
  return (
  <footer className="bg-[#F7C873] text-[#6B3F1D] border-t-2 border-[#e6b35a]">
  <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo */}
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center mb-4">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center mr-2 border-2 border-[#F7C873]">
              <span className="text-[#F7C873] font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl text-[#6B3F1D]">Fluidez Activa</span>
          </Link>
          <p className="max-w-md">
            Plataforma gratuita para apoyar a personas con disfemia mediante herramientas tecnológicas accesibles y en español.
          </p>
        </div>

        {/* Enlaces */}
        <div>
          <h3 className="font-semibold mb-4 text-[#6B3F1D]">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-[#6B3F1D] hover:text-[#a86c3a]">Inicio</Link></li>
            <li><Link href="/about" className="text-[#6B3F1D] hover:text-[#a86c3a]">Acerca de</Link></li>
            <li><Link href="/tools" className="text-[#6B3F1D] hover:text-[#a86c3a]">Herramientas</Link></li>
            <li><Link href="/contact" className="text-[#6B3F1D] hover:text-[#a86c3a]">Contacto</Link></li>
          </ul>
        </div>

        {/* Cuenta */}
        <div>
          <h3 className="font-semibold mb-4 text-[#6B3F1D]">Cuenta</h3>
          <ul className="space-y-2">
            <li><Link href="/login" className="text-[#6B3F1D] hover:text-[#a86c3a]">Iniciar Sesión</Link></li>
            <li><Link href="/signup" className="text-[#6B3F1D] hover:text-[#a86c3a]">Registrarse</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-[#e6b35a] py-6 px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-[#6B3F1D]">© 2025 Fluidez Activa. Proyecto de grado - Pontificia Universidad Javeriana</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/terms" className="text-[#6B3F1D] hover:text-[#a86c3a] text-sm">Privacidad y Términos</Link>
        </div>
      </div>
    </footer>
  );
}
