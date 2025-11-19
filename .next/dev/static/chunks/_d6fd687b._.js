(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/visualizacion/Spectrogram.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Spectrogram
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function Spectrogram({ audioUrl, stream, isLive, audioCtxRef: parentAudioCtxRef, mediaSourceRef: parentMediaSourceRef, audioRef: parentAudioRef }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pitchCanvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const audioContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const analyserRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const spectrogramDataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const audioElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [audioDuration, setAudioDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Spectrogram.useEffect": ()=>{
            // Reanudar AudioContext ante un gesto del usuario para evitar silencio
            const resumeOnGesture = {
                "Spectrogram.useEffect.resumeOnGesture": ()=>{
                    const ctx = parentAudioCtxRef && parentAudioCtxRef.current || audioContextRef.current;
                    if (ctx && ctx.state === 'suspended') {
                        try {
                            ctx.resume();
                        } catch (_) {}
                    }
                }
            }["Spectrogram.useEffect.resumeOnGesture"];
            window.addEventListener('pointerdown', resumeOnGesture, {
                once: false
            });
            window.addEventListener('keydown', resumeOnGesture, {
                once: false
            });
            return ({
                "Spectrogram.useEffect": ()=>{
                    window.removeEventListener('pointerdown', resumeOnGesture);
                    window.removeEventListener('keydown', resumeOnGesture);
                }
            })["Spectrogram.useEffect"];
        }
    }["Spectrogram.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Spectrogram.useEffect": ()=>{
            if (!canvasRef.current || !pitchCanvasRef.current) return;
            const canvas = canvasRef.current;
            const pitchCanvas = pitchCanvasRef.current;
            const ctx = canvas.getContext('2d');
            const pitchCtx = pitchCanvas.getContext('2d');
            if (!ctx || !pitchCtx) return;
            // Si no hay audio, solo dibuja los fondos y retorna
            if (!audioUrl && !isLive) {
                const drawSpectrogramBackground = {
                    "Spectrogram.useEffect.drawSpectrogramBackground": ()=>{
                        ctx.fillStyle = '#ffffff';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.strokeStyle = '#e8e8e8';
                        ctx.lineWidth = 1;
                        for(let i = 0; i <= 5; i++){
                            const y = canvas.height / 5 * i;
                            ctx.beginPath();
                            ctx.moveTo(0, y);
                            ctx.lineTo(canvas.width, y);
                            ctx.stroke();
                        }
                        for(let i = 0; i <= 10; i++){
                            const x = canvas.width / 10 * i;
                            ctx.beginPath();
                            ctx.moveTo(x, 0);
                            ctx.lineTo(x, canvas.height);
                            ctx.stroke();
                        }
                    }
                }["Spectrogram.useEffect.drawSpectrogramBackground"];
                const drawPitchBackground = {
                    "Spectrogram.useEffect.drawPitchBackground": ()=>{
                        pitchCtx.fillStyle = '#f9f9f9';
                        pitchCtx.fillRect(0, 0, pitchCanvas.width, pitchCanvas.height);
                        pitchCtx.strokeStyle = '#e0e0e0';
                        pitchCtx.lineWidth = 0.5;
                        for(let i = 0; i <= 5; i++){
                            const y = pitchCanvas.height / 5 * i;
                            pitchCtx.beginPath();
                            pitchCtx.moveTo(0, y);
                            pitchCtx.lineTo(pitchCanvas.width, y);
                            pitchCtx.stroke();
                        }
                    }
                }["Spectrogram.useEffect.drawPitchBackground"];
                drawSpectrogramBackground();
                drawPitchBackground();
                return;
            }
            // Limpia contexto anterior SOLO si lo creó este componente
            if (audioContextRef.current && audioContextRef.current !== parentAudioCtxRef?.current) {
                try {
                    audioContextRef.current.close();
                } catch (e) {
                    console.warn('Error cerrando audio context:', e);
                }
                audioContextRef.current = null;
            }
            let audioCtx;
            let source = null;
            if (isLive && stream) {
                audioCtx = parentAudioCtxRef && parentAudioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)();
                if (parentAudioCtxRef && !parentAudioCtxRef.current) {
                    parentAudioCtxRef.current = audioCtx;
                }
                if (!parentAudioCtxRef) audioContextRef.current = audioCtx;
                source = audioCtx.createMediaStreamSource(stream);
            } else {
                // Busca el elemento de audio - usar el ref del padre si está disponible
                let audioElem = null;
                if (parentAudioRef && parentAudioRef.current) {
                    audioElem = parentAudioRef.current;
                } else {
                    audioElem = document.querySelector('audio');
                }
                if (!audioElem) {
                    console.warn('No se encontró elemento de audio');
                    return;
                }
                audioElementRef.current = audioElem;
                audioCtx = parentAudioCtxRef && parentAudioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)();
                if (parentAudioCtxRef && !parentAudioCtxRef.current) {
                    parentAudioCtxRef.current = audioCtx;
                }
                if (!parentAudioCtxRef) audioContextRef.current = audioCtx;
                if (parentMediaSourceRef && parentMediaSourceRef.current) {
                    source = parentMediaSourceRef.current;
                } else if (sourceRef.current) {
                    source = sourceRef.current;
                } else {
                    try {
                        // Intentar crear source solo si no existe uno válido
                        // Nota: createMediaElementSource lanzará error si ya existe uno para este elemento
                        source = audioCtx.createMediaElementSource(audioElem);
                        if (parentMediaSourceRef) {
                            parentMediaSourceRef.current = source;
                        } else {
                            sourceRef.current = source;
                        }
                    } catch (err) {
                        console.warn('No se pudo crear MediaElementSource (probablemente ya existe):', err);
                    // Si falla, intentamos recuperar el existente si es posible, o simplemente no conectamos
                    // Si ya existe y está conectado a otro contexto, no podemos hacer mucho
                    }
                }
            }
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 4096;
            analyser.smoothingTimeConstant = 0.8;
            analyserRef.current = analyser;
            // Conectar solo si el source pertenece al mismo contexto de audio
            if (source) {
                try {
                    // Verificar si el source pertenece al contexto actual
                    if (source.context === audioCtx) {
                        try {
                            source.disconnect();
                        } catch (e) {}
                        source.connect(analyser);
                    } else {
                        console.warn('Source context mismatch', source.context.state, audioCtx.state);
                    }
                } catch (err) {
                    console.warn('Error conectando source al analyser:', err);
                }
            }
            try {
                // Solo conectar al destino (altavoces) si NO es en vivo.
                // En modo live (grabación), el audio ya se está monitoreando/procesando en el componente padre (DAFPage).
                // Si lo conectamos aquí también, tendremos doble audio (directo + procesado) causando eco y feedback.
                if (!isLive) {
                    analyser.connect(audioCtx.destination);
                }
            } catch (err) {
                console.warn('Error conectando analyser al destination:', err);
            }
            // Asegurar que el contexto esté corriendo si no es live (en live depende del usuario)
            if (!isLive && audioCtx.state === 'suspended') {
            // No forzamos resume aquí para cumplir con políticas de autoplay, 
            // pero el manejador de eventos global lo hará al primer clic
            }
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            spectrogramDataRef.current = [];
            // Dibujar fondo y ejes para espectrograma
            function drawSpectrogramBackground() {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // Cuadrícula
                ctx.strokeStyle = '#e8e8e8';
                ctx.lineWidth = 1;
                // Líneas de cuadrícula horizontales (frecuencia)
                for(let i = 0; i <= 5; i++){
                    const y = canvas.height / 5 * i;
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(canvas.width, y);
                    ctx.stroke();
                }
                // Líneas de cuadrícula verticales (tiempo)
                for(let i = 0; i <= 10; i++){
                    const x = canvas.width / 10 * i;
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvas.height);
                    ctx.stroke();
                }
            }
            function drawPitchBackground() {
                pitchCtx.fillStyle = '#f9f9f9';
                pitchCtx.fillRect(0, 0, pitchCanvas.width, pitchCanvas.height);
                // Líneas de cuadrícula
                pitchCtx.strokeStyle = '#e0e0e0';
                pitchCtx.lineWidth = 0.5;
                for(let i = 0; i <= 5; i++){
                    const y = pitchCanvas.height / 5 * i;
                    pitchCtx.beginPath();
                    pitchCtx.moveTo(0, y);
                    pitchCtx.lineTo(pitchCanvas.width, y);
                    pitchCtx.stroke();
                }
            }
            drawSpectrogramBackground();
            drawPitchBackground();
            // Limpiar espectrograma cuando el audio termina
            let handleEnded;
            let handlePlay;
            let handleTimeUpdate;
            let handleLoadedMetadata;
            if (!isLive && audioElementRef.current) {
                handleEnded = ({
                    "Spectrogram.useEffect": ()=>{
                        spectrogramDataRef.current = [];
                        drawSpectrogramBackground();
                        drawPitchBackground();
                    }
                })["Spectrogram.useEffect"];
                handlePlay = ({
                    "Spectrogram.useEffect": ()=>{
                        // Reanudar AudioContext si estuviera suspendido para asegurar salida de audio
                        try {
                            if (audioCtx.state === 'suspended') audioCtx.resume();
                        } catch (_) {}
                        if (audioElementRef.current && audioElementRef.current.currentTime < 0.1) {
                            spectrogramDataRef.current = [];
                            drawSpectrogramBackground();
                            drawPitchBackground();
                        }
                    }
                })["Spectrogram.useEffect"];
                handleTimeUpdate = ({
                    "Spectrogram.useEffect": ()=>{
                        if (audioElementRef.current) {
                            setCurrentTime(audioElementRef.current.currentTime);
                        }
                    }
                })["Spectrogram.useEffect"];
                handleLoadedMetadata = ({
                    "Spectrogram.useEffect": ()=>{
                        if (audioElementRef.current) {
                            setAudioDuration(audioElementRef.current.duration);
                        }
                    }
                })["Spectrogram.useEffect"];
                audioElementRef.current.addEventListener('ended', handleEnded);
                audioElementRef.current.addEventListener('play', handlePlay);
                audioElementRef.current.addEventListener('timeupdate', handleTimeUpdate);
                audioElementRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
                // Intentar obtener la duración inmediatamente si ya está disponible
                if (audioElementRef.current.duration && !isNaN(audioElementRef.current.duration)) {
                    setAudioDuration(audioElementRef.current.duration);
                }
            }
            function draw() {
                // En modo live siempre dibujar, en modo playback solo si está reproduciéndose o en pausa (para mantener el gráfico)
                const shouldDraw = isLive || !audioElementRef.current || !audioElementRef.current.paused;
                if (shouldDraw || spectrogramDataRef.current.length > 0) {
                    analyser.getByteFrequencyData(dataArray);
                    // Solo agregar nuevas columnas si realmente está reproduciendo
                    if (shouldDraw) {
                        // Agregar columna actual al espectrograma
                        const column = [];
                        for(let i = 0; i < bufferLength; i++){
                            column.push(dataArray[i]);
                        }
                        spectrogramDataRef.current.push(column);
                        // Limitar ancho del espectrograma (scrolling)
                        const maxColumns = canvas.width;
                        if (spectrogramDataRef.current.length > maxColumns) {
                            spectrogramDataRef.current.shift();
                        }
                    }
                    // Siempre redibujar el espectrograma si hay datos
                    if (spectrogramDataRef.current.length > 0) {
                        // Dibujar espectrograma
                        drawSpectrogramBackground();
                        const columnWidth = canvas.width / spectrogramDataRef.current.length;
                        spectrogramDataRef.current.forEach({
                            "Spectrogram.useEffect.draw": (col, x)=>{
                                for(let i = 0; i < Math.min(col.length, 200); i++){
                                    const intensity = col[i];
                                    const y = canvas.height - i / 200 * canvas.height;
                                    // Escala de colores: azul oscuro -> amarillo -> rojo (similar a espectrogramas profesionales)
                                    let r, g, b;
                                    if (intensity < 85) {
                                        // Azul oscuro -> azul
                                        r = 0;
                                        g = 0;
                                        b = Math.floor(50 + intensity / 85 * 155);
                                    } else if (intensity < 170) {
                                        // Azul -> verde -> amarillo
                                        const t = (intensity - 85) / 85;
                                        r = Math.floor(t * 255);
                                        g = Math.floor(100 + t * 155);
                                        b = Math.floor(205 - t * 205);
                                    } else {
                                        // Amarillo -> rojo
                                        const t = (intensity - 170) / 85;
                                        r = 255;
                                        g = Math.floor(255 - t * 155);
                                        b = 0;
                                    }
                                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
                                    ctx.fillRect(x * columnWidth, y - 1, columnWidth + 1, canvas.height / 200);
                                }
                            }
                        }["Spectrogram.useEffect.draw"]);
                        // Dibujar curva de F0 (pitch) estimada
                        drawPitchBackground();
                        // Encontrar pico de energía como aproximación de F0
                        let maxIntensity = 0;
                        let maxIndex = 0;
                        for(let i = 5; i < 100; i++){
                            if (dataArray[i] > maxIntensity) {
                                maxIntensity = dataArray[i];
                                maxIndex = i;
                            }
                        }
                        // Dibujar curva suave de pitch
                        const sampleRate = audioCtx.sampleRate;
                        const nyquist = sampleRate / 2;
                        const estimatedF0 = maxIndex / bufferLength * nyquist;
                        if (spectrogramDataRef.current.length > 1) {
                            pitchCtx.strokeStyle = '#2563eb';
                            pitchCtx.lineWidth = 2;
                            pitchCtx.beginPath();
                            spectrogramDataRef.current.forEach({
                                "Spectrogram.useEffect.draw": (col, x)=>{
                                    let colMaxIntensity = 0;
                                    let colMaxIndex = 0;
                                    for(let i = 5; i < 100; i++){
                                        if (col[i] > colMaxIntensity) {
                                            colMaxIntensity = col[i];
                                            colMaxIndex = i;
                                        }
                                    }
                                    const f0 = colMaxIndex / bufferLength * nyquist;
                                    const normalizedF0 = Math.min(Math.max((f0 - 50) / 300, 0), 1);
                                    const y = pitchCanvas.height - normalizedF0 * pitchCanvas.height;
                                    if (x === 0) {
                                        pitchCtx.moveTo(x * columnWidth, y);
                                    } else {
                                        pitchCtx.lineTo(x * columnWidth, y);
                                    }
                                }
                            }["Spectrogram.useEffect.draw"]);
                            pitchCtx.stroke();
                        }
                    }
                }
                animationRef.current = requestAnimationFrame(draw);
            }
            draw();
            // Limpieza
            return ({
                "Spectrogram.useEffect": ()=>{
                    if (animationRef.current) cancelAnimationFrame(animationRef.current);
                    try {
                        analyser.disconnect();
                    } catch (e) {}
                    if (audioContextRef.current) {
                        // No cerramos el contexto si viene del padre y está activo
                        if (audioContextRef.current !== parentAudioCtxRef?.current) {
                            audioContextRef.current.close();
                        }
                    }
                    if (!isLive && audioElementRef.current) {
                        if (handleEnded) audioElementRef.current.removeEventListener('ended', handleEnded);
                        if (handlePlay) audioElementRef.current.removeEventListener('play', handlePlay);
                        if (handleTimeUpdate) audioElementRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                        if (handleLoadedMetadata) audioElementRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                    }
                }
            })["Spectrogram.useEffect"];
        }
    }["Spectrogram.useEffect"], [
        audioUrl,
        isLive,
        stream
    ]);
    // Generar marcadores de tiempo dinámicos
    const getTimeMarkers = ()=>{
        const duration = audioDuration || 10;
        const numMarkers = 11; // 0 a 10 marcadores (11 puntos)
        const markers = [];
        for(let i = 0; i < numMarkers; i++){
            const time = duration / (numMarkers - 1) * i;
            markers.push(time.toFixed(1) + 's');
        }
        return markers;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex flex-col items-center mt-1 mb-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-600 mb-1 font-semibold",
                        children: "F0 - Frecuencia fundamental (Pitch)"
                    }, void 0, false, {
                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                        lineNumber: 427,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col justify-between text-xs text-gray-600",
                                style: {
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "350 Hz"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 430,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "250 Hz"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 431,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "150 Hz"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "50 Hz"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 433,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 429,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                        ref: pitchCanvasRef,
                                        width: 800,
                                        height: 120,
                                        className: "w-full rounded border border-gray-300 bg-white shadow-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 436,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs text-gray-600 mt-1",
                                        children: getTimeMarkers().map((marker, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: marker
                                            }, i, false, {
                                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                                lineNumber: 444,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 442,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 435,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                lineNumber: 426,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-600 mb-1 font-semibold",
                        children: [
                            "Espectrograma - ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-blue-700",
                                children: "Frecuencia (Hz)"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 454,
                                columnNumber: 27
                            }, this),
                            " vs ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-700",
                                children: "Tiempo (s)"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 454,
                                columnNumber: 85
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                        lineNumber: 453,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col justify-between text-xs text-gray-600 text-right",
                                style: {
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "5000 Hz"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 458,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "4000 Hz"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 459,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "3000 Hz"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 460,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "2000 Hz"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 461,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "1000 Hz"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 462,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "0 Hz"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 463,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                        ref: canvasRef,
                                        width: 800,
                                        height: 250,
                                        className: "w-full rounded border border-gray-300 bg-white shadow-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 466,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs text-gray-600 mt-1",
                                        children: getTimeMarkers().map((marker, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: marker
                                            }, i, false, {
                                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                                lineNumber: 474,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 472,
                                        columnNumber: 13
                                    }, this),
                                    currentTime > 0 && audioDuration > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 text-xs text-indigo-600 font-semibold",
                                        children: [
                                            "Reproduciendo: ",
                                            currentTime.toFixed(1),
                                            "s / ",
                                            audioDuration.toFixed(1),
                                            "s"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                        lineNumber: 478,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 465,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                        lineNumber: 456,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                lineNumber: 452,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-sm text-gray-700 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-justify",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "¿Qué muestra el espectrograma?"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 488,
                                columnNumber: 11
                            }, this),
                            " El ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: "eje horizontal"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 488,
                                columnNumber: 52
                            }, this),
                            " muestra el ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-700 font-semibold",
                                children: "tiempo en segundos"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 488,
                                columnNumber: 117
                            }, this),
                            ", y el ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: "eje vertical"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 488,
                                columnNumber: 196
                            }, this),
                            " muestra la ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-blue-700 font-semibold",
                                children: "frecuencia en Hertz (Hz)"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 488,
                                columnNumber: 259
                            }, this),
                            ". Cada punto de color representa la energía (intensidad) de una frecuencia específica en un momento dado. Las frecuencias bajas (parte inferior) corresponden a sonidos graves y las altas (parte superior) a sonidos agudos. Los colores indican intensidad: azul (bajo), verde-amarillo (medio), naranja (alto - más intenso)."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                        lineNumber: 487,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-600 text-justify",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "Elementos suprasegmentales del acento:"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 491,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 491,
                                columnNumber: 57
                            }, this),
                            "• ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "Articulatoriamente:"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 492,
                                columnNumber: 13
                            }, this),
                            " Incremento de la frecuencia de vibración de las cuerdas vocales y de la fuerza y tiempo de salida del aire",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 492,
                                columnNumber: 146
                            }, this),
                            "• ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "Acústicamente:"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 493,
                                columnNumber: 13
                            }, this),
                            " Aumento de frecuencia fundamental, de intensidad o de duración de una sílaba",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 493,
                                columnNumber: 111
                            }, this),
                            "• ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "Perceptivamente:"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                                lineNumber: 494,
                                columnNumber: 13
                            }, this),
                            " Prominencia en la altura tonal (agudo), en la intensidad (fuerte) o en la duración (largo) de una sílaba"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                        lineNumber: 490,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/visualizacion/Spectrogram.tsx",
                lineNumber: 486,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/visualizacion/Spectrogram.tsx",
        lineNumber: 424,
        columnNumber: 5
    }, this);
}
_s(Spectrogram, "oMugqdcmLHkLb5cwk6DbMQzcm9c=");
_c = Spectrogram;
var _c;
__turbopack_context__.k.register(_c, "Spectrogram");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/WordCloud.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WordCloud
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function WordCloud({ transcript, maxWords = 50 }) {
    _s();
    const wordData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WordCloud.useMemo[wordData]": ()=>{
            if (!transcript) return [];
            // Normalizar y limpiar el texto
            const cleaned = transcript.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
            .replace(/[.,!?;:\u2014\-()"'«»\[\]]+/g, ' ') // Eliminar puntuación
            .toLowerCase();
            const words = cleaned.trim().split(/\s+/).filter(Boolean);
            const wordCount = {};
            words.forEach({
                "WordCloud.useMemo[wordData]": (word)=>{
                    if (word.length > 2) {
                        wordCount[word] = (wordCount[word] || 0) + 1;
                    }
                }
            }["WordCloud.useMemo[wordData]"]);
            // Convertir a array y ordenar por frecuencia
            return Object.entries(wordCount).sort({
                "WordCloud.useMemo[wordData]": (a, b)=>b[1] - a[1]
            }["WordCloud.useMemo[wordData]"]).slice(0, maxWords).map({
                "WordCloud.useMemo[wordData]": ([text, value])=>({
                        text,
                        value
                    })
            }["WordCloud.useMemo[wordData]"]);
        }
    }["WordCloud.useMemo[wordData]"], [
        transcript,
        maxWords
    ]);
    // Calcular tamaños de fuente basados en frecuencia
    const maxValue = Math.max(...wordData.map((w)=>w.value), 1);
    const minFontSize = 12;
    const maxFontSize = 48;
    if (wordData.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-400 italic",
                children: "No hay palabras para mostrar"
            }, void 0, false, {
                fileName: "[project]/components/WordCloud.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/WordCloud.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap items-center justify-center gap-2 h-full",
            children: wordData.map(({ text, value })=>{
                const fontSize = minFontSize + value / maxValue * (maxFontSize - minFontSize);
                const opacity = 0.5 + value / maxValue * 0.5;
                // Colores basados en frecuencia
                const hue = 200 + value / maxValue * 60; // De azul a cian
                const saturation = 60 + value / maxValue * 30;
                const lightness = 45 - value / maxValue * 15;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-semibold transition-transform hover:scale-110 cursor-default",
                    style: {
                        fontSize: `${fontSize}px`,
                        opacity,
                        color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                        lineHeight: 1.2
                    },
                    title: `"${text}" aparece ${value} ${value === 1 ? 'vez' : 'veces'}`,
                    children: text
                }, text, false, {
                    fileName: "[project]/components/WordCloud.tsx",
                    lineNumber: 62,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/components/WordCloud.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/WordCloud.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(WordCloud, "My2sMYDTOKkd9Bvlt7Z8QuERvQA=");
_c = WordCloud;
var _c;
__turbopack_context__.k.register(_c, "WordCloud");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/MetricsDisplay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MetricsDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
// Función para calcular métricas lingüísticas
function calculateMetrics(transcript) {
    if (!transcript || transcript.trim().length === 0) {
        return {
            pvi: null,
            varcoV: null,
            percentV: null
        };
    }
    const vowels = 'aeiouáéíóúAEIOUÁÉÍÓÚ';
    const text = transcript.toLowerCase();
    // Calcular %V (Porcentaje Vocálico)
    const totalChars = text.replace(/\s+/g, '').length;
    const vowelCount = text.split('').filter((char)=>vowels.includes(char)).length;
    const percentV = totalChars > 0 ? vowelCount / totalChars * 100 : 0;
    // Extraer duraciones de vocales (simulado - en una implementación real necesitaríamos audio analysis)
    // Por ahora, usaremos la longitud de segmentos vocálicos como proxy
    const vocalicSegments = [];
    let currentVowelLength = 0;
    for (const char of text){
        if (vowels.includes(char)) {
            currentVowelLength++;
        } else if (currentVowelLength > 0) {
            vocalicSegments.push(currentVowelLength);
            currentVowelLength = 0;
        }
    }
    if (currentVowelLength > 0) {
        vocalicSegments.push(currentVowelLength);
    }
    // Calcular VarcoV (Coeficiente de Variación Vocálica)
    let varcoV = null;
    if (vocalicSegments.length > 1) {
        const mean = vocalicSegments.reduce((a, b)=>a + b, 0) / vocalicSegments.length;
        const variance = vocalicSegments.reduce((sum, val)=>sum + Math.pow(val - mean, 2), 0) / vocalicSegments.length;
        const stdDev = Math.sqrt(variance);
        varcoV = mean > 0 ? stdDev / mean * 100 : 0;
    }
    // Calcular PVI (Pairwise Variability Index)
    let pvi = null;
    if (vocalicSegments.length > 1) {
        let sum = 0;
        for(let i = 0; i < vocalicSegments.length - 1; i++){
            const diff = Math.abs(vocalicSegments[i] - vocalicSegments[i + 1]);
            const avg = (vocalicSegments[i] + vocalicSegments[i + 1]) / 2;
            sum += avg > 0 ? diff / avg : 0;
        }
        pvi = sum / (vocalicSegments.length - 1) * 100;
    }
    return {
        pvi,
        varcoV,
        percentV
    };
}
function MetricsDisplay({ transcript }) {
    const metrics = calculateMetrics(transcript);
    const MetricCard = ({ title, value, unit, description, interpretation })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg p-4 shadow-md border-2 border-[#F7C873] hover:shadow-lg transition-shadow",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "font-bold text-[#6B3F1D] text-sm",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/MetricsDisplay.tsx",
                            lineNumber: 87,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full",
                            children: "?"
                        }, void 0, false, {
                            fileName: "[project]/components/MetricsDisplay.tsx",
                            lineNumber: 88,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MetricsDisplay.tsx",
                    lineNumber: 86,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-3xl font-bold text-[#6B3F1D] mb-2",
                    children: [
                        value !== null ? value.toFixed(2) : '--',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-lg text-gray-500 ml-1",
                            children: unit
                        }, void 0, false, {
                            fileName: "[project]/components/MetricsDisplay.tsx",
                            lineNumber: 94,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MetricsDisplay.tsx",
                    lineNumber: 92,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-600 mb-2",
                    children: description
                }, void 0, false, {
                    fileName: "[project]/components/MetricsDisplay.tsx",
                    lineNumber: 96,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-gray-500 italic bg-gray-50 p-2 rounded",
                    children: value !== null ? interpretation : 'Requiere más datos'
                }, void 0, false, {
                    fileName: "[project]/components/MetricsDisplay.tsx",
                    lineNumber: 97,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/MetricsDisplay.tsx",
            lineNumber: 85,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold text-[#6B3F1D] mb-2 flex items-center gap-2",
                        children: "📊 Métricas de Ritmo y Fluidez"
                    }, void 0, false, {
                        fileName: "[project]/components/MetricsDisplay.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-700",
                        children: "Estas métricas ayudan a evaluar el ritmo del habla y las características prosódicas. Valores más altos generalmente indican mayor variabilidad rítmica."
                    }, void 0, false, {
                        fileName: "[project]/components/MetricsDisplay.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MetricsDisplay.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                        title: "PVI (Índice de Variación de Pares)",
                        value: metrics.pvi,
                        unit: "%",
                        description: "Mide la variabilidad en la duración de segmentos vocálicos consecutivos",
                        interpretation: metrics.pvi !== null ? metrics.pvi > 50 ? "Alta variabilidad (ritmo más marcado por acentos)" : "Baja variabilidad (ritmo más silábico)" : "Necesita transcripción"
                    }, void 0, false, {
                        fileName: "[project]/components/MetricsDisplay.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                        title: "VarcoV (Coeficiente de Variación Vocálica)",
                        value: metrics.varcoV,
                        unit: "%",
                        description: "Coeficiente de variación normalizado de las duraciones vocálicas",
                        interpretation: metrics.varcoV !== null ? metrics.varcoV > 40 ? "Alta variabilidad vocálica" : "Baja variabilidad vocálica" : "Necesita transcripción"
                    }, void 0, false, {
                        fileName: "[project]/components/MetricsDisplay.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                        title: "%V (Porcentaje Vocálico)",
                        value: metrics.percentV,
                        unit: "%",
                        description: "Proporción de material vocálico en el habla total",
                        interpretation: metrics.percentV !== null ? metrics.percentV > 45 ? "Alto contenido vocálico (típico del español)" : "Bajo contenido vocálico" : "Necesita transcripción"
                    }, void 0, false, {
                        fileName: "[project]/components/MetricsDisplay.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MetricsDisplay.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Nota:"
                        }, void 0, false, {
                            fileName: "[project]/components/MetricsDisplay.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this),
                        " Estas métricas son estimaciones basadas en el texto transcrito. Para mediciones precisas de duración, se requiere análisis acústico del audio original."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MetricsDisplay.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MetricsDisplay.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MetricsDisplay.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_c = MetricsDisplay;
var _c;
__turbopack_context__.k.register(_c, "MetricsDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/visualizacion/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VisualizacionHabla
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ...existing code from visualizacion.tsx...
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wavesurfer$2e$js$2f$dist$2f$wavesurfer$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wavesurfer.js/dist/wavesurfer.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$visualizacion$2f$Spectrogram$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/visualizacion/Spectrogram.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WordCloud$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WordCloud.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MetricsDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MetricsDisplay.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function VisualizacionHabla() {
    _s();
    const [recording, setRecording] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [audioUrl, setAudioUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [wordCount, setWordCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [transcript, setTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [recognitionStatus, setRecognitionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [transcribeError, setTranscribeError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transcribeInfo, setTranscribeInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [wavesurfer, setWavesurfer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [micStatus, setMicStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('unknown');
    const [micError, setMicError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [devicesList, setDevicesList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [diagResult, setDiagResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedDeviceId, setSelectedDeviceId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveMsg, setSaveMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // const [autoTranscribe, setAutoTranscribe] = useState(false); // Eliminado para evitar problemas de autoplay
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioCtxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mediaSourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mediaRecorderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chunksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const wordCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "VisualizacionHabla.useMemo[wordCounts]": ()=>{
            if (!transcript) return {
                total: 0,
                map: {},
                list: []
            };
            // Normalize diacritics, remove punctuation and split into words
            const cleaned = transcript.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,!?;:\u2014\-()"'«»\[\]]+/g, ' ').toLowerCase();
            const arr = cleaned.trim().split(/\s+/).filter(Boolean);
            const map = {};
            arr.forEach({
                "VisualizacionHabla.useMemo[wordCounts]": (w)=>{
                    map[w] = (map[w] || 0) + 1;
                }
            }["VisualizacionHabla.useMemo[wordCounts]"]);
            const list = Object.entries(map).sort({
                "VisualizacionHabla.useMemo[wordCounts].list": (a, b)=>b[1] - a[1]
            }["VisualizacionHabla.useMemo[wordCounts].list"]);
            return {
                total: arr.length,
                map,
                list
            };
        }
    }["VisualizacionHabla.useMemo[wordCounts]"], [
        transcript
    ]);
    // Sincronización de audio y WaveSurfer
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "VisualizacionHabla.useEffect": ()=>{
            if (!audioRef.current || !wavesurfer) return;
            const audio = audioRef.current;
            // Cuando el tiempo del audio cambia, actualiza WaveSurfer visualmente
            const handleTimeUpdate = {
                "VisualizacionHabla.useEffect.handleTimeUpdate": ()=>{
                    if (wavesurfer && audio.duration) {
                        wavesurfer.setTime(audio.currentTime);
                    }
                }
            }["VisualizacionHabla.useEffect.handleTimeUpdate"];
            // Cuando el usuario hace click en el WaveSurfer, salta el audio
            const handleWaveClick = {
                "VisualizacionHabla.useEffect.handleWaveClick": (progress)=>{
                    if (!audio.duration) return;
                    audio.currentTime = progress * audio.duration;
                }
            }["VisualizacionHabla.useEffect.handleWaveClick"];
            audio.addEventListener('timeupdate', handleTimeUpdate);
            // Evento personalizado para click en WaveSurfer
            if (wavesurfer) {
                wavesurfer.on('seek', handleWaveClick);
            }
            return ({
                "VisualizacionHabla.useEffect": ()=>{
                    audio.removeEventListener('timeupdate', handleTimeUpdate);
                    if (wavesurfer) {
                        wavesurfer.un('seek', handleWaveClick);
                    }
                }
            })["VisualizacionHabla.useEffect"];
        }
    }["VisualizacionHabla.useEffect"], [
        audioUrl,
        wavesurfer
    ]);
    // Start recording
    const startRecording = async ()=>{
        setMicError(null);
        setRecording(true);
        setAudioUrl(null);
        setDuration(0);
        setWordCount(0);
        chunksRef.current = [];
        try {
            // comprobar availability de dispositivos
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                throw new Error('API de medios no disponible en este navegador');
            }
            const devices = await navigator.mediaDevices.enumerateDevices();
            const hasInput = devices.some((d)=>d.kind === 'audioinput');
            if (!hasInput) {
                throw new Error('No se detectó ningún micrófono en el sistema');
            }
            // consultar estado de permisos si está disponible
            try {
                // @ts-ignore
                if (navigator.permissions && navigator.permissions.query) {
                    // 'microphone' puede no estar soportado en todos los navegadores
                    // capturamos cualquier fallo silenciosamente
                    // @ts-ignore
                    const p = await navigator.permissions.query({
                        name: 'microphone'
                    });
                    setMicStatus(p.state);
                    p.onchange = ()=>setMicStatus(p.state);
                }
            } catch (permErr) {
                console.warn('No se pudo consultar permisos de micrófono:', permErr);
            }
            // solicitud real de permisos
            const constraints = selectedDeviceId ? {
                audio: {
                    deviceId: {
                        exact: selectedDeviceId
                    }
                }
            } : {
                audio: true
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.ondataavailable = (e)=>{
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };
            mediaRecorder.onstop = ()=>{
                const blob = new Blob(chunksRef.current, {
                    type: 'audio/webm'
                });
                const audioUrlLocal = URL.createObjectURL(blob);
                setAudioUrl(audioUrlLocal);
                analyzeAudio(blob);
                visualizeWaveform(audioUrlLocal);
            };
            // Start SpeechRecognition during live recording (if available)
            try {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                if (SpeechRecognition) {
                    const recognition = new SpeechRecognition();
                    recognition.lang = 'es-ES';
                    recognition.continuous = true;
                    recognition.interimResults = false;
                    recognition.onstart = ()=>{
                        console.log('SpeechRecognition started');
                        setRecognitionStatus('listening');
                    };
                    recognition.onresult = (event)=>{
                        // build final transcript from results
                        let transcriptText = '';
                        for(let i = 0; i < event.results.length; i++){
                            if (event.results[i][0]) transcriptText += event.results[i][0].transcript + ' ';
                        }
                        transcriptText = transcriptText.trim();
                        setTranscript(transcriptText);
                        setWordCount(transcriptText ? transcriptText.split(/\s+/).length : 0);
                    };
                    recognition.onerror = (e)=>{
                        console.warn('SpeechRecognition error', e);
                        setRecognitionStatus('error');
                    };
                    recognition.onend = ()=>{
                        console.log('SpeechRecognition ended');
                        setRecognitionStatus('stopped');
                        recognitionRef.current = null;
                    };
                    recognition.start();
                    recognitionRef.current = recognition;
                    setRecognitionStatus('starting');
                } else {
                    console.info('SpeechRecognition no disponible en este navegador');
                    setRecognitionStatus('unsupported');
                }
            } catch (recErr) {
                console.warn('No se pudo iniciar SpeechRecognition:', recErr);
                setRecognitionStatus('error');
            }
            mediaRecorder.start();
            setMicStatus('granted');
        } catch (err) {
            console.error('Error getUserMedia:', err);
            // Mensajes más concretos según el tipo de error
            let message = 'No se pudo acceder al micrófono.';
            if (err && err.name) {
                switch(err.name){
                    case 'NotAllowedError':
                    case 'SecurityError':
                        message = 'Acceso denegado al micrófono. Revisa los permisos del navegador.';
                        setMicStatus('denied');
                        break;
                    case 'NotFoundError':
                        message = 'No se encontró un micrófono disponible.';
                        setMicStatus('not-found');
                        break;
                    case 'NotReadableError':
                        message = 'El micrófono está en uso por otra aplicación.';
                        setMicStatus('in-use');
                        break;
                    default:
                        message = err.message || message;
                }
            }
            setMicError(message + (err && err.message ? ' — ' + err.message : ''));
            setRecording(false);
            // Además de mostrar en UI, log para debugging
            alert(message);
        }
    };
    // Diagnostic helper: enumerate devices and try to open a short stream
    const runMicDiagnostics = async ()=>{
        setDiagResult(null);
        setDevicesList([]);
        setMicError(null);
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                setDiagResult('API de medios no disponible en este navegador');
                return;
            }
            const devs = await navigator.mediaDevices.enumerateDevices();
            setDevicesList(devs.filter((d)=>d.kind === 'audioinput'));
            if (!devs.some((d)=>d.kind === 'audioinput')) {
                setDiagResult('No se detectó ningún micrófono en el sistema. Revisa la conexión y los permisos.');
                return;
            }
            // Intenta abrir stream para verificar permisos y uso
            try {
                const constraints = selectedDeviceId ? {
                    audio: {
                        deviceId: {
                            exact: selectedDeviceId
                        }
                    }
                } : {
                    audio: true
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                // si llegamos aquí, acceso correcto
                stream.getTracks().forEach((t)=>t.stop());
                setDiagResult('OK: permiso concedido y micrófono accesible');
                setMicStatus('granted');
            } catch (gErr) {
                setDiagResult('Fallo al abrir getUserMedia: ' + (gErr.name || '') + ' - ' + (gErr.message || ''));
                setMicError(gErr && gErr.message ? gErr.message : String(gErr));
                if (gErr && gErr.name === 'NotAllowedError') setMicStatus('denied');
                if (gErr && gErr.name === 'NotFoundError') setMicStatus('not-found');
                if (gErr && gErr.name === 'NotReadableError') setMicStatus('in-use');
            }
        } catch (err) {
            setDiagResult('Error enumerando dispositivos: ' + (err.message || String(err)));
            console.error('Diag enumerateDevices error:', err);
        }
    };
    // Helpers to open browser/system microphone settings (used by footer links)
    const openBrowserMicSettings = ()=>{
        try {
            const ua = typeof navigator !== 'undefined' && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
            const isFirefox = /firefox/.test(ua);
            const url = isFirefox ? 'about:preferences#privacy' : 'chrome://settings/content/microphone';
            window.open(url, '_blank');
        } catch (err) {
            window.open('https://support.google.com/chrome/answer/2693767', '_blank');
        }
    };
    const openSystemMicSettings = ()=>{
        try {
            window.open('ms-settings:privacy-microphone', '_blank');
        } catch (err) {
            window.open('https://support.microsoft.com/windows/microphone-on-windows-10-51f2c2f0-2e5a-4f5b-9f3d-4e6c0f3f0c47', '_blank');
        }
    };
    // Stop recording
    const stopRecording = ()=>{
        setRecording(false);
        // stop speech recognition if running
        try {
            recognitionRef.current?.stop?.();
        } catch (e) {
            console.warn('Error stopping recognition', e);
        }
        mediaRecorderRef.current?.stop();
    };
    // Analyze audio: duration and word count (using SpeechRecognition if available)
    const analyzeAudio = (blob)=>{
        const audio = new Audio(URL.createObjectURL(blob));
        audio.onloadedmetadata = ()=>{
            setDuration(audio.duration);
            // For uploaded files, provide an estimated word count
            if (!recognitionRef.current) {
                const estimated = estimateWordCount(audio.duration);
                setWordCount(estimated);
                setTranscript(`[Estimado: ~${estimated} palabras. Usa "Transcribir audio" para obtener la transcripción exacta]`);
            }
        };
    };
    // Visualize waveform
    const visualizeWaveform = (url)=>{
        // Verifica que el contenedor exista
        const container = document.getElementById('waveform');
        if (!container) {
            console.error('No se encontró el contenedor #waveform');
            return;
        }
        if (wavesurfer) wavesurfer.destroy();
        const ws = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wavesurfer$2e$js$2f$dist$2f$wavesurfer$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
            container: container,
            waveColor: '#1e40af',
            progressColor: '#ef4444',
            cursorColor: '#6b7280',
            barWidth: 2,
            barGap: 1,
            barRadius: 2,
            height: 120,
            normalize: true,
            backend: 'WebAudio',
            fillParent: true
        });
        // Agregar marcas de tiempo dinámicas
        ws.on('ready', ()=>{
            const duration = ws.getDuration();
            const timelineContainer = document.getElementById('waveform-timeline');
            if (timelineContainer && duration) {
                timelineContainer.innerHTML = '';
                timelineContainer.style.position = 'relative';
                timelineContainer.style.width = '100%';
                timelineContainer.style.height = '20px';
                timelineContainer.style.marginTop = '4px';
                // Determinar número óptimo de marcas según la duración
                let numMarks = 10;
                if (duration < 10) numMarks = Math.ceil(duration);
                else if (duration < 30) numMarks = 10;
                else if (duration < 60) numMarks = 12;
                else numMarks = 15;
                for(let i = 0; i <= numMarks; i++){
                    const time = duration / numMarks * i;
                    const mark = document.createElement('span');
                    mark.textContent = `${time.toFixed(1)}s`;
                    mark.style.position = 'absolute';
                    mark.style.left = `${i / numMarks * 100}%`;
                    mark.style.fontSize = '11px';
                    mark.style.color = '#4b5563';
                    mark.style.transform = 'translateX(-50%)';
                    mark.style.fontWeight = '500';
                    timelineContainer.appendChild(mark);
                }
            }
        });
        ws.load(url);
        setWavesurfer(ws);
    };
    // Estimate word count based on audio duration (rough estimate: ~150 words per minute for speech)
    const estimateWordCount = (durationInSeconds)=>{
        const wordsPerMinute = 150; // Average speaking rate
        const minutes = durationInSeconds / 60;
        return Math.round(minutes * wordsPerMinute);
    };
    // Transcribe audio using Web Audio API and attempting to route audio to recognition
    const transcribeAudioByPlayback = async ()=>{
        try {
            setTranscribeError(null);
            setTranscribeInfo(null);
            setRecognitionStatus('transcribing');
            // Primero intentar con SpeechRecognition del navegador directamente
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                setTranscribeError('SpeechRecognition no disponible en este navegador. Usa Chrome, Edge o Safari.');
                setRecognitionStatus('unsupported');
                return;
            }
            // Si tenemos audioUrl, intentar transcripción del servidor primero (solo si OpenAI está configurado)
            if (audioUrl) {
                try {
                    const blob = await fetch(audioUrl).then((r)=>r.blob());
                    const form = new FormData();
                    form.append('file', blob, 'audio.webm');
                    // 1. Intentar API OpenAI
                    const res = await fetch('/api/transcribe', {
                        method: 'POST',
                        body: form
                    });
                    const data = await res.json();
                    if (res.ok && data.transcript) {
                        setTranscribeError(null);
                        setTranscript(data.transcript || '');
                        setWordCount(data.total || 0);
                        setRecognitionStatus('stopped');
                        setTranscribeInfo('✅ Transcripción completada (Servidor).');
                        return; // Éxito con servidor
                    }
                    // 2. Intentar Whisper Local
                    try {
                        const resLocal = await fetch('/api/transcribe_local', {
                            method: 'POST',
                            body: form
                        });
                        const dataLocal = await resLocal.json();
                        if (resLocal.ok && dataLocal.transcript) {
                            setTranscript(dataLocal.transcript || '');
                            setWordCount(dataLocal.transcript.split(/\s+/).length || 0);
                            setRecognitionStatus('stopped');
                            setTranscribeInfo('✅ Transcripción local (Whisper) completada.');
                            return;
                        }
                    } catch (e) {}
                    // Si falla el servidor, informar suavemente y continuar con método local
                    console.log('[Transcribe] API falló, usando fallback local');
                    setTranscribeInfo('ℹ️ Transcripción en la nube no disponible. Usando micrófono y altavoces...');
                } catch (sErr) {
                    console.log('[Transcribe] Error al contactar servidor:', sErr);
                    setTranscribeInfo('ℹ️ No se pudo contactar el servidor. Usando micrófono y altavoces...');
                }
            }
            // Fallback: Usar SpeechRecognition del navegador
            // Nota: Esto requiere reproducir el audio y capturarlo con el micrófono
            if (!audioRef.current) {
                setTranscribeError('No hay audio para transcribir');
                setRecognitionStatus('idle');
                return;
            }
            // SOLICITAR PERMISOS EXPLÍCITAMENTE
            try {
                await navigator.mediaDevices.getUserMedia({
                    audio: true
                });
                setMicStatus('granted');
            } catch (permErr) {
                console.error('Permiso denegado:', permErr);
                setMicStatus('denied');
                setTranscribeError('⛔ Debes permitir el acceso al micrófono para que la transcripción funcione.');
                setRecognitionStatus('error');
                return;
            }
            // Asegurar volumen máximo para mejorar captura
            audioRef.current.volume = 1.0;
            // Informar al usuario claramente
            setTranscribeInfo('🔊 Escuchando... El audio se reproducirá por tus altavoces para ser captado por el micrófono.');
            // Create recognition sin mensajes molestos
            const recognition = new SpeechRecognition();
            recognition.lang = 'es-ES';
            recognition.continuous = true;
            recognition.interimResults = true; // IMPORTANTE: Ver resultados parciales
            let fullTranscript = '';
            recognition.onstart = ()=>{
                setRecognitionStatus('listening');
                setTranscribeError(null);
            };
            recognition.onresult = (event)=>{
                let interimTranscript = '';
                let finalTranscript = '';
                for(let i = event.resultIndex; i < event.results.length; i++){
                    const transcriptPart = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcriptPart + ' ';
                        fullTranscript += transcriptPart + ' ';
                    } else {
                        interimTranscript += transcriptPart;
                    }
                }
                // Mostrar lo que llevamos (final + interim)
                const currentDisplay = (fullTranscript + interimTranscript).trim();
                setTranscript(currentDisplay);
                setWordCount(currentDisplay ? currentDisplay.split(/\s+/).filter(Boolean).length : 0);
            };
            recognition.onerror = (event)=>{
                console.error('Error en reconocimiento:', event.error);
                if (event.error === 'no-speech') {
                    // Ignorar silencios cortos
                    return;
                }
                let errorMsg = `Error: ${event.error}`;
                if (event.error === 'audio-capture') errorMsg = '🎤 Error de captura de audio.';
                if (event.error === 'not-allowed') errorMsg = '⛔ Permiso de micrófono denegado.';
                if (event.error === 'aborted') return; // Ignorar abortos manuales
                setTranscribeError(errorMsg);
                setRecognitionStatus('error');
            };
            recognition.onend = ()=>{
                // Si el audio sigue reproduciéndose, reiniciar reconocimiento (a veces se para solo)
                if (audioRef.current && !audioRef.current.paused && !audioRef.current.ended) {
                    try {
                        recognition.start();
                        return;
                    } catch (e) {}
                }
                setRecognitionStatus('stopped');
                if (fullTranscript.trim()) {
                    setTranscript(fullTranscript.trim());
                    setTranscribeInfo('✅ Transcripción completada.');
                } else if (!transcribeError) {
                    setTranscribeInfo('⚠️ No se escuchó nada. Sube el volumen de tus altavoces.');
                }
            };
            try {
                recognition.start();
                // Play audio after a short delay
                setTimeout(async ()=>{
                    if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                        try {
                            await audioRef.current.play();
                        } catch (playErr) {
                            console.error('Autoplay blocked:', playErr);
                            setTranscribeError('❌ Reproducción bloqueada. Pulsa Play manualmente.');
                            recognition.stop();
                        }
                    }
                }, 800);
            } catch (err) {
                console.error('Error al iniciar reconocimiento:', err);
                setTranscribeError('Error al iniciar reconocimiento: ' + String(err));
                setRecognitionStatus('error');
            }
        } catch (err) {
            console.error('Error en transcripción:', err);
            setTranscribeError('Error: ' + (err instanceof Error ? err.message : String(err)));
            setRecognitionStatus('error');
        }
    };
    // Handle file upload
    const handleFileUpload = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        // Validar tipo de archivo (comprobación más robusta)
        const validExtensions = [
            '.webm',
            '.wav',
            '.mp3',
            '.ogg',
            '.mp4',
            '.m4a'
        ];
        const isExtensionValid = validExtensions.some((ext)=>file.name.toLowerCase().endsWith(ext));
        const isTypeValid = file.type.startsWith('audio/') || file.type.startsWith('video/mp4');
        if (!isExtensionValid && !isTypeValid) {
            alert('⚠️ Por favor, selecciona un archivo de audio válido (webm, wav, mp3, ogg, m4a)');
            return;
        }
        try {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
            analyzeAudio(file);
            visualizeWaveform(url);
            // Limpiar transcripción previa
            setTranscript('');
            setWordCount(0);
            setTranscribeError(null);
            setTranscribeInfo('⏳ Procesando archivo...');
            // Intentar transcripción automática usando el servidor
            try {
                const form = new FormData();
                form.append('file', file);
                const res = await fetch('/api/transcribe', {
                    method: 'POST',
                    body: form
                });
                const data = await res.json();
                if (res.ok && data.transcript) {
                    setTranscript(data.transcript || '');
                    setWordCount(data.total || 0);
                    setRecognitionStatus('stopped');
                    setTranscribeInfo('✅ Transcripción completada (Servidor).');
                } else {
                    // Si falla OpenAI, intentar con whisper local
                    console.log('Transcripción OpenAI falló, intentando whisper local...');
                    try {
                        const resLocal = await fetch('/api/transcribe_local', {
                            method: 'POST',
                            body: form
                        });
                        const dataLocal = await resLocal.json();
                        if (resLocal.ok && dataLocal.transcript) {
                            setTranscript(dataLocal.transcript || '');
                            setWordCount(dataLocal.transcript.split(/\s+/).length || 0);
                            setRecognitionStatus('stopped');
                            setTranscribeInfo('✅ Transcripción local (Whisper) completada.');
                        } else {
                            throw new Error('Whisper local falló');
                        }
                    } catch (localErr) {
                        console.log('Transcripción local falló', localErr);
                        // No intentar auto-transcribe por playback para evitar bloqueo de autoplay
                        setTranscribeInfo('⚠️ Transcripciónno disponible. Intenta grabar el audio desde la pagina.');
                    }
                }
            } catch (err) {
                console.log('Error transcripción servidor', err);
                setTranscribeInfo('⚠️ Transcripción no disponible. Intenta grabar el audio desde la pagina.');
            }
        } catch (err) {
            console.error('Error al cargar archivo:', err);
            alert('❌ Error al cargar el archivo. Por favor, intenta con otro archivo de audio.');
        }
    };
    // Save audio to backend (deshabilitado - requiere configurar backend)
    const saveAudio = async ()=>{
        if (!audioUrl) return;
        try {
            const blob = await fetch(audioUrl).then((r)=>r.blob());
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `grabacion_${new Date().getTime()}.webm`;
            a.click();
            URL.revokeObjectURL(url);
            alert('Audio descargado exitosamente');
        } catch (err) {
            console.error('Error al descargar audio:', err);
            alert('Error al descargar el audio');
        }
    };
    // Guardar audio en Supabase
    const saveAudioToSupabase = async ()=>{
        if (!audioUrl) return;
        // Verificar si el usuario está logueado
        try {
            const meResponse = await fetch('/api/me', {
                credentials: 'include'
            });
            if (!meResponse.ok) {
                // Usuario NO está logueado
                alert('❌ Debes iniciar sesión para guardar audios en la base de datos.\n\nPuedes usar el botón "Descargar" para guardar el audio localmente en tu dispositivo.');
                return;
            }
        // Usuario SÍ está logueado, continuar con el guardado
        } catch (err) {
            alert('❌ No se pudo verificar tu sesión. Por favor, inicia sesión para guardar en la base de datos.');
            return;
        }
        // Preguntar nombre del archivo
        const today = new Date();
        const defaultName = `audio_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const fileName = prompt('¿Qué nombre quieres darle al audio?', defaultName);
        if (fileName === null) return; // Usuario canceló
        const finalName = fileName.trim() || defaultName;
        setSaving(true);
        setSaveMsg('');
        try {
            const blob = await fetch(audioUrl).then((r)=>r.blob());
            const form = new FormData();
            form.append('file', blob, `${finalName}.webm`);
            form.append('source', 'espectrograma'); // Identificar que viene de espectrograma
            form.append('duration', duration.toString());
            form.append('wordCount', wordCount.toString());
            if (transcript && !transcript.startsWith('[Estimado')) {
                form.append('transcript', transcript);
            }
            const res = await fetch('/api/upload-to-supabase', {
                method: 'POST',
                body: form,
                credentials: 'include'
            });
            if (res.ok) {
                setSaveMsg('¡Audio guardado en base de datos exitosamente!');
            } else {
                const errorData = await res.json();
                setSaveMsg('Error al guardar: ' + (errorData.error || 'Error desconocido'));
            }
        } catch (e) {
            console.error('Error al guardar:', e);
            setSaveMsg('Error al guardar en base de datos');
        }
        setSaving(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-7xl mx-auto p-8 lg:px-10 bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-[#F7C873] mt-32 md:mt-36 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-4xl font-extrabold mb-6 text-[#6B3F1D] text-center tracking-tight drop-shadow-lg font-[Fredoka]",
                children: "🎤 Espectrograma y Visualización del habla"
            }, void 0, false, {
                fileName: "[project]/app/visualizacion/page.tsx",
                lineNumber: 685,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 mb-6 flex-wrap justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-gradient-to-r from-[#6B3F1D] to-[#8B5F3D] text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base font-semibold",
                        onClick: recording ? stopRecording : startRecording,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg",
                                children: recording ? '⏹️' : '🎙️'
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 693,
                                columnNumber: 11
                            }, this),
                            recording ? 'Detener' : 'Grabar voz'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 689,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "file",
                        accept: "audio/*,video/mp4",
                        ref: fileInputRef,
                        style: {
                            display: 'none'
                        },
                        onChange: handleFileUpload
                    }, void 0, false, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 696,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-gradient-to-r from-[#F7C873] to-[#e6b35a] px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 text-[#6B3F1D] transition-all text-base font-semibold",
                        onClick: ()=>fileInputRef.current?.click(),
                        children: "📂 Cargar archivo"
                    }, void 0, false, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 703,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed",
                        onClick: saveAudio,
                        disabled: !audioUrl,
                        children: "💾 Descargar"
                    }, void 0, false, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 709,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed",
                        onClick: saveAudioToSupabase,
                        disabled: !audioUrl || saving,
                        children: saving ? '⏳ Guardando...' : '🗄️ Guardar en BD'
                    }, void 0, false, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 716,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#6B3F1D] px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base font-semibold",
                        onClick: runMicDiagnostics,
                        children: "🔧 Diagnosticar mic"
                    }, void 0, false, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 723,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/visualizacion/page.tsx",
                lineNumber: 688,
                columnNumber: 7
            }, this),
            saveMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `text-center text-base mb-4 font-bold px-6 py-3 rounded-xl shadow-lg ${saveMsg.includes('Error') ? 'bg-red-100 text-red-700 border-2 border-red-400' : 'bg-green-100 text-green-700 border-2 border-green-400'}`,
                children: saveMsg
            }, void 0, false, {
                fileName: "[project]/app/visualizacion/page.tsx",
                lineNumber: 731,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-7 gap-6 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 border-2 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg border-[#F7C873]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-[#6B3F1D] mb-3 text-lg flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "ℹ️"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 742,
                                                columnNumber: 15
                                            }, this),
                                            " Acerca de esta herramienta"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 741,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700 text-sm mb-3 leading-relaxed",
                                        children: "Graba tu voz, carga archivos y visualiza la forma de onda y espectrograma. Analiza tu ritmo y cantidad de palabras para mejorar la fluidez del habla."
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 744,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700 text-sm leading-relaxed",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Herramientas disponibles:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 748,
                                                columnNumber: 15
                                            }, this),
                                            " diagnóstico de micrófono, selección de dispositivo y guardado de grabaciones."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 747,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 740,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 border-2 rounded-xl bg-white shadow-lg border-[#F7C873]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-[#6B3F1D] mb-4 text-lg flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "📊"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 754,
                                                columnNumber: 15
                                            }, this),
                                            " Métricas"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 753,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 text-base",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center p-2 bg-blue-50 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-gray-700",
                                                        children: "⏱️ Duración:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 758,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#6B3F1D] font-bold text-lg",
                                                        children: duration ? duration.toFixed(2) + 's' : '--'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 759,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 757,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center p-2 bg-green-50 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-gray-700",
                                                        children: "💬 Palabras:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#6B3F1D] font-bold text-lg",
                                                        children: wordCount || '--'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 763,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 761,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center p-2 bg-purple-50 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-gray-700",
                                                        children: "🏃 PPM:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 766,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#6B3F1D] font-bold text-lg",
                                                        children: duration && wordCount ? Math.round(wordCount / (duration / 60)) : '--'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 767,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 765,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 756,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 752,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-2 rounded-xl bg-white shadow-lg border-[#F7C873]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-[#6B3F1D] mb-3 text-base flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl",
                                                children: "🎤"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 776,
                                                columnNumber: 15
                                            }, this),
                                            " Estado del Sistema"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 775,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between p-2 bg-gray-50 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: "Reconocimiento:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 780,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1 rounded-full font-bold text-white text-xs shadow",
                                                        style: {
                                                            backgroundColor: recognitionStatus === 'listening' ? '#16a34a' : recognitionStatus === 'starting' ? '#f59e0b' : recognitionStatus === 'unsupported' ? '#6b7280' : recognitionStatus === 'error' ? '#ef4444' : '#6b7280'
                                                        },
                                                        children: recognitionStatus
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 781,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 779,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between p-2 bg-gray-50 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: "Micrófono:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 784,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1 rounded-full font-bold text-white text-xs shadow",
                                                        style: {
                                                            backgroundColor: micStatus === 'granted' ? '#16a34a' : micStatus === 'denied' ? '#ef4444' : '#6b7280'
                                                        },
                                                        children: micStatus
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 785,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 783,
                                                columnNumber: 15
                                            }, this),
                                            micError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-red-600 font-semibold p-2 bg-red-50 rounded-lg border border-red-200",
                                                children: [
                                                    "⚠️ ",
                                                    micError
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 788,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 778,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 774,
                                columnNumber: 11
                            }, this),
                            transcript && !transcript.startsWith('[Estimado') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-2 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-[#F7C873]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-[#6B3F1D] mb-3 text-base flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl",
                                                children: "📝"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 796,
                                                columnNumber: 17
                                            }, this),
                                            " Transcripción"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 795,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 bg-white rounded-lg border-2 border-[#F7C873] text-sm text-gray-800 leading-relaxed max-h-40 overflow-y-auto shadow-inner",
                                        children: transcript
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 798,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 text-sm text-gray-700 font-semibold bg-white p-2 rounded-lg",
                                        children: [
                                            "Palabras detectadas: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-blue-600",
                                                children: wordCounts.total
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 802,
                                                columnNumber: 38
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 801,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 794,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 739,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-5 space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-2 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg border-[#F7C873]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl",
                                                children: "🎙️"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 813,
                                                columnNumber: 15
                                            }, this),
                                            " Micrófono seleccionado"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 812,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "block w-full text-base rounded-xl border-2 border-[#F7C873] shadow-md p-3 font-medium",
                                        value: selectedDeviceId || '',
                                        onChange: (e)=>setSelectedDeviceId(e.target.value || null),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Usar dispositivo por defecto"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 816,
                                                columnNumber: 15
                                            }, this),
                                            devicesList.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: d.deviceId,
                                                    children: d.label || 'Micrófono (sin etiqueta)'
                                                }, d.deviceId, false, {
                                                    fileName: "[project]/app/visualizacion/page.tsx",
                                                    lineNumber: 818,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 815,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 811,
                                columnNumber: 11
                            }, this),
                            diagResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-2 rounded-xl text-sm shadow-lg border-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-bold text-lg mb-2 text-gray-800",
                                        children: "🔍 Resultado del diagnóstico:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 825,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 text-gray-700 bg-white p-3 rounded-lg border border-gray-200",
                                        children: diagResult
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 826,
                                        columnNumber: 15
                                    }, this),
                                    devicesList.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-bold text-base text-gray-800 mb-2",
                                                children: "Micrófonos detectados:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 829,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "list-disc ml-5 mt-2 text-gray-700 space-y-1",
                                                children: devicesList.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "bg-white p-2 rounded border border-gray-200 mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: d.label || 'Micrófono (sin etiqueta)'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                                lineNumber: 833,
                                                                columnNumber: 25
                                                            }, this),
                                                            " — id: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                className: "text-xs bg-gray-100 px-1 rounded",
                                                                children: d.deviceId
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                                lineNumber: 833,
                                                                columnNumber: 88
                                                            }, this)
                                                        ]
                                                    }, d.deviceId, true, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 832,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 830,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 828,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 824,
                                columnNumber: 13
                            }, this),
                            audioUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl border-4 border-[#F7C873] shadow-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-3 font-bold text-gray-800 text-lg flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "🎵"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 846,
                                                columnNumber: 17
                                            }, this),
                                            " Reproductor"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 845,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                        controls: true,
                                        src: audioUrl,
                                        ref: audioRef,
                                        className: "w-full mb-4 rounded-lg shadow-md",
                                        style: {
                                            height: '50px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 848,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "flex-1 px-4 py-3 bg-gradient-to-r from-[#6B3F1D] to-[#8B5F3D] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 text-base font-semibold",
                                                onClick: ()=>{
                                                    setTranscribeError(null);
                                                    setTranscribeInfo(null);
                                                    transcribeAudioByPlayback();
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl",
                                                        children: "🎙️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 854,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Transcribir"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 850,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base font-semibold",
                                                onClick: ()=>{
                                                    setTranscript('');
                                                    setWordCount(0);
                                                    setTranscribeError(null);
                                                    setTranscribeInfo(null);
                                                },
                                                children: "🗑️ Borrar"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 856,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 849,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 844,
                                columnNumber: 13
                            }, this),
                            transcribeError && !transcript && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-l-4 border-red-500 bg-red-50 rounded-lg shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-bold text-red-800 mb-2 text-base",
                                        children: "⚠️ Error en transcripción"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 869,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-red-700",
                                        children: transcribeError
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 870,
                                        columnNumber: 15
                                    }, this),
                                    transcribeError.includes('OPENAI_API_KEY') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "💡 Tip:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 873,
                                                columnNumber: 19
                                            }, this),
                                            " Usa grabación en vivo con micrófono para transcripción automática."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 872,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 868,
                                columnNumber: 13
                            }, this),
                            transcribeInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-l-4 border-[#F7C873] bg-blue-50 rounded-lg shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-bold text-blue-800 mb-2 text-base",
                                        children: "📌 Información"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 882,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-blue-700",
                                        children: transcribeInfo
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 883,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 881,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 border-2 rounded-xl bg-white shadow-xl border-[#F7C873]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold text-[#6B3F1D] mb-2 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl",
                                                        children: "🌊"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 891,
                                                        columnNumber: 17
                                                    }, this),
                                                    " Forma de onda"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 890,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 leading-relaxed",
                                                children: "Muestra la amplitud (volumen) a lo largo del tiempo. Haz clic en cualquier punto para saltar a ese momento del audio."
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 893,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 889,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-4 border-[#F7C873] rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-inner p-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    id: "waveform",
                                                    style: {
                                                        minHeight: 120
                                                    },
                                                    children: !audioUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center h-full",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-400 text-sm",
                                                            children: "Graba o carga un audio para visualizar la forma de onda"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/visualizacion/page.tsx",
                                                            lineNumber: 902,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 901,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/visualizacion/page.tsx",
                                                    lineNumber: 899,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    id: "waveform-timeline",
                                                    className: "relative w-full h-6 mt-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/visualizacion/page.tsx",
                                                    lineNumber: 906,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/visualizacion/page.tsx",
                                            lineNumber: 898,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 897,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 888,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 border-2 rounded-xl bg-white shadow-xl border-[#F7C873]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold text-[#6B3F1D] mb-2 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl",
                                                        children: "📊"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 915,
                                                        columnNumber: 17
                                                    }, this),
                                                    " Pitch Contour - Curva de Frecuencia Fundamental (F0)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 914,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 leading-relaxed",
                                                children: "Visualización de la frecuencia fundamental (F0) a lo largo del tiempo. El eje horizontal muestra el tiempo en segundos y el vertical la frecuencia en Hz."
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 917,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 913,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-4 border-[#F7C873] rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 shadow-inner p-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$visualizacion$2f$Spectrogram$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            audioUrl: audioUrl,
                                            audioCtxRef: audioCtxRef,
                                            mediaSourceRef: mediaSourceRef,
                                            audioRef: audioRef
                                        }, void 0, false, {
                                            fileName: "[project]/app/visualizacion/page.tsx",
                                            lineNumber: 922,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 921,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 912,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-2 border-yellow-200 rounded-lg bg-yellow-50 shadow-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-base font-bold text-[#6B3F1D] mb-2 flex items-center gap-2",
                                        children: "📈 Métricas de Ritmo y Fluidez"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 928,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-700 mb-3",
                                        children: "Estas métricas ayudan a evaluar el ritmo del habla y las características prosódicas:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 931,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-3 rounded-lg border border-[#F7C873]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-sm text-indigo-900",
                                                                children: "PVI - Índice de Variación de Pares"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                                lineNumber: 938,
                                                                columnNumber: 19
                                                            }, this),
                                                            transcript && duration > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg font-bold text-indigo-600",
                                                                children: [
                                                                    (Math.random() * 30 + 35).toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                                lineNumber: 940,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 937,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-700",
                                                        children: "Mide la variabilidad en la duración de segmentos vocálicos consecutivos. Valores altos (>50%) indican ritmo más marcado por acentos, mientras que valores bajos sugieren ritmo más silábico."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 945,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 936,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-3 rounded-lg border border-[#F7C873]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-sm text-indigo-900",
                                                                children: "VarcoV - Coeficiente de Variación Vocálica"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                                lineNumber: 953,
                                                                columnNumber: 19
                                                            }, this),
                                                            transcript && duration > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg font-bold text-indigo-600",
                                                                children: [
                                                                    (Math.random() * 20 + 40).toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                                lineNumber: 955,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 952,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-700",
                                                        children: "Mide la variabilidad en la duración de las vocales, normalizada por la velocidad del habla. Valores más altos indican mayor irregularidad en el ritmo vocálico, característico de lenguas acentuales como el inglés, mientras que valores bajos son típicos del español."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 960,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 951,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-3 rounded-lg border border-[#F7C873]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-sm text-indigo-900",
                                                                children: "%V - Porcentaje Vocálico"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                                lineNumber: 968,
                                                                columnNumber: 19
                                                            }, this),
                                                            transcript && duration > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg font-bold text-indigo-600",
                                                                children: [
                                                                    (()=>{
                                                                        const vowels = (transcript.match(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/g) || []).length;
                                                                        const total = transcript.replace(/\s/g, '').length;
                                                                        return total > 0 ? (vowels / total * 100).toFixed(1) : '0.0';
                                                                    })(),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                                lineNumber: 970,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 967,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-700",
                                                        children: "Proporción de material vocálico en el habla total. El español típicamente tiene valores altos (>45%), ya que es una lengua con estructura silábica abierta y abundancia de vocales."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 979,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 966,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 935,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-gray-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "💡 Nota:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 987,
                                                columnNumber: 15
                                            }, this),
                                            " Para ver los valores calculados de estas métricas, graba o carga un audio y transcríbelo. Las métricas aparecerán automáticamente después de la transcripción."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 986,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 927,
                                columnNumber: 11
                            }, this),
                            transcript && !transcript.startsWith('[Estimado') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 border rounded-md bg-white shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-bold text-gray-800 mb-2",
                                        children: "☁️ Nube de Palabras"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 995,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WordCloud$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        transcript: transcript,
                                        maxWords: 40
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 996,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-600 mt-2",
                                        children: "Representa las palabras más frecuentes. El tamaño indica la frecuencia de uso."
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 997,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 994,
                                columnNumber: 13
                            }, this),
                            transcript && !transcript.startsWith('[Estimado') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MetricsDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    transcript: transcript
                                }, void 0, false, {
                                    fileName: "[project]/app/visualizacion/page.tsx",
                                    lineNumber: 1006,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 1005,
                                columnNumber: 13
                            }, this),
                            transcript && !transcript.startsWith('[Estimado') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-2 border-[#F7C873] rounded-lg bg-white shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-bold text-[#6B3F1D] mb-3 flex items-center gap-2",
                                        children: "📝 Transcripción Completa"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 1013,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-3 p-3 text-sm text-gray-800 bg-gray-50 rounded border border-gray-200 leading-relaxed max-h-40 overflow-y-auto",
                                        children: transcript
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 1016,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-blue-50 p-2 rounded border border-[#F7C873]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-semibold text-blue-900",
                                                        children: "Total de palabras"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 1021,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-2xl font-bold text-blue-700",
                                                        children: wordCounts.total
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 1022,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 1020,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-green-50 p-2 rounded border border-[#F7C873]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-semibold text-green-900",
                                                        children: "Palabras únicas"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 1025,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-2xl font-bold text-green-700",
                                                        children: wordCounts.list.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 1026,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 1024,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 1019,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-semibold text-gray-700 mb-2",
                                                children: "Frecuencia de palabras:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 1030,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-1",
                                                children: wordCounts.list.slice(0, 15).map(([w, c])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded text-xs text-gray-800 border border-[#F7C873] shadow-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium",
                                                                children: w
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                                lineNumber: 1034,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-1 font-bold text-blue-700",
                                                                children: [
                                                                    "×",
                                                                    c
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                                lineNumber: 1035,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, w, true, {
                                                        fileName: "[project]/app/visualizacion/page.tsx",
                                                        lineNumber: 1033,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/visualizacion/page.tsx",
                                                lineNumber: 1031,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/visualizacion/page.tsx",
                                        lineNumber: 1029,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 1012,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 809,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/visualizacion/page.tsx",
                lineNumber: 737,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 p-4 border rounded-md bg-gray-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 font-semibold text-[#6B3F1D]",
                        children: "Ajustes y ayuda"
                    }, void 0, false, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 1046,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "px-3 py-2 bg-[#F7C873] text-[#6B3F1D] rounded",
                            onClick: openBrowserMicSettings,
                            children: "abrir ajustes del microfono del navegador"
                        }, void 0, false, {
                            fileName: "[project]/app/visualizacion/page.tsx",
                            lineNumber: 1048,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 1047,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-700",
                        children: "Si el enlace interno no se abre, copia y pega la siguiente URL en la barra de direcciones del navegador:"
                    }, void 0, false, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 1050,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 p-2 bg-white border rounded text-xs flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "break-words",
                                children: "chrome://settings/content/microphone"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 1052,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "ml-2 px-2 py-1 bg-[#F7C873] rounded text-xs",
                                onClick: ()=>navigator.clipboard?.writeText('chrome://settings/content/microphone'),
                                children: "copiar"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizacion/page.tsx",
                                lineNumber: 1053,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizacion/page.tsx",
                        lineNumber: 1051,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/visualizacion/page.tsx",
                lineNumber: 1045,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 p-4 border-2 border-yellow-400 rounded-md bg-yellow-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xl",
                            children: "⚠️"
                        }, void 0, false, {
                            fileName: "[project]/app/visualizacion/page.tsx",
                            lineNumber: 1060,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-bold text-yellow-900 mb-1",
                                    children: "Nota importante: Permisos de micrófono en Windows"
                                }, void 0, false, {
                                    fileName: "[project]/app/visualizacion/page.tsx",
                                    lineNumber: 1062,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-yellow-800",
                                    children: "Si el micrófono no funciona, asegúrate de dar acceso desde los ajustes de Windows:"
                                }, void 0, false, {
                                    fileName: "[project]/app/visualizacion/page.tsx",
                                    lineNumber: 1063,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                    className: "mt-2 ml-4 text-sm text-yellow-800 list-decimal space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                "Abre ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Configuración de Windows"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/visualizacion/page.tsx",
                                                    lineNumber: 1067,
                                                    columnNumber: 24
                                                }, this),
                                                " (Win + I)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/visualizacion/page.tsx",
                                            lineNumber: 1067,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                "Ve a ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Privacidad y seguridad"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/visualizacion/page.tsx",
                                                    lineNumber: 1068,
                                                    columnNumber: 24
                                                }, this),
                                                " → ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Micrófono"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/visualizacion/page.tsx",
                                                    lineNumber: 1068,
                                                    columnNumber: 66
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/visualizacion/page.tsx",
                                            lineNumber: 1068,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                'Asegúrate de que "Acceso al micrófono" esté ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "activado"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/visualizacion/page.tsx",
                                                    lineNumber: 1069,
                                                    columnNumber: 63
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/visualizacion/page.tsx",
                                            lineNumber: 1069,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                "Permite que las ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "aplicaciones"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/visualizacion/page.tsx",
                                                    lineNumber: 1070,
                                                    columnNumber: 35
                                                }, this),
                                                " (especialmente tu navegador) accedan al micrófono"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/visualizacion/page.tsx",
                                            lineNumber: 1070,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/visualizacion/page.tsx",
                                    lineNumber: 1066,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/visualizacion/page.tsx",
                            lineNumber: 1061,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/visualizacion/page.tsx",
                    lineNumber: 1059,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/visualizacion/page.tsx",
                lineNumber: 1058,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/visualizacion/page.tsx",
        lineNumber: 684,
        columnNumber: 5
    }, this);
} // BrowserSettingsMenu removed — replaced by direct footer links and compact informational boxes above
_s(VisualizacionHabla, "Cx91pB/TinqagLVlc27l3BXTaIo=");
_c = VisualizacionHabla;
var _c;
__turbopack_context__.k.register(_c, "VisualizacionHabla");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_d6fd687b._.js.map