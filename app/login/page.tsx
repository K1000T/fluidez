'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type LoginFormData = {
  email: string;    
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<string>('');
  const [mode, setMode] = useState<'login' | 'signup' | 'recover'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (mode === 'login') {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('¡Inicio de sesión exitoso!');
        // Refresh parent window to update navbar
        window.location.href = '/';
      } else {
        setMessage(data.error || 'Error al iniciar sesión');
      }
    } else if (mode === 'signup') {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('¡Cuenta creada exitosamente!');
      } else {
        setMessage(data.error || 'Error al crear cuenta');
      }
    } else if (mode === 'recover') {
      setMessage('Funcionalidad de recuperación de contraseña aún no implementada.');
    }
  };

  return (
  <div className="min-h-screen bg-[#FFF6ED] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center items-center mb-2">
            <div className="h-10 w-10 bg-[#F7C873] rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="font-bold text-2xl text-[#6B3F1D]">Fluidez Activa</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === 'login' && 'Iniciar Sesión'}
            {mode === 'signup' && 'Crear Cuenta'}
            {mode === 'recover' && 'Recuperar Contraseña'}
          </h2>
          <div className="mt-2 text-center text-sm text-[#6B3F1D] flex flex-wrap gap-2 justify-center">
            <button type="button" className={`font-medium px-2 py-1 rounded ${mode === 'login' ? 'bg-[#F7C873] text-[#6B3F1D]' : ''}`} onClick={() => setMode('login')}>Iniciar sesión</button>
            <button type="button" className={`font-medium px-2 py-1 rounded ${mode === 'signup' ? 'bg-[#F7C873] text-[#6B3F1D]' : ''}`} onClick={() => window.location.href = '/signup'}>Crear cuenta</button>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#6B3F1D] rounded-t-md focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {mode !== 'recover' && (
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-[#6B3F1D] rounded-b-md focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 z-20"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            )}
          </div>

          {mode === 'login' && (
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#F7C873] focus:ring-[#F7C873] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#6B3F1D]">
                Recordar contraseña
              </label>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#F7C873] hover:bg-[#e6b35a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7C873]"
              onClick={mode === 'signup' ? (e => {e.preventDefault(); window.location.href = '/signup';}) : undefined}
            >
              {mode === 'login' && 'Iniciar Sesión'}
              {mode === 'signup' && 'Crear Cuenta'}
              {mode === 'recover' && 'Recuperar Contraseña'}
            </button>
          </div>
          {message && (
            <div className="text-center text-sm mt-2 text-red-600">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}
