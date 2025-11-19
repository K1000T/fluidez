/**
 * PRUEBAS UNITARIAS - Módulo de Autenticación
 * 
 * Estas pruebas verifican el funcionamiento correcto de las funciones
 * de autenticación a nivel unitario.
 */

import { createSession, clearSession, getUserFromRequest, SESSION_COOKIE_NAME } from '../util/auth';
import { getPgClient } from '../util/pg';

// Mock de la base de datos
jest.mock('../util/pg', () => ({
  getPgClient: jest.fn(),
}));

describe('Pruebas Unitarias - Módulo de Autenticación', () => {
  let mockClient;

  beforeEach(() => {
    // Configurar mock de cliente de base de datos
    mockClient = {
      query: jest.fn(),
      end: jest.fn(),
    };
    getPgClient.mockResolvedValue(mockClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSession', () => {
    test('debe crear una sesión válida con token y cookie', async () => {
      const userId = 123;
      mockClient.query.mockResolvedValueOnce({ rows: [] });

      const result = await createSession(userId);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('cookie');
      expect(result.token).toHaveLength(96); // 48 bytes * 2 (hex)
      expect(result.cookie).toContain(SESSION_COOKIE_NAME);
      expect(result.cookie).toContain('HttpOnly');
      expect(result.cookie).toContain('SameSite=Strict');
      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO sessions'),
        expect.arrayContaining([result.token, userId, expect.any(Date)])
      );
      expect(mockClient.end).toHaveBeenCalled();
    });

    test('debe incluir Secure en cookie cuando NODE_ENV es production', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      const userId = 456;
      mockClient.query.mockResolvedValueOnce({ rows: [] });

      const result = await createSession(userId);

      expect(result.cookie).toContain('Secure');
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('clearSession', () => {
    test('debe eliminar una sesión existente', async () => {
      const token = 'test-token-123';
      mockClient.query.mockResolvedValueOnce({ rows: [] });

      await clearSession(token);

      expect(mockClient.query).toHaveBeenCalledWith(
        'DELETE FROM sessions WHERE session_token = $1',
        [token]
      );
      expect(mockClient.end).toHaveBeenCalled();
    });

    test('no debe hacer nada si el token es nulo', async () => {
      await clearSession(null);

      expect(mockClient.query).not.toHaveBeenCalled();
      expect(mockClient.end).not.toHaveBeenCalled();
    });
  });

  describe('getUserFromRequest', () => {
    test('debe retornar usuario válido con sesión activa', async () => {
      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(`${SESSION_COOKIE_NAME}=valid-token-123`),
        },
      };

      const futureDate = new Date(Date.now() + 86400000); // +1 día
      mockClient.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          icon: 'avatar.png',
          phone: '1234567890',
          address: 'Test St',
          city: 'Test City',
          state: 'TS',
          expires_at: futureDate,
        }],
      });

      const user = await getUserFromRequest(mockRequest);

      expect(user).toEqual({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        icon: 'avatar.png',
        phone: '1234567890',
        address: 'Test St',
        city: 'Test City',
        state: 'TS',
      });
      expect(mockClient.end).toHaveBeenCalled();
    });

    test('debe retornar null si no hay cookie de sesión', async () => {
      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(''),
        },
      };

      const user = await getUserFromRequest(mockRequest);

      expect(user).toBeNull();
      expect(mockClient.query).not.toHaveBeenCalled();
    });

    test('debe retornar null si la sesión ha expirado', async () => {
      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(`${SESSION_COOKIE_NAME}=expired-token`),
        },
      };

      const pastDate = new Date(Date.now() - 86400000); // -1 día
      mockClient.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          icon: null,
          phone: null,
          address: null,
          city: null,
          state: null,
          expires_at: pastDate,
        }],
      });

      const user = await getUserFromRequest(mockRequest);

      expect(user).toBeNull();
    });

    test('debe retornar null si no se encuentra la sesión en BD', async () => {
      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(`${SESSION_COOKIE_NAME}=nonexistent-token`),
        },
      };

      mockClient.query.mockResolvedValueOnce({ rows: [] });

      const user = await getUserFromRequest(mockRequest);

      expect(user).toBeNull();
    });

    test('debe manejar errores de base de datos correctamente', async () => {
      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(`${SESSION_COOKIE_NAME}=error-token`),
        },
      };

      mockClient.query.mockRejectedValueOnce(new Error('Database error'));

      const user = await getUserFromRequest(mockRequest);

      expect(user).toBeNull();
    });
  });
});
