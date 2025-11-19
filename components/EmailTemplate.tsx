import * as React from 'react';

interface EmailTemplateProps {
  firstName?: string;
  resetLink: string;
}

export function EmailTemplate({ firstName = '', resetLink }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 600, margin: '0 auto', color: '#6B3F1D' }}>
      <h2 style={{ color: '#6B3F1D' }}>Recuperación de contraseña</h2>
      <p>Hola{firstName ? ` ${firstName}` : ''},</p>
      <p>Recibimos una solicitud para restablecer tu contraseña en Fluidez Activa.</p>
      <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
      <p style={{ margin: '30px 0' }}>
        <a href={resetLink}
           style={{ backgroundColor: '#F7C873', color: '#6B3F1D', padding: '12px 24px', textDecoration: 'none', borderRadius: 5, fontWeight: 'bold' }}>
          Restablecer contraseña
        </a>
      </p>
      <p style={{ color: '#666', fontSize: 14 }}>Este enlace expirará en 5 minutos por seguridad.</p>
      <p style={{ color: '#666', fontSize: 14 }}>Si no solicitaste este cambio, ignora este correo.</p>
      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #ddd' }} />
      <p style={{ color: '#999', fontSize: 12 }}>Fluidez Activa - Plataforma de apoyo para personas con disfemia</p>
    </div>
  );
}
