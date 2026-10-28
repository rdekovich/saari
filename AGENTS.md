# Saari

Chef Jacob Saari's website at `saari.kitchen`. Start with [README.md](README.md), [architecture](docs/development/architecture.md) and [content](docs/development/content.md).

- Preserve the black-ink sardine tin identity, exact SVG paths and original film. Follow the [asset guide](docs/assets/README.md) when generating derivatives.
- The introduction plays only on homepage loads and refreshes. Keep reduced-motion, skip, media-failure and JavaScript-failure fallbacks. Reveal the page with a brief fade; keep the artwork in place and omit a caption.
- Use one responsive composition with shared chapter backgrounds, gutters and spacing tokens. Color boundaries have no border lines. Preserve both themes and pre-paint preference handling, native mobile navigation and intentional footer rows.
- Use SVG interface icons. Keep dinner numbers and labels aligned. Dinner and contact drawings share a right-hand column on desktop and follow the copy on small screens. Labelled social links occupy intentional rows; footer social links remain icon-only.
- Keep the chef section personal, with selected kitchens as compact references rather than a résumé. Keep current visible copy and positioning until Jacob confirms changes to his offerings. Metadata and generated text must use published facts from config.
- Keep public content in typed config and behavior within its feature. Extract repeated UI with a shared purpose; avoid generic abstractions for isolated markup. Keep code self-explanatory without prose comments, retaining functional compiler directives and build markers.
- Preserve static rendering, real links and useful content without JavaScript. Do not add a client router or server for presentation-only behavior. Contact uses a direct email link; mailbox provisioning must not block website releases, and link checks do not establish delivery.
- Brand exports run in the browser with validated selections and preserved source paths. Keep the website credit and repository link separate from Jacob's social profiles.
- Code is MIT licensed; preserve `ASSET-LICENSE` exclusions and `NOTICE`. Refresh published third-party license texts when their dependencies change. Keep the npm package private.
- Use conventional commits, such as `feat(brand): add an artwork preset` or `fix(nav): preserve keyboard focus`. Keep documentation focused on current behavior and maintenance rather than design history or working notes.
- Run `npm run check` for code changes and `npm run capture` against an owned preview after visual changes. Use a free port instead of stopping another project's preview server.
- Main deploys through GitHub Actions after checks pass, using the dedicated Worker token and release guard. Domain and DNS configuration are managed separately. See [releases](docs/deployment/releases.md).
