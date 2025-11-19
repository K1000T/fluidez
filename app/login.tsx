'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Define LoginFormData type locally
type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<string>('');
  const [mode, setMode] = useState<'login' | 'signup' | 'recover'>('login');
  const router = useRouter();

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
        router.push('/');
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
      // Aquí iría la lógica para recuperar contraseña (puedes implementar el endpoint /api/recover)
      setMessage('Funcionalidad de recuperación de contraseña aún no implementada.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href="/" className="flex justify-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-2xl text-gray-900">Fluidez Activa</span>
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === 'login' && 'Iniciar Sesión'}
            {mode === 'signup' && 'Crear Cuenta'}
            {mode === 'recover' && 'Recuperar Contraseña'}
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600 flex flex-wrap gap-2 justify-center">
            <button type="button" className={`font-medium px-2 py-1 rounded ${mode === 'login' ? 'bg-blue-100 text-blue-700' : ''}`} onClick={() => setMode('login')}>Iniciar sesión</button>
            <button type="button" className={`font-medium px-2 py-1 rounded ${mode === 'signup' ? 'bg-blue-100 text-blue-700' : ''}`} onClick={() => setMode('signup')}>Crear cuenta</button>
            <button type="button" className={`font-medium px-2 py-1 rounded ${mode === 'recover' ? 'bg-blue-100 text-blue-700' : ''}`} onClick={() => setMode('recover')}>Recuperar contraseña</button>
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
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {mode !== 'recover' && (
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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