import { useState, useEffect, useMemo } from 'react';
import { getCountries, getCitiesByCountry } from '../util/citiesData';

const ICONS = [
  'Icono de usuario.png',
  'Icono de usuario 1.jpg',
  'Icono de usuario 2.png',
  'Icono de usuario 3.png',
  'Icono de usuario 4.jpg',
  'Icono de usuario 5.png',
  'Icono de usuario 6.png',
  'Icono de usuario 7.png',
  'Icono de usuario 8.png',
  'Icono de usuario 9.png',
  'Icono de usuario 10.png',
  'Icono de usuario 11.png',
];

export default function EditProfileModal({ user, onClose, onSave }) {
  const [firstName, setFirstName] = useState(user?.firstName || user?.name?.split(' ')[0] || '');
  const [middleName, setMiddleName] = useState(user?.middleName || '');
  const [lastName, setLastName] = useState(user?.lastName || user?.name?.split(' ')[1] || '');
  const [secondLastName, setSecondLastName] = useState(user?.secondLastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [country, setCountry] = useState(user?.country || '');
  const [city, setCity] = useState(user?.city || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [icon, setIcon] = useState(user?.icon || ICONS[0]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Cargar países desde el JSON
  const countries = useMemo(() => getCountries(), []);
  
  // Cargar ciudades cuando cambia el país
  const availableCities = useMemo(() => {
    if (!country) return [];
    return getCitiesByCountry(country);
  }, [country]);

  // Resetear ciudad cuando cambia el país
  useEffect(() => {
    if (country && availableCities.length > 0 && !availableCities.includes(city)) {
      setCity('');
    }
  }, [country, availableCities, city]);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    
    // Validar contraseñas si se está intentando cambiar
    if (newPassword || confirmPassword || oldPassword) {
      if (!oldPassword) {
        setMsg('Debes ingresar tu contraseña actual');
        setSaving(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setMsg('Las contraseñas nuevas no coinciden');
        setSaving(false);
        return;
      }
      if (newPassword.length < 6) {
        setMsg('La nueva contraseña debe tener al menos 6 caracteres');
        setSaving(false);
        return;
      }
    }
    
    try {
      const fullName = `${firstName} ${middleName} ${lastName} ${secondLastName}`.replace(/\s+/g, ' ').trim();
      
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName, 
          middleName, 
          lastName, 
          secondLastName, 
          email, 
          country, 
          city, 
          oldPassword, 
          newPassword, 
          icon,
          name: fullName
        })
      });
      
      if (res.ok) {
        setMsg('Perfil actualizado');
        onSave && onSave({ 
          firstName, middleName, lastName, secondLastName, 
          email, country, city, icon, 
          name: fullName 
        });
        setTimeout(() => onClose(), 1500);
      } else {
        const data = await res.json();
        setMsg(data?.error ? `Error: ${data.error}` : 'Error al actualizar');
      }
    } catch (e) {
      setMsg('Error de red');
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl my-8">
        <h2 className="text-xl font-bold mb-4 text-[#6B3F1D] flex items-center gap-3">
          Editar perfil
          <img src={`/logos/${icon}`} alt="icono" className="w-10 h-10 rounded-full border-2 border-[#F7C873]" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Primer nombre <span className="text-red-500">*</span></label>
            <input 
              className="w-full border rounded px-3 py-2" 
              value={firstName} 
              onChange={e => setFirstName(e.target.value)} 
              required 
            />
          </div>
          
          <div>
            <label className="block mb-1 font-semibold">Segundo nombre</label>
            <input 
              className="w-full border rounded px-3 py-2" 
              value={middleName} 
              onChange={e => setMiddleName(e.target.value)} 
              placeholder="(Opcional)"
            />
          </div>
          
          <div>
            <label className="block mb-1 font-semibold">Primer apellido <span className="text-red-500">*</span></label>
            <input 
              className="w-full border rounded px-3 py-2" 
              value={lastName} 
              onChange={e => setLastName(e.target.value)} 
              required 
            />
          </div>
          
          <div>
            <label className="block mb-1 font-semibold">Segundo apellido</label>
            <input 
              className="w-full border rounded px-3 py-2" 
              value={secondLastName} 
              onChange={e => setSecondLastName(e.target.value)} 
              placeholder="(Opcional)"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">Correo electrónico <span className="text-red-500">*</span></label>
            <input 
              className="w-full border rounded px-3 py-2" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              type="email" 
              required 
            />
          </div>
          
          <div>
            <label className="block mb-1 font-semibold">País</label>
            <select 
              className="w-full border rounded px-3 py-2" 
              value={country} 
              onChange={e => setCountry(e.target.value)}
            >
              <option value="">Selecciona tu país</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-1 font-semibold">Ciudad</label>
            <select 
              className="w-full border rounded px-3 py-2" 
              value={city} 
              onChange={e => setCity(e.target.value)}
              disabled={!country}
            >
              <option value="">Selecciona tu ciudad</option>
              {availableCities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {country && availableCities.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">Cargando ciudades...</p>
            )}
          </div>
          
          <div className="md:col-span-2 border-t pt-4 mt-2">
            <h3 className="font-bold text-gray-700 mb-3">Cambiar contraseña (opcional)</h3>
          </div>
          
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">Contraseña actual</label>
            <div className="relative">
              <input 
                className="w-full border rounded px-3 py-2 pr-10" 
                value={oldPassword} 
                onChange={e => setOldPassword(e.target.value)} 
                type={showOldPassword ? "text" : "password"}
                placeholder="Dejar en blanco para no cambiar"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 text-xl"
              >
                {showOldPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block mb-1 font-semibold">Nueva contraseña</label>
            <div className="relative">
              <input 
                className="w-full border rounded px-3 py-2 pr-10" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                type={showNewPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 text-xl"
              >
                {showNewPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block mb-1 font-semibold">Confirmar contraseña</label>
            <div className="relative">
              <input 
                className="w-full border rounded px-3 py-2 pr-10" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repetir nueva contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 text-xl"
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block mb-2 font-semibold">Icono de usuario</label>
          <div className="flex flex-wrap gap-3">
            {ICONS.map(i => (
              <button 
                key={i} 
                type="button" 
                onClick={() => setIcon(i)} 
                className={`p-1 rounded-full border-2 transition-all ${
                  icon === i 
                    ? 'border-[#F7C873] ring-2 ring-[#6B3F1D] scale-110' 
                    : 'border-gray-200 hover:border-[#F7C873]'
                }`}
              > 
                <img src={`/logos/${i}`} alt={i} className="w-10 h-10 rounded-full" />
              </button>
            ))}
          </div>
        </div>
        
        {msg && (
          <div className={`my-4 p-3 rounded font-semibold ${
            msg.includes('Error') 
              ? 'bg-red-100 text-red-700 border border-red-300' 
              : 'bg-green-100 text-green-700 border border-green-300'
          }`}>
            {msg}
          </div>
        )}
        
        <div className="flex gap-2 justify-end mt-6">
          <button 
            className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="px-6 py-2 rounded bg-[#F7C873] text-[#6B3F1D] font-bold hover:bg-[#e6b35a] transition-colors" 
            onClick={handleSave} 
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}
