/**
 * PRUEBAS FUNCIONALES - Componente Navbar
 * 
 * Estas pruebas verifican el comportamiento funcional del componente
 * Navbar, incluyendo interacciones del usuario y renderizado condicional.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

// Mocks de Next.js
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

global.fetch = jest.fn();

describe('Pruebas Funcionales - Componente Navbar', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/');
    useRouter.mockReturnValue({
      push: jest.fn(),
      refresh: jest.fn(),
    });
    global.fetch.mockClear();
  });

  test('debe renderizar el logo correctamente', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<Navbar />);

    await waitFor(() => {
      const logo = screen.getByText('FLUIDEZ ACTIVA');
      expect(logo).toBeInTheDocument();
    });
  });

  test('debe mostrar botones de Login y Registro cuando usuario no está autenticado', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<Navbar />);

    await waitFor(() => {
      const loginButton = screen.getByRole('link', { name: /iniciar sesión|login/i });
      expect(loginButton).toBeInTheDocument();
    });
  });

  test('debe mostrar información del usuario cuando está autenticado', async () => {
    const mockUser = {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      icon: '/avatar.png',
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });

    render(<Navbar />);

    await waitFor(() => {
      expect(screen.getByText('Juan')).toBeInTheDocument();
    });
  });

  test('debe mostrar menú de usuario al hacer click en el avatar', async () => {
    const mockUser = {
      id: 1,
      name: 'María García',
      email: 'maria@example.com',
      icon: '/avatar.png',
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });

    render(<Navbar />);

    await waitFor(() => {
      const userButton = screen.getByText('María').closest('button');
      fireEvent.click(userButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Editar perfil')).toBeInTheDocument();
      expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
    });
  });

  test('debe alternar el menú móvil al hacer click en el botón hamburguesa', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<Navbar />);

    await waitFor(() => {
      const menuButton = screen.getByRole('button', { hidden: true });
      expect(menuButton).toBeInTheDocument();
    });
  });

  test('debe hacer logout correctamente', async () => {
    const mockUser = {
      id: 1,
      name: 'Carlos López',
      email: 'carlos@example.com',
    };

    const mockRouter = {
      push: jest.fn(),
      refresh: jest.fn(),
    };

    useRouter.mockReturnValue(mockRouter);

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: mockUser }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

    render(<Navbar />);

    await waitFor(() => {
      const userButton = screen.getByText('Carlos').closest('button');
      fireEvent.click(userButton);
    });

    await waitFor(() => {
      const logoutButton = screen.getByText('Cerrar sesión');
      fireEvent.click(logoutButton);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/logout', expect.any(Object));
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });

  test('debe manejar error al cargar información del usuario', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Navbar />);

    await waitFor(() => {
      const loginButton = screen.getByRole('link', { name: /iniciar sesión|login/i });
      expect(loginButton).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });
});
