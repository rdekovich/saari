# Architecture

React and TypeScript compose the pages; Vite bundles them and a build-time renderer produces static HTML. Cloudflare Workers serves the output without an application server or database.

## Boundaries

- `src/app/` composes pages and the shared header and footer.
- `src/config/` owns public content, metadata and asset catalogs.
- `src/components/` holds shared presentation; `src/features/` owns behavior and feature styles.
- `src/styles/` holds theme tokens, base styles and the ordered CSS entry point.
- `build/` and `scripts/prerender.mjs` generate HTML and discovery files.
- `scripts/assets/` creates derivatives from the preserved [asset sources](../assets/README.md).
- `tests/` separates unit, browser and hosting checks.

## Rendering and discovery

`src/config/pages.ts` defines routes and metadata. Development and prerendering share `build/siteHtml.ts`; `src/main.tsx` hydrates production HTML or mounts the development shell. Browser APIs stay outside render functions. Navigation, public content and contact links work without JavaScript. Functional HTML markers delimit metadata replacement during the build.

`SITE_URL` enables canonical URLs, share metadata, robots, a sitemap and homepage `WebSite`, `ProfilePage` and `Person` structured data. Builds without it remain unindexed. `build/discovery.ts` also generates `/llms.txt` and `/index.md` from published config. These text resources have canonical and `noindex` response headers; HTML remains the search destination. They supplement readable HTML and do not guarantee indexing or citations.

## Arrival and themes

The homepage introduction lives outside the React root and initializes before hydration. Subpages omit its markup and film request. Muted autoplay starts promptly; the controller owns completion, skip, media failure, focus and disposal. A five-second boot fallback exposes the static page if application code fails. Reduced motion shows the page immediately. Every homepage load or refresh can play the introduction; deep links reach their target afterward.

The short film ends with a 180 ms fade of the whole overlay. Its artwork stays in place. Light mode uses multiply blending; dark mode inverts the film and uses screen blending. The final transparent SVG uses normal compositing. The original film remains available on the brand page.

CSS custom properties define both themes. The pre-paint script, CSS media query, theme switch and browser theme color share the same preference. An explicit choice is stored under `saari-theme`; update the script in `index.html` and the theme feature together if that key changes. Storage denial leaves the switch usable, and storage events synchronize tabs.

## Responsive layout

One DOM composition serves all widths. Shared gutters, chapter backgrounds and fluid spacing align the sections without borders at color transitions. Named grid areas place artwork beside copy on wide screens and after it on small screens. `SectionLabel` and `BackToHome` own repeated chapter and return-link markup.

Below 701px, the sticky header uses a native `details` menu. It works without JavaScript; enhancement adds Escape, outside-click, link-selection and resize dismissal. Anchor offsets account for the header. Footer grid areas move into intentional rows as space narrows. Interface arrows use SVG to avoid emoji rendering on iOS.

## Brand exports and contact

The brand studio accepts only catalog asset IDs and validated hex colors. URL state restores artwork, colors and transparency through shared links and browser navigation. SVG exports preserve the original paths; PNG exports use a local canvas. Export object URLs are revoked after 30 seconds. No artwork or selections are uploaded to a server. Original downloads remain available without JavaScript.

Contact uses a direct `mailto:` link. There is no enquiry form, message storage or delivery service. GitHub links belong with the website credit, separate from Jacob's social profiles.

## Hosting

`wrangler.jsonc` defines an assets-only Worker, canonical directory paths and real 404 responses. Domain bindings and DNS are managed separately. The release guard validates the production origin, static output, metadata and required assets before upload. See [releases](../deployment/releases.md) for configuration and verification.
