// util/cache.js
/**
 * Sistema de caché simple en memoria para reducir latencia
 */

class SimpleCache {
  constructor(ttl = 3600000) { // TTL por defecto: 1 hora
    this.cache = new Map();
    this.ttl = ttl;
  }

  set(key, value, customTtl = null) {
    const expiresAt = Date.now() + (customTtl || this.ttl);
    this.cache.set(key, { value, expiresAt });
  }

  get(key) {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Verificar si expiró
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  // Limpiar entradas expiradas
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

// Instancia global de caché
const globalCache = new SimpleCache();

// Limpiar caché cada 5 minutos
setInterval(() => globalCache.cleanup(), 5 * 60 * 1000);

export default globalCache;
