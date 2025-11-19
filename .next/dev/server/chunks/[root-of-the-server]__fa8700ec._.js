module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/util/pg.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getPgClient",
    ()=>getPgClient,
    "getPgPool",
    ()=>getPgPool
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// Connection pool global (reutilizado entre requests)
let pool = null;
function getPgPool() {
    if (pool) {
        return pool;
    }
    const preferred = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.PG_CONNECTION_STRING;
    const fallback = process.env.DIRECT_URL;
    if (!preferred && !fallback) {
        console.error('❌ ERROR: No hay cadena de conexión Postgres disponible');
        throw new Error('POSTGRES_URL no está configurada');
    }
    const connectionString = preferred || fallback;
    pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        },
        max: 20,
        min: 2,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
        query_timeout: 10000
    });
    pool.on('error', (err)=>{
        console.error('❌ Error inesperado en pool de PostgreSQL:', err);
    });
    console.log('✅ Connection pool de PostgreSQL creado');
    return pool;
}
async function getPgClient() {
    const pool = getPgPool();
    try {
        const client = await pool.connect();
        // Wrapper para mantener compatibilidad con código existente
        return {
            query: (...args)=>client.query(...args),
            end: ()=>client.release(),
            release: ()=>client.release()
        };
    } catch (error) {
        console.error('❌ Error obteniendo cliente del pool:', error.message);
        throw error;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/util/cache.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// util/cache.js
/**
 * Sistema de caché simple en memoria para reducir latencia
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
class SimpleCache {
    constructor(ttl = 3600000){
        this.cache = new Map();
        this.ttl = ttl;
    }
    set(key, value, customTtl = null) {
        const expiresAt = Date.now() + (customTtl || this.ttl);
        this.cache.set(key, {
            value,
            expiresAt
        });
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
        for (const [key, item] of this.cache.entries()){
            if (now > item.expiresAt) {
                this.cache.delete(key);
            }
        }
    }
}
// Instancia global de caché
const globalCache = new SimpleCache();
// Limpiar caché cada 5 minutos
setInterval(()=>globalCache.cleanup(), 5 * 60 * 1000);
const __TURBOPACK__default__export__ = globalCache;
}),
"[project]/util/auth.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "SESSION_COOKIE_NAME",
    ()=>SESSION_COOKIE_NAME,
    "SESSION_MAX_AGE",
    ()=>SESSION_MAX_AGE,
    "clearSession",
    ()=>clearSession,
    "createSession",
    ()=>createSession,
    "getUserFromRequest",
    ()=>getUserFromRequest
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$pg$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/pg.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/cache.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$pg$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$util$2f$pg$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
// Session configuration
const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'fa_session';
const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE ? parseInt(process.env.SESSION_MAX_AGE, 10) : 60 * 60 * 24 * 30; // 30 days in seconds
async function createSession(userId) {
    const token = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(48).toString('hex');
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);
    const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$pg$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPgClient"])();
    await client.query('INSERT INTO sessions (session_token, user_id, expires_at) VALUES ($1, $2, $3)', [
        token,
        userId,
        expiresAt
    ]);
    await client.end();
    const isProd = ("TURBOPACK compile-time value", "development") === 'production';
    const cookieParts = [];
    cookieParts.push(`${SESSION_COOKIE_NAME}=${token}`);
    cookieParts.push(`Path=/`);
    cookieParts.push(`HttpOnly`);
    cookieParts.push(`SameSite=Strict`);
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    cookieParts.push(`Max-Age=${SESSION_MAX_AGE}`);
    cookieParts.push(`Expires=${expiresAt.toUTCString()}`);
    const cookie = cookieParts.join('; ');
    return {
        token,
        cookie
    };
}
async function clearSession(token) {
    if (!token) return;
    const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$pg$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPgClient"])();
    await client.query('DELETE FROM sessions WHERE session_token = $1', [
        token
    ]);
    await client.end();
}
async function getUserFromRequest(req) {
    try {
        const cookieHeader = req.headers.get('cookie') || '';
        const cookies = Object.fromEntries(cookieHeader.split(';').map((s)=>s.split('=').map((p)=>p && p.trim())));
        const token = cookies[SESSION_COOKIE_NAME];
        if (!token) return null;
        // Verificar caché primero
        const cacheKey = `session:${token}`;
        const cachedUser = __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(cacheKey);
        if (cachedUser) {
            // Verificar que no haya expirado
            if (new Date(cachedUser.expiresAt) > new Date()) {
                return cachedUser.user;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].delete(cacheKey);
        }
        const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$pg$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPgClient"])();
        const { rows } = await client.query(`SELECT u.id, u.email, u.name, u.icon, u.phone, u.address, u.city, u.state, s.expires_at 
       FROM sessions s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.session_token = $1 LIMIT 1`, [
            token
        ]);
        await client.end();
        if (!rows || rows.length === 0) return null;
        const row = rows[0];
        const expires = new Date(row.expires_at);
        if (expires < new Date()) {
            // session expired
            return null;
        }
        const user = {
            id: row.id,
            email: row.email,
            name: row.name,
            icon: row.icon,
            phone: row.phone,
            address: row.address,
            city: row.city,
            state: row.state
        };
        // Guardar en caché por 5 minutos
        __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].set(cacheKey, {
            user,
            expiresAt: row.expires_at
        }, 5 * 60 * 1000);
        return user;
    } catch (err) {
        console.error('getUserFromRequest error', err && err.message);
        return null;
    }
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/me/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "revalidate",
    ()=>revalidate,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/auth.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$util$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const runtime = 'nodejs';
const revalidate = 60; // Cache por 1 minuto
async function GET(req) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserFromRequest"])(req);
        if (!user) {
            return new Response(JSON.stringify({
                error: 'No autenticado'
            }), {
                status: 401
            });
        }
        return new Response(JSON.stringify({
            user
        }), {
            status: 200
        });
    } catch (err) {
        console.error('Get user error:', err && err.message);
        return new Response(JSON.stringify({
            error: 'Error interno del servidor'
        }), {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fa8700ec._.js.map