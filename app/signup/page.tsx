'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCountries, getCitiesByCountry } from '../../util/citiesData';

type SignupFormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  city: string;
  country: string;
  birthdate: string;
};

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    secondLastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    city: '',
    country: '',
    birthdate: '',
  });
  const [message, setMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Cargar países desde JSON
  const countries = useMemo(() => getCountries(), []);
  
  // Cargar ciudades basadas en el país seleccionado
  const cities = useMemo(() => {
    if (!formData.country) return [];
    return getCitiesByCountry(formData.country);
  }, [formData.country]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (formData.password !== formData.confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }
    if (formData.password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: `${formData.firstName} ${formData.middleName} ${formData.lastName} ${formData.secondLastName}`.replace(/\s+/g, ' ').trim(),
        email: formData.email, 
        password: formData.password,
        city: formData.city,
        country: formData.country,
        birthdate: formData.birthdate,
        gender: formData.gender
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('¡Cuenta creada exitosamente! Redirigiendo...');
      // Refresh to update navbar
      window.location.href = '/';
    } else {
      setMessage(data.error || 'Error al crear cuenta');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6ED] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href="/" className="flex justify-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-[#F7C873] rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-2xl text-[#6B3F1D]">Fluidez Activa</span>
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#6B3F1D]">
            Crear Cuenta
          </h2>
          <div className="mt-2 text-center text-sm text-[#6B3F1D]">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión aquí
            </Link>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="firstName" className="sr-only">
                Primer nombre
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#6B3F1D] rounded-t-md focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                placeholder="Primer nombre"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="middleName" className="sr-only">
                Segundo nombre (opcional)
              </label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                autoComplete="additional-name"
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#6B3F1D] focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                placeholder="Segundo nombre (opcional)"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Primer apellido
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#6B3F1D] focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                placeholder="Primer apellido"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="secondLastName" className="sr-only">
                Segundo apellido (opcional)
              </label>
              <input
                id="secondLastName"
                name="secondLastName"
                type="text"
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#6B3F1D] focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                placeholder="Segundo apellido (opcional)"
                value={formData.secondLastName}
                onChange={handleChange}
              />
            </div>
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
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#6B3F1D] focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="gender" className="sr-only">
                Género
              </label>
              <select
                id="gender"
                name="gender"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 text-[#6B3F1D] focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled>Selecciona tu género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="prefiero_no_decir">Prefiero no decir</option>
              </select>
            </div>
            <div>
              <label htmlFor="country" className="sr-only">
                País
              </label>
              <select
                id="country"
                name="country"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 text-[#6B3F1D] focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="" disabled>Selecciona tu país</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="city" className="sr-only">
                Ciudad
              </label>
              {formData.country && cities.length > 0 ? (
                <select
                  id="city"
                  name="city"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 text-[#6B3F1D] focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="" disabled>Selecciona tu ciudad</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              ) : (
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[#6B3F1D] focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                  placeholder="Ciudad"
                  value={formData.city}
                  onChange={handleChange}
                />
              )}
            </div>
            <div>
              <label htmlFor="birthdate" className="sr-only">
                Fecha de nacimiento
              </label>
              <input
                id="birthdate"
                name="birthdate"
                type="date"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 text-[#6B3F1D] focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                value={formData.birthdate}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-[#6B3F1D] focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
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
            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-[#6B3F1D] rounded-b-md focus:outline-none focus:ring-[#F7C873] focus:border-[#F7C873] focus:z-10 sm:text-sm"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 z-20"
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-[#F7C873] focus:ring-[#F7C873] border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-[#6B3F1D]">
              Acepto los{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                términos y condiciones
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#F7C873] hover:bg-[#e6b35a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7C873]"
            >
              Crear Cuenta
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
