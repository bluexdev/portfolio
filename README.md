# CARLXSDEV — Portfolio

Portfolio de Carlos Alvarez Ponce (bluexdev): scroll horizontal, estética pixel-art / arcade en azul eléctrico, minijuego Snake, quest log, logros, blog y contacto. Incluye modo ES/EN, CTAs de conversión, WhatsApp directo, CV descargable configurable, SEO estructurado y flags de contenido desde Sanity.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Sanity.io · Vercel

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

Sin variables de entorno el sitio funciona completo con el contenido de respaldo de [src/lib/content.ts](src/lib/content.ts) (idéntico a la referencia de diseño).

## Estructura

```
src/
├── app/
│   ├── layout.tsx              # fuentes, metadataBase, JSON-LD Person, Vercel Analytics
│   ├── page.tsx                # home ES (ISR 60s)
│   ├── en/page.tsx             # home EN
│   ├── sitemap.ts              # sitemap bilingüe + posts
│   ├── opengraph-image.tsx     # OG card 1200×630
│   ├── icon.tsx                # favicon pixel
│   ├── not-found.tsx           # 404 GAME OVER
│   ├── globals.css             # @theme con los design tokens + clases cx-*
│   └── blog/[slug]/page.tsx    # post individual (Portable Text) — SSG con generateStaticParams
├── components/
│   ├── layout/                 # HorizontalTrack (scroll + contexto), TopBar, BottomHud, MobileMenu, PixelCursor, BootScreen
│   ├── sections/               # Hero, Perfil, Trayecto, Stack, Proyectos (+ ProjectsRail), Arcade, Blog, Contacto
│   ├── game/SnakeGame.tsx      # canvas 22×16, D-pad táctil, best en localStorage
│   └── fx/                     # Scramble, Konami, Grain, RevealStagger, PixelPreview, GoButton
├── sanity/
│   ├── schemaTypes/            # project, post, experience, achievement, siteSettings
│   └── lib/                    # client (@sanity/client) + queries GROQ
└── lib/                        # types, content (fallback), data (Sanity→tipos), utils
```

## Interacciones

- **Scroll horizontal** con lerp 0.1: wheel vertical→horizontal, touch con lock de eje, flechas ←/→, nudge inicial y hint de primera visita "DESLIZA PARA EXPLORAR". Deep-links `#seccion`.
- **HUD**: contador `0N / 08`, nombre con scramble, dots activos, barra de progreso electric→cyan.
- **Conversión**: CTA principal sólido a Proyectos, WhatsApp `wa.me`, CV PDF descargable y botones controlables desde Sanity.
- **ES/EN**: toggle en TopBar y menú móvil; `/` español, `/en` inglés.
- **Snake**: SPACE/Enter inicia, ESC sale, flechas/WASD/D-pad; +10 pts por token, acelera cada 50; BEST en localStorage; shake + flash en game over.
- **Sonido 8-bit opcional**: toggle en TopBar (`soundEnabled=false` por defecto).
- **Acordeón VER MÁS**: el drawer anima `width` por rAF (evita el freeze de transiciones CSS con re-renders) y re-mide el track en vivo.
- **Konami** ↑↑↓↓←→←→BA: XBLUE MODE (confetti + toast + snake rainbow). Easter egg en la consola.
- **Boot BIOS** 1 vez por sesión; **cursor pixel** solo pointer:fine; todo respeta `prefers-reduced-motion`.
- **Móvil (<780px)**: botón MENU → overlay full-screen; grids colapsan; juego jugable con D-pad.

## Conectar Sanity

Sanity funciona en 2 piezas:

- **Content Lake**: la base de datos en Sanity Cloud (plan gratuito).
- **Studio**: la web para editar contenido. Este repo ya trae `sanity.config.ts`, estructura de navegación y tema pixel-art alineado al portfolio. Se puede publicar gratis como `*.sanity.studio` con `npm run sanity:deploy`.

### Primer setup desde cero

