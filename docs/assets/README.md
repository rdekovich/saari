# Assets

The identity is an overhead sardine tin with three fish, diagonally rolled foil and hand-lettered JACOB SAARI. Preserve its contours, lettering and film frames when making derivatives.

## Sources and generation

| Source                                      | Derivatives                             | Command                    |
| ------------------------------------------- | --------------------------------------- | -------------------------- |
| `assets/source/brand/approved-logo.svg`     | Logos, tin symbol, icons and share card | `npm run assets:brand`     |
| `assets/source/illustrations/*.png`         | Responsive illustrations                | `npm run assets:editorial` |
| `assets/source/photography/jacob-saari.jpg` | Responsive portrait                     | `npm run assets:editorial` |
| `assets/source/illustrations/*.png`         | Transparent artwork downloads           | `npm run assets:downloads` |
| `public/motion/tin-reveal.mp4`              | Short intro and matching poster         | `npm run assets:motion`    |

The brand script preserves the compound SVG path and extracts the tin by omitting the first 16 lettering contours. Unit tests verify the full logo and exact tin extraction. It also produces the theme-aware SVG favicon, 32px and 96px PNG icons, a padded 180px Apple icon and a 1200 × 630 share card. Keep public asset URLs stable.

Editorial exports are 480px and 960px WebP files. Drawings preserve transparency; the portrait retains its natural colors and setting. Downloadable PNGs convert paper luminance to transparency without redrawing the illustrations.

Motion generation requires FFmpeg on `PATH`, or a path supplied through `FFMPEG_BIN`. It trims the master to 0.8–4.55 seconds and plays the segment at 1.6× speed, without interpolating frames or changing the master. The full film and its posters remain available separately.

## Published artwork

- `/brand/logo-black.svg` and `/brand/logo-white.svg` — full identity.
- `/brand/tin-symbol.svg` — tin without lettering.
- `/brand/private-dinner.png`, `/brand/guest-dinner.png` and `/brand/contact.png` — transparent illustrations.
- `/motion/tin-reveal.mp4` — full film.

The browser studio uses the catalog in `src/config/brand.ts`. Shared URLs restore an asset, ink, paper and transparency selection; they point to the studio, not a generated image endpoint. Original files can be linked directly. Custom SVG exports retain their paths, vector-to-PNG exports use a 2400px long edge, and raster exports retain their source dimensions.

## Typography and licensing

Libre Franklin and IM Fell English are self-hosted through pinned Fontsource packages. Fonts and interface libraries retain their notices in `public/licenses/`; see [NOTICE](../../NOTICE). Refresh those texts when updating their dependencies.

The code license excludes branding, illustrations, photography, films and editorial copy. See [ASSET-LICENSE](../../ASSET-LICENSE) before reusing these materials.
