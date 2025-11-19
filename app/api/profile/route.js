import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '../../../util/supabase';
import { getUserFromRequest } from '../../../util/auth';
import { getPgClient } from '../../../util/pg';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    
    const {
      firstName, middleName, lastName, secondLastName, 
      email, country, city, oldPassword, newPassword, icon, name
    } = await req.json();
    
    // Construir nombre completo
    const fullName = name || `${firstName || ''} ${middleName || ''} ${lastName || ''} ${secondLastName || ''}`.replace(/\s+/g, ' ').trim();
    
    // Actualizar perfil básico
    const updateData = {
      name: fullName,
      email,
      icon: icon || 'Icono de usuario.png',
      country: country || null,
      city: city || null
    };
    
    // Si se está cambiando la contraseña, verificar la antigua
    if (newPassword && oldPassword) {
      const client = await getPgClient();
      const { rows } = await client.query(
        'SELECT password_hash FROM users WHERE id = $1',
        [user.id]
      );
      await client.end();
      
      if (!rows || rows.length === 0) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
      }
      
      // Verificar contraseña antigua (en producción usa bcrypt.compare)
      if (rows[0].password_hash !== oldPassword) {
        return NextResponse.json({ error: 'Contraseña actual incorrecta' }, { status: 401 });
      }
      
      // Actualizar con nueva contraseña (en producción usa bcrypt.hash)
      updateData.password_hash = newPassword;
    }
    
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}