1. Crea cuenta en Sanity: <https://www.sanity.io>.
2. Crea un proyecto nuevo desde el dashboard de Sanity o con la CLI.
3. En el proyecto, usa dataset `production`.
4. Copia el `projectId` del dashboard de Sanity.
5. Crea `.env.local` desde `.env.example` y llena:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_STUDIO_PROJECT_ID`
   - `SANITY_STUDIO_DATASET`
   - `SANITY_API_READ_TOKEN` (solo si el dataset es privado)
   - `SANITY_API_WRITE_TOKEN` (solo para correr el seed local)
   - `NEXT_PUBLIC_SITE_URL` (dominio final para metadataBase y sitemap)
6. Inicia sesión en la CLI:

```bash
npx sanity login --provider github
```

7. Carga contenido inicial:

```bash
npm run sanity:seed
```

Ese comando usa tu sesión local de Sanity. Si alguna vez quieres cargar contenido con un token en vez de login interactivo, usa `SANITY_API_WRITE_TOKEN` y `npm run sanity:seed:token`.

8. Abre el Studio local:

```bash
npm run sanity:dev
```

9. Publica el Studio gratis en Sanity Hosting:

```bash
npm run sanity:deploy
```

El hostname ya está configurado como `carlxsdev`, así que entrarás por `https://carlxsdev.sanity.studio`.

10. En Sanity Dashboard → API → CORS origins, agrega los dominios del frontend:
    - `http://localhost:3000`
    - `http://localhost:3001`
    - tu dominio de Vercel/producción

Las imágenes (foto de perfil, hero y galería de proyectos) se suben desde el Studio y reemplazan los placeholders automáticamente.

### Diseño del Studio

La interfaz de edición también sigue la identidad `CARLXSDEV_`: fondo oscuro con grid, acentos cyan/azules, logo pixel y navegación ordenada por contenido.

- `src/sanity/studio/theme.ts`: tokens visuales de Sanity Studio.
- `src/sanity/studio/components.tsx`: navbar, layout y marca pixel.
- `src/sanity/studio/structure.ts`: menú principal con `Ajustes del sitio`, `Proyectos`, `Blog posts`, `Experiencia` y `Logros`.

### Controles importantes en Sanity

En el documento único `siteSettings`:

- `showBlog`: muestra/oculta el blog. Por defecto está en `false` para no enseñar contenido demo.
- `showTrayecto`: muestra/oculta la sección de experiencia/logros.
- `showCv`: muestra/oculta `[ ⇩ CV.PDF ]`. Si está activo, `cvUrl` debe apuntar a un PDF.
- `cvUrl`: puede ser `/carlos-alvarez-ponce-cv.pdf` (archivo en `public/`) o una URL externa.
- `showProjectMetrics`: muestra/oculta las métricas de impacto de cada proyecto. Por defecto `false`.
- `soundEnabled`: activa sonido por defecto. Por defecto `false`; el usuario también lo puede activar/apagar desde el TopBar.
- Campos `availabilityTextEn` y `locationEn`: versiones en inglés para `/en`.

En `project`:

- `heroImage`: screenshot principal. Si existe, reemplaza el preview procedural en la card y el drawer.
- `gallery`: hasta 4 screenshots reales en el drawer.
- `impactMetrics`: métricas tipo `1.2s LCP`, `300+ órdenes`, `0 cobros duplicados`; solo se ven si `siteSettings.showProjectMetrics=true`.
- Campos `titleEn`, `summaryEn`, `bulletsEn`, `longDescEn`, `featuresEn`: override para inglés. Si faltan, el sitio usa un fallback EN local.
- `hasDetail`: activa el acordeón VER MÁS por proyecto.

En `post`:

- `coverImage`: portada de la card del blog.
- `titleEn` y `excerptEn`: texto para `/en`. El cuerpo usa `body` por ahora.

### Rollback

Antes de estos cambios se creó el checkpoint `51af6e9` con:

```bash
git switch rollback/before-conversion-updates
# o, para inspeccionar el punto exacto:
git checkout rollback-before-conversion-updates
```

> Nota: se usa `@sanity/client` directamente (el paquete `next-sanity@13` requiere Next 16). Al migrar a Next 16, puede sustituirse 1:1 por `next-sanity` y embeber el Studio en `/studio`.

## Deploy en Vercel

1. Importa el repo en Vercel (framework: Next.js, sin config extra).
2. Añade las env vars de Sanity.
3. Revalidación: ISR con `revalidate = 60` ya activo; opcionalmente webhook de Sanity → `revalidateTag`.
