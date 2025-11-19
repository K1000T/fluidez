/**
 * PRUEBAS DE INTEGRACIÓN - API de Autenticación
 * 
 * Estas pruebas verifican la integración entre los endpoints de la API
 * y la base de datos, simulando peticiones HTTP reales.
 */

import { POST as loginPOST } from '../app/api/login/route';
import { POST as signupPOST } from '../app/api/signup/route';
import { GET as meGET } from '../app/api/me/route';
import { getPgClient } from '../util/pg';
import bcrypt from 'bcryptjs';

// Mock de la base de datos
jest.mock('../util/pg', () => ({
  getPgClient: jest.fn(),
}));

jest.mock('../util/auth', () => ({
  createSession: jest.fn().mockResolvedValue({
    token: 'mock-session-token',
    cookie: 'fa_session=mock-session-token; Path=/; HttpOnly; SameSite=Strict; Max-Age=2592000',
  }),
  getUserFromRequest: jest.fn(),
}));

describe('Pruebas de Integración - API de Autenticación', () => {
  let mockClient;

  beforeEach(() => {
    mockClient = {
      query: jest.fn(),
      end: jest.fn(),
    };
    getPgClient.mockResolvedValue(mockClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/login', () => {
    test('debe autenticar usuario con credenciales válidas', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      mockClient.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          email: 'test@example.com',
          password_hash: hashedPassword,
          name: 'Test User',
          created_at: new Date(),
        }],
      });

      const mockRequest = {
        json: async () => ({
          email: 'test@example.com',
          password: 'password123',
        }),
      };

      const response = await loginPOST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe('test@example.com');
      expect(data.user.password_hash).toBeUndefined();
    });

    test('debe rechazar credenciales incorrectas', async () => {
      mockClient.query.mockResolvedValueOnce({
        rows: [],
      });

      const mockRequest = {
        json: async () => ({
          email: 'wrong@example.com',
          password: 'wrongpassword',
        }),
      };

      const response = await loginPOST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Credenciales incorrectas');
    });

    test('debe rechazar password incorrecto para email válido', async () => {
      const hashedPassword = await bcrypt.hash('correctpassword', 10);
      
      mockClient.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          email: 'test@example.com',
          password_hash: hashedPassword,
          name: 'Test User',
          created_at: new Date(),
        }],
      });

      const mockRequest = {
        json: async () => ({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      };

      const response = await loginPOST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Credenciales incorrectas');
    });

    test('debe validar campos obligatorios', async () => {
      const mockRequest = {
        json: async () => ({
          email: 'test@example.com',
        }),
      };

      const response = await loginPOST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Faltan datos');
    });

    test('debe normalizar email a minúsculas y eliminar espacios', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      mockClient.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          email: 'test@example.com',
          password_hash: hashedPassword,
          name: 'Test User',
          created_at: new Date(),
        }],
      });

      const mockRequest = {
        json: async () => ({
          email: '  TEST@EXAMPLE.COM  ',
          password: 'password123',
        }),
      };

      const response = await loginPOST(mockRequest);

      expect(mockClient.query).toHaveBeenCalledWith(
        expect.any(String),
        ['test@example.com']
      );
      expect(response.status).toBe(200);
    });
  });

  describe('POST /api/signup', () => {
    test('debe registrar nuevo usuario correctamente', async () => {
      // Mock para verificar que el email no existe
      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // Check email exists
        .mockResolvedValueOnce({ // Insert user
          rows: [{
            id: 1,
            email: 'newuser@example.com',
            name: 'New User',
            created_at: new Date(),
          }],
        });

      const mockRequest = {
        json: async () => ({
          email: 'newuser@example.com',
          password: 'SecurePass123',
          name: 'New User',
          phone: '1234567890',
        }),
      };

      const response = await signupPOST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.user.email).toBe('newuser@example.com');
    });

    test('debe rechazar email duplicado', async () => {
      mockClient.query.mockResolvedValueOnce({
        rows: [{ email: 'existing@example.com' }],
      });

      const mockRequest = {
        json: async () => ({
          email: 'existing@example.com',
          password: 'password123',
          name: 'Test User',
        }),
      };

      const response = await signupPOST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.error).toContain('ya existe');
    });
  });

  describe('GET /api/me', () => {
    test('debe retornar información del usuario autenticado', async () => {
      const { getUserFromRequest } = require('../util/auth');
      
      getUserFromRequest.mockResolvedValueOnce({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        icon: 'avatar.png',
      });

      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue('fa_session=valid-token'),
        },
      };

      const response = await meGET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe('test@example.com');
    });

    test('debe retornar 401 si no hay sesión activa', async () => {
      const { getUserFromRequest } = require('../util/auth');
      
      getUserFromRequest.mockResolvedValueOnce(null);

      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(''),
        },
      };

      const response = await meGET(mockRequest);

      expect(response.status).toBe(401);
    });
  });
});
