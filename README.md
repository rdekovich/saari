<p align="center">
  <a href="https://saari.kitchen/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/brand/logo-white.svg" />
      <img src="public/brand/logo-black.svg" width="220" alt="Jacob Saari — sardines in an open tin" />
    </picture>
  </a>
</p>
<p align="center">
  <a href="https://saari.kitchen/">saari.kitchen</a>
</p>

A chef portfolio website built with React, TypeScript, and Vite. Prerendered to static HTML and hosted on Cloudflare Workers.

## Development

Use the Node version in [`.node-version`](.node-version).

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. Use `npm run dev -- --port 3001` if the port is occupied.

## Checks

```sh
npx playwright install chromium
npm run check
```

Checks cover formatting, TypeScript, the build and unit, browser and hosting tests. Run `npm run capture` against the local preview for desktop and mobile screenshots in both themes.

## Deployment

Main deploys to Cloudflare Workers after checks pass. Builds without `SITE_URL` stay unindexed. See [release setup](docs/deployment/releases.md) for configuration and manual deployment.

## License

Code is [MIT licensed](LICENSE). Jacob Saari’s branding, artwork, photography and editorial content are [excluded](ASSET-LICENSE). Third-party software and fonts retain their [original licenses](NOTICE).
