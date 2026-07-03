# CARLXSDEV — Portfolio

Portfolio de Carlos Alvarez Ponce (bluexdev): scroll horizontal, estética pixel-art / arcade en azul eléctrico, minijuego Snake, quest log, logros, blog y contacto. Recreación pixel-perfect del handoff `design_handoff_portfolio/Portfolio.dc.html`.

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
│   ├── layout.tsx              # fuentes next/font (Press Start 2P, JetBrains Mono, Geist), metadata
│   ├── page.tsx                # página única: monta <HorizontalTrack> con las 8 secciones (ISR 60s)
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

- **Scroll horizontal** con lerp 0.1: wheel vertical→horizontal, touch con lock de eje, flechas ←/→, nudge inicial a los 1.8s. Deep-links `#seccion`.
- **HUD**: contador `0N / 08`, nombre con scramble, dots activos, barra de progreso electric→cyan.
- **Snake**: SPACE/Enter inicia, ESC sale, flechas/WASD/D-pad; +10 pts por token, acelera cada 50; BEST en localStorage; shake + flash en game over.
- **Acordeón VER MÁS**: el drawer anima `width` por rAF (evita el freeze de transiciones CSS con re-renders) y re-mide el track en vivo.
- **Konami** ↑↑↓↓←→←→BA: XBLUE MODE (confetti + toast + snake rainbow). Easter egg en la consola.
- **Boot BIOS** 1 vez por sesión; **cursor pixel** solo pointer:fine; todo respeta `prefers-reduced-motion`.
- **Móvil (<780px)**: botón MENU → overlay full-screen; grids colapsan; juego jugable con D-pad.

## Conectar Sanity

1. `npm create sanity@latest` (proyecto aparte o embebido) y copia los schemas de `src/sanity/schemaTypes/`.
2. Crea documentos: 6 `project`, 3 `post`, 2 `experience`, 20 `achievement` y 1 `siteSettings` (el contenido fuente está en `src/lib/content.ts`).
3. Define en `.env.local` (ver `.env.example`):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_READ_TOKEN` (solo si el dataset es privado)
4. Las imágenes (foto de perfil, hero y galería de proyectos) se suben a Sanity y reemplazan los placeholders automáticamente.

`siteSettings.showBlog` y `showTrayecto` ocultan esas secciones (los índices y el contador del HUD se ajustan solos). `project.hasDetail` activa el acordeón VER MÁS por proyecto.

> Nota: se usa `@sanity/client` directamente (el paquete `next-sanity@13` requiere Next 16). Al migrar a Next 16, puede sustituirse 1:1 por `next-sanity` y embeber el Studio en `/studio`.

## Deploy en Vercel

1. Importa el repo en Vercel (framework: Next.js, sin config extra).
2. Añade las env vars de Sanity.
3. Revalidación: ISR con `revalidate = 60` ya activo; opcionalmente webhook de Sanity → `revalidateTag`.
