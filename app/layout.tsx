// app/layout.tsx
import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Fluidez Activa - Plataforma para Disfemia',
  description: 'Plataforma gratuita para apoyar a personas con disfemia mediante herramientas tecnológicas accesibles y en español',
};

// Configuración de caché y revalidación
export const revalidate = 3600; // Revalidar cada hora
export const dynamic = 'force-static'; // Generar páginas estáticas cuando sea posible

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
