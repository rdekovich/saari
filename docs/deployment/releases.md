# Releases

The static site is deployed to the `saari` Cloudflare Worker at [saari.kitchen](https://saari.kitchen/). This repository owns application code, assets and uploads. DNS, custom domains and redirects are managed separately; do not add competing Wrangler routes.

## GitHub Actions

The Check workflow validates pull requests and main pushes. It deploys only from main after all checks pass and when `DEPLOY_ENABLED=true`. Documentation-only changes in `docs/` and `README.md` skip the workflow; use a manual run from main when needed.

| Setting                 | Type                | Value                                      |
| ----------------------- | ------------------- | ------------------------------------------ |
| `SITE_URL`              | Repository variable | `https://saari.kitchen`                    |
| `DEPLOY_ENABLED`        | Repository variable | `true` to deploy; `false` to validate only |
| `CLOUDFLARE_ACCOUNT_ID` | Repository variable | Account containing the Worker              |
| `CLOUDFLARE_API_TOKEN`  | Actions secret      | Dedicated token for the `saari` Worker     |

Create the deployment token with **Specified Workers → saari → Editor** permissions, following [Cloudflare's Worker authorization guidance](https://developers.cloudflare.com/workers/authorization/workers/). Store it in [Actions secrets](https://github.com/rdekovich/saari/settings/secrets/actions). Keep credentials out of source files, command arguments and logs.

## Validation and manual deployment

```sh
SITE_URL=https://saari.kitchen npm run check
SITE_URL=https://saari.kitchen npm run deploy
```

`check` covers formatting, TypeScript, production builds, unit tests, browser behavior and Cloudflare routing. `deploy` validates and uploads the existing `dist/`; it does not rebuild. Manual deployment also requires authorized Cloudflare credentials in the environment. Builds without `SITE_URL` remain unindexed.

For visual review, run `npm run capture` against an owned local preview, or set `PREVIEW_URL` to its origin. Captures include every page on desktop and mobile in both themes, the mobile menu and arrival animation. Output goes to ignored `docs/review/`. Use a free port instead of stopping another project's server.

## After a release

- Verify home, brand and privacy return 200, and an unknown path returns 404.
- Check HTTPS and the www-to-apex redirect preserve paths and queries.
- Check canonical URLs, page titles, share images, browser icons, robots and sitemap.
- Exercise navigation, themes, introduction fallbacks and artwork downloads.

To roll back, restore a known Worker version or deploy a verified application commit. Asset releases do not require DNS changes.

## Search maintenance

Verify the domain in [Google Search Console](https://search.google.com/search-console) and keep its DNS verification record. Submit `https://saari.kitchen/sitemap.xml`, inspect the homepage and request indexing after substantive changes. Review canonical selection and crawl exclusions. [Bing Webmaster Tools](https://www.bing.com/webmasters/) can import a verified Search Console property.

Check `/llms.txt` and `/index.md` return their text content types; their `noindex` headers are intentional. Successful requests with crawler user-agent strings do not prove access from actual crawler IP addresses. Use webmaster reports and Cloudflare security events to investigate crawl failures. Search results and favicons update on the search engine's schedule.
