# ALINE — Brigadería Gourmet

Web comercial en Next.js, TypeScript y Tailwind CSS, reconstruida como una sola página vertical según el boceto aprobado. Las secciones siguen el orden: portada, colecciones, productos, tortas, reseñas, galería, cotización, ideas y novedades.

## Ejecutar

```bash
npm install
npm run dev
```

Abrí http://localhost:3000. Para compilar: `npm run build`.

## Contacto comercial

Configurá `whatsappNumber` en `src/lib/config.ts` con el número internacional de ALINE, sin `+` ni espacios. Hasta entonces, los formularios y el carrito muestran un aviso claro y ofrecen enviar el mensaje por correo. El email y el Instagram también se configuran en ese archivo.

## Productos y precios

Los siete brigadeiros con precio confirmado en USD provienen de la captura de catálogo proporcionada. Los productos del catálogo del Día de las Madres 2026 se muestran como colecciones de temporada sin precio porque el documento indica importes en euros. Se debe consultar su disponibilidad y precio en USD. No se convierten monedas ni se muestran los importes en euros.

Las fotografías y el logo se recortaron de los recursos adjuntos. Las miniaturas individuales de brigadeiros tienen resolución limitada en la captura original; se conservaron fieles al producto y sin sustituirlas por imágenes genéricas.

Los bombones decorativos del hero y las cinco imágenes de categorías son recursos ilustrativos generados con transparencia. Los productos destacados, detalles de producto, galería y fotografías de eventos conservan recursos reales de ALINE. Los prompts y archivos generados están documentados en `docs/generated-assets.md`.

El carrusel de categorías avanza continuamente y se pausa con el mouse; las reseñas de muestra cambian automáticamente y admiten flechas y gesto táctil. Ambos respetan `prefers-reduced-motion`.

La portada utiliza Lilita One como tipografía local para aproximar los títulos del boceto. Las reseñas visibles son ejemplos identificados como tales y se pueden reemplazar en `src/app/page.tsx` por testimonios verificados.

## Verificación

Con la aplicación ejecutándose en el puerto 3000:

```bash
node scripts/verify.mjs
```

La prueba recorre el orden de secciones, carruseles, rutas, filtros, carrito, persistencia, cotización y menú móvil. Para generar capturas completas con todas las fotografías cargadas, ejecutá `node scripts/capture.mjs`; produce `preview-desktop.png` y `preview-mobile.png`. Ambos scripts requieren Google Chrome instalado en la ruta configurada.
