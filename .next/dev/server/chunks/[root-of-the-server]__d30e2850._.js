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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/util/supabase.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSupabaseServerClient",
    ()=>getSupabaseServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
;
const SUPABASE_URL = ("TURBOPACK compile-time value", "https://llfnkdxldxxhyqfherno.supabase.co") || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    // don't throw at import time in case some routes don't use supabase
    console.warn('[supabase] SUPABASE_URL or SUPABASE_SERVICE_KEY not set');
}
function getSupabaseServerClient() {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
        throw new Error('Supabase config missing (SUPABASE_URL or SUPABASE_SERVICE_KEY)');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
        // Use server-side settings if needed
        auth: {
            persistSession: false
        }
    });
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/app/api/upload-to-supabase/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/supabase.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
const runtime = 'nodejs';
const dynamic = 'force-dynamic';
async function POST(req) {
    try {
        console.log('[upload-to-supabase] Iniciando proceso de upload...');
        const form = await req.formData();
        const file = form.get('file');
        if (!file) {
            console.error('[upload-to-supabase] No se recibió archivo en el FormData');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No se recibió archivo'
            }, {
                status: 400
            });
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filename = file.name || 'audio.webm';
        const mime = file.type || 'audio/webm';
        console.log('[upload-to-supabase] Archivo recibido:', {
            nombre: filename,
            tamaño: buffer.length,
            tipo: mime
        });
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupabaseServerClient"])();
        // Verificar que Supabase esté configurado
        if (!supabase) {
            console.error('[upload-to-supabase] Cliente Supabase no inicializado');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Error de configuración de Supabase'
            }, {
                status: 500
            });
        }
        // Use a deterministic path / folder
        const id = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID();
        const path = `${id}_${filename}`;
        console.log('[upload-to-supabase] Intentando subir a bucket "Audios" con path:', path);
        // Upload to bucket 'Audios' (con mayúscula, como está en Supabase)
        const { data, error } = await supabase.storage.from('Audios').upload(path, buffer, {
            contentType: mime,
            upsert: false
        });
        if (error) {
            console.error('[upload-to-supabase] Error de Supabase Storage:', {
                mensaje: error.message,
                detalles: error,
                statusCode: error.statusCode
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message || String(error),
                detalles: 'Verifica que el bucket "Audios" existe y tiene políticas públicas configuradas'
            }, {
                status: 500
            });
        }
        console.log('[upload-to-supabase] Upload exitoso, data:', data);
        // Get public URL (método correcto)
        const { data: { publicUrl } } = supabase.storage.from('Audios').getPublicUrl(path);
        console.log('[upload-to-supabase] URL pública generada:', publicUrl);
        // Obtener metadatos adicionales del FormData
        const source = form.get('source') || 'daf';
        const duration = parseFloat(form.get('duration')) || 0;
        const wordCount = parseInt(form.get('wordCount')) || 0;
        const transcript = form.get('transcript') || null;
        const delayMs = parseInt(form.get('delay')) || null;
        const playbackRate = parseFloat(form.get('playbackRate')) || 1.0;
        // Calcular WPM
        const wpm = duration > 0 ? Math.round(wordCount / duration * 60) : 0;
        // Guardar metadatos en la tabla de base de datos
        const { data: dbData, error: dbError } = await supabase.from('audios').insert({
            id,
            filename,
            file_path: path,
            file_url: publicUrl,
            mime_type: mime,
            file_size: buffer.length,
            source,
            duration,
            word_count: wordCount,
            wpm,
            transcript,
            delay_ms: delayMs,
            playback_rate: playbackRate
        }).select().single();
        if (dbError) {
            console.error('[upload-to-supabase] Error al guardar en BD:', dbError);
            // No fallar completamente si el archivo se subió pero falló la BD
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                id,
                path,
                publicUrl,
                warning: 'Archivo subido pero no se guardó en base de datos: ' + dbError.message
            });
        }
        console.log('[upload-to-supabase] Metadatos guardados en BD:', dbData);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            id,
            path,
            publicUrl,
            dbRecord: dbData
        });
    } catch (err) {
        console.error('[upload-to-supabase] Error general:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err && err.message ? err.message : String(err),
            stack: ("TURBOPACK compile-time truthy", 1) ? err.stack : "TURBOPACK unreachable"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d30e2850._.js.map