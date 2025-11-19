'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import EditProfileModal from './EditProfileModal';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
    const userMenuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/me', {
          credentials: 'include',
          cache: 'no-store'
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [pathname]);

  // Cerrar menú usuario al hacer click fuera
  useEffect(() => {
    if (!showUserMenu) return;
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const getFirstName = (fullName) => {
    if (!fullName) return 'Usuario';
    return fullName.split(' ')[0];
  };

  return (
  <>
  <nav className="bg-[#F7C873] text-[#6B3F1D] shadow-md fixed w-full z-50 border-b-2 border-[#e6b35a]">
  <div className="w-full mx-auto px-6 lg:px-8">
  <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center min-w-max">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mr-2 shadow-md border-2 border-[#F7C873]">
              <span className="text-[#F7C873] font-bold text-lg">F</span>
            </div>
            <span className="font-extrabold text-2xl tracking-wide ml-2 text-[#6B3F1D]">FLUIDEZ ACTIVA</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center justify-center flex-1 font-medium gap-8 whitespace-nowrap">
          <Link href="/" className={`text-[#6B3F1D] hover:text-[#a86c3a] transition${pathname === '/' ? ' font-bold' : ''}`}>Inicio</Link>
          <Link href="/daf" className={`text-[#6B3F1D] hover:text-[#a86c3a] transition${pathname === '/daf' ? ' font-bold' : ''}`}>DAF</Link>
          <Link href="/progreso" className={`text-[#6B3F1D] hover:text-[#a86c3a] transition${pathname === '/progreso' ? ' font-bold' : ''}`}>Progreso</Link>
          <Link href="/ejercicios" className={`text-[#6B3F1D] hover:text-[#a86c3a] transition${pathname === '/ejercicios' ? ' font-bold' : ''}`}>Ejercicios</Link>
          <Link href="/ejercicios-fonema" className={`text-[#6B3F1D] hover:text-[#a86c3a] transition${pathname === '/ejercicios-fonema' ? ' font-bold' : ''}`}>Ejercicios con fonema</Link>
          <Link href="/juego-fonema" className={`text-[#6B3F1D] hover:text-[#a86c3a] transition${pathname === '/juego-fonema' ? ' font-bold' : ''}`}>Juego fonemas</Link>
          <Link href="/juego-silabas" className={`text-[#6B3F1D] hover:text-[#a86c3a] transition${pathname === '/juego-silabas' ? ' font-bold' : ''}`}>Sílabas y sonidos</Link>
          <Link href="/karaoke" className={`text-[#6B3F1D] hover:text-[#a86c3a] transition${pathname === '/karaoke' ? ' font-bold' : ''}`}>Karaoke</Link>
          <Link href="/visualizacion" className={`text-[#6B3F1D] hover:text-[#a86c3a] transition${pathname === '/visualizacion' ? ' font-bold' : ''}`}>Espectrograma y Visualización del habla</Link>
          <Link href="/about" className={`text-[#6B3F1D] hover:text-[#a86c3a] transition${pathname === '/about' ? ' font-bold' : ''}`}>Sobre nosotros</Link>
            
            {user ? (
              <div className="ml-8 flex items-center gap-2 min-w-max relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border-2 border-[#6B3F1D] hover:bg-[#F7C873] transition shadow"
                >
                  <Image 
                    src={`/logos/${user.icon || 'Icono de usuario.png'}`}
                    alt="Usuario" 
                    width={24} 
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-semibold text-[#6B3F1D]">{getFirstName(user.name)}</span>
                </button>
                {showUserMenu && (
                  <div
                    ref={userMenuRef}
                    className="absolute left-1/2 top-full mt-2 bg-white rounded-lg shadow-xl border-2 border-[#F7C873] min-w-[270px] overflow-hidden flex flex-col transform -translate-x-1/2"
                    style={{zIndex: 9999}}
                  >
                    <div className="flex">
                      <button
                        onClick={() => { setShowEditProfile(true); setShowUserMenu(false); }}
                        className="flex-1 text-left px-4 py-2 text-[#6B3F1D] hover:bg-[#F7C873] font-semibold transition border-b-2 border-gray-200"
                      >
                        Editar perfil
                      </button>
                      <button
                        onClick={() => { handleLogout(); setShowUserMenu(false); }}
                        className="flex-1 text-left px-4 py-2 text-[#6B3F1D] hover:bg-[#F7C873] font-semibold transition border-b-2 border-gray-200 border-l-2 border-gray-200"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : loading ? (
              <div className="ml-8 mr-4 flex space-x-3 min-w-max">
                <div className="px-4 py-2 bg-gray-200 rounded-lg animate-pulse w-24 h-10"></div>
              </div>
            ) : (
              <div className="ml-8 mr-4 flex space-x-3 min-w-max">
                <Link href="/login" className="px-4 py-2 bg-white text-[#6B3F1D] rounded-lg font-semibold border-2 border-[#6B3F1D] hover:bg-[#F7C873] transition shadow">Iniciar sesión</Link>
                <Link href="/signup" className="px-4 py-2 bg-white text-[#6B3F1D] rounded-lg font-semibold border-2 border-[#6B3F1D] hover:bg-[#F7C873] transition shadow">Crear cuenta</Link>
              </div>
            )}
          </div>

          {/* Botón móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-[#e6b35a] focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
          <div className="md:hidden bg-[#F7C873] text-[#6B3F1D] border-t-2 border-[#e6b35a]">
          <div className="px-4 py-3 space-y-2 font-medium">
            <Link href="/" className={`block hover:text-[#a86c3a]${pathname === '/' ? ' font-bold' : ''}`}>Inicio</Link>
            <Link href="/daf" className={`block hover:text-[#a86c3a]${pathname === '/daf' ? ' font-bold' : ''}`}>DAF</Link>
            <Link href="/ejercicios" className={`block hover:text-[#a86c3a]${pathname === '/ejercicios' ? ' font-bold' : ''}`}>Ejercicios</Link>
            <Link href="/ejercicios-fonema" className={`block hover:text-[#a86c3a]${pathname === '/ejercicios-fonema' ? ' font-bold' : ''}`}>Ejercicios con fonema</Link>
            <Link href="/juego-fonema" className={`block hover:text-[#a86c3a]${pathname === '/juego-fonema' ? ' font-bold' : ''}`}>Juego fonemas</Link>
            <Link href="/juego-silabas" className={`block hover:text-[#a86c3a]${pathname === '/juego-silabas' ? ' font-bold' : ''}`}>Sílabas y sonidos</Link>
            <Link href="/karaoke" className={`block hover:text-[#a86c3a]${pathname === '/karaoke' ? ' font-bold' : ''}`}>Karaoke</Link>
            <Link href="/progreso" className={`block hover:text-[#a86c3a]${pathname === '/progreso' ? ' font-bold' : ''}`}>Progreso</Link>
            <Link href="/visualizacion" className={`block hover:text-[#a86c3a]${pathname === '/visualizacion' ? ' font-bold' : ''}`}>Espectrograma y Visualización del habla</Link>
            <Link href="/about" className={`block hover:text-[#a86c3a]${pathname === '/about' ? ' font-bold' : ''}`}>Sobre nosotros</Link>
            <hr className="border-[#e6b35a]" />
            {user ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <Image 
                    src={`/logos/${user.icon || 'Icono de usuario.png'}`}
                    alt="Usuario" 
                    width={24} 
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-semibold">{getFirstName(user.name)}</span>
                </div>
                <button onClick={handleLogout} className="block w-full text-left hover:text-[#a86c3a]">Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block hover:text-[#a86c3a]">Iniciar sesión</Link>
                <Link href="/signup" className="block hover:text-[#a86c3a]">Crear cuenta</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  {showEditProfile && user && (
    <EditProfileModal user={user} onClose={() => setShowEditProfile(false)} onSave={updatedData => { setUser({...user, ...updatedData}); setShowEditProfile(false); }} />
  )}
  </>
  );
}
