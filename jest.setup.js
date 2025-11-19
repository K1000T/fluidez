import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util';

// Polyfill para Response y Request en Node.js
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock de Response para Next.js API routes
global.Response = class Response {
  constructor(body, init = {}) {
    this.body = body;
    this.status = init.status || 200;
    this.statusText = init.statusText || '';
    this.headers = new Map();
    
    if (init.headers) {
      if (init.headers instanceof Headers || init.headers instanceof Map) {
        for (const [key, value] of init.headers) {
          this.headers.set(key, value);
        }
      } else if (typeof init.headers === 'object') {
        Object.entries(init.headers).forEach(([key, value]) => {
          this.headers.set(key, value);
        });
      }
    }
  }
  
  async json() {
    return JSON.parse(this.body);
  }
  
  async text() {
    return this.body;
  }
};

// Mock de Headers
global.Headers = class Headers extends Map {
  constructor(init) {
    super();
    if (init) {
      if (init instanceof Headers || init instanceof Map) {
        for (const [key, value] of init) {
          this.set(key, value);
        }
      } else if (typeof init === 'object') {
        Object.entries(init).forEach(([key, value]) => {
          this.set(key, value);
        });
      }
    }
  }
  
  get(key) {
    return super.get(key.toLowerCase());
  }
  
  set(key, value) {
    return super.set(key.toLowerCase(), value);
  }
};

// Mock environment variables for tests
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
