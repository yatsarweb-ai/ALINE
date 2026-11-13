# Revisión local — rendimiento y galería

Fecha: 12 de noviembre de 2026. Sin publicación ni push a producción.

## Cambios y causas verificables

- `src/components/useHomeScroll.ts`: eliminado el listener de carga capturado en toda la portada. Ejecutaba `ScrollTrigger.refresh()` por cada imagen, incluso cuando los contenedores ya reservaban sus dimensiones. Queda una actualización por las métricas de las fuentes.
- Se conserva el pin y la secuencia cinematográfica del hero. `ignoreMobileResize` evita recalcular posiciones ante pequeños cambios de altura del navegador táctil. No bloquea redimensionamientos grandes ni cambios de orientación. Referencia técnica: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.config()/.
- Las letras y piezas del hero usan transformaciones 2D sin forzar superficies 3D; conservan desplazamientos, escala y rotación. No se agregaron capas `will-change` globales ni scroll artificial.
- `src/components/CategoryMarquee.tsx`: el bucle de animación deja de ejecutarse fuera de pantalla, con la pestaña oculta o bajo movimiento reducido. Conserva velocidad, controles, interacción y degradados.
- Eliminadas las siete máscaras reversibles de la galería anterior. El nuevo componente usa entrada única mediante Web Animations API e IntersectionObserver, sin ocultamiento inicial obligatorio y sin tareas de React por fotograma.

## Línea fucsia: no confirmada como resuelta

Se revisaron estilos de la portada, filtros, transformaciones anidadas, pin, máscaras y posibles marcadores GSAP. No se encontró un elemento explícito fucsia. El bombón rosado ya tenía filtro desactivado en móvil; esa corrección anterior no era evidencia suficiente de la causa.

El cambio de composición 2D reduce promociones forzadas, pero es una optimización, no una demostración del origen del defecto. No apareció la línea durante scroll de ida y vuelta en WebKit de Windows a 390 px. Falta repetir el caso en el iPhone afectado, idealmente con inspección remota de Safari y comparación antes/después. No se afirma una corrección definitiva del artefacto ni fluidez garantizada en hardware móvil real.

## Composición y recursos

Referencia inspeccionada: https://vasoguira.com/egresados. Su galería combina áreas verticales de dos filas, piezas compactas y horizontales de dos columnas. Se adaptó ese principio a ocho piezas con CSS Grid, cuatro columnas en escritorio y tres en móvil, sin posiciones absolutas para la distribución ni huecos vacíos.

- Conservadas: `citrus-brigadeiros.jpg`, `gift-four.jpg`, `strawberry-heart.jpg` y `gift-share.jpg`.
- Retiradas únicamente de esta galería: `bowling-chocolates.jpg`, `cake-floral.jpg` y `gift-pyramid.jpg`. Los archivos y otros usos permanecen intactos.
- Video `DekkUdDhwea`: área a, primera pieza.
- Video `Dexrd0At-dE`: área c, intercalado después de la fotografía de brigadeiros.
- Nueva foto de torta: área e, pieza vertical central. Se usó el JPG adjunto cuyo nombre termina en `10_27_54 p.m.jpg`, porque es el archivo efectivamente suministrado, aunque el prompt lo llama `IMG_4663.jpeg`.
- Video `Db8qHrsJBYN`: área h, última pieza.

Los MP4 en `public/media/` conservan los clips completos, codificados en H.264, sin audio y con faststart. Peso conjunto aproximado: 6,7 MB. Cada uno tiene un poster JPG. No reciben `src` hasta entrar en pantalla; se pausan al salir o esconder la pestaña, y no reproducen con movimiento reducido. La nueva foto está optimizada en WebP.

## Verificación

- `npm run build`: compilación, TypeScript y generación de rutas correctos.
- `node scripts/verify.mjs`: navegación, filtros, carrito persistente, cantidades, cotización, menú móvil y anchos 320/390/768 correctos.
- `node scripts/verify-final-corrections.mjs`: reseñas cada ocho segundos, pausa, ciclo y gesto táctil correctos. Se corrigió una carrera del reloj del propio test; no se modificó el carrusel.
- `node scripts/verify-multimedia.mjs`: Chromium y WebKit, 390 y 1440 px; los tres videos reproducen, cargan al entrar y pausan al salir; entradas únicas; contenido visible al regresar; orientación/redimensionamiento; movimiento reducido; un solo pin, retirado correctamente al reducir movimiento; sin errores JavaScript.
- `node scripts/profile-scroll.mjs`: recorrido local de 360 cuadros con CPU limitada a 4× en Chromium: p95 16,8 ms, cero intervalos mayores de 50 ms y cero tareas largas. Es una medición local, no una comparación antes/después ni una prueba de la GPU de un teléfono.
- Verificación adicional del carrusel de categorías: avanza visible y se detiene fuera de pantalla.
- `node scripts/capture.mjs`: capturas completas a 1440 y 390 px; cero imágenes faltantes y cero desbordamiento horizontal.
- `git diff --check`: correcto.

Capturas locales: `preview-desktop.png`, `preview-mobile.png`, `gallery-chromium-1440.png`, `gallery-chromium-390.png`, `gallery-webkit-390.png` y `gallery-webkit-390-hero.png`.

No hubo acceso a Safari en iPhone ni Chrome en Android físicos. Apertura de teclado real, barras dinámicas de Safari, zoom táctil y el defecto gráfico original requieren validación en dispositivo.

## Archivos

Implementación: `src/components/MultimediaGallery.tsx`, `src/components/useHomeScroll.ts`, `src/components/CategoryMarquee.tsx`, `src/app/page.tsx`, `src/app/final-corrections.css`, `public/media/*`.

Verificación/documentación: `scripts/verify.mjs`, `scripts/verify-final-corrections.mjs`, `scripts/verify-multimedia.mjs`, `scripts/profile-scroll.mjs`, este informe. `.gitignore` excluye la extracción temporal de fotogramas `.media-review/`.
