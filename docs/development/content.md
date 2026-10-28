# Content and editing

Keep the site a personal chef page: direct, specific to cooking and written in the first person. Use lowercase display copy, concise headings and real details. Lead with seafood, open-fire cooking and gathering around a table. Private chef cooking and pop-ups or collaborations share the same contact route. Confirm substantive changes with Jacob. Do not infer services, prices, awards or business addresses for metadata.

## Sources of truth

| Content                                                   | Location                |
| --------------------------------------------------------- | ----------------------- |
| Identity, location, email, social profiles and navigation | `src/config/site.ts`    |
| Hero, biography, selected kitchens and dinners            | `src/config/content.ts` |
| Page routes, titles and descriptions                      | `src/config/pages.ts`   |
| Artwork metadata and alternative text                     | `src/config/artwork.ts` |
| Brand catalog, studio copy and credits                    | `src/config/brand.ts`   |
| Colors, typography and shared spacing                     | `src/styles/theme.css`  |

Update these sources instead of duplicating content in components, structured data or discovery files.

## Biography and kitchens

Jacob is based in Detroit; Casa Pernoi is in Birmingham, Michigan. Keep those locations distinct. The biography introduces him as Jake or Deens and mentions his interest in seafood and open-fire cooking.

The selected kitchens are Casa Pernoi, Bastion, Blackberry Farms and Chapman House. Casa Pernoi appears first as his current kitchen. Present them as compact references without employment dates, a career timeline or a responsibilities list. Chapman House remains unlinked. Names and official links are maintained together in the content config.

## Images and links

Portfolio photographs should show Jacob and his actual work with permission to publish. Preserve the portrait's natural appearance and colors. Sardine drawings are decorative; information and contact actions remain real text and links.

Instagram has labelled links in the hero and contact section. Footer social links are icon-only with accessible names and 44px targets. Use the existing shared components and SVG icons. Avoid embeds or tracking scripts for social profiles.

The footer credits Rob Dekovich and links to the website source beside that credit. The brand page carries the full colophon. Contact stays a direct email link; mailbox provisioning is separate from website releases and successful link tests do not establish mail delivery.

## Gallery

`src/config/gallery.ts` selects the photographs and their order. Each entry accepts optional `dish`, `place`, `date` and `note` fields. Leave unconfirmed details empty. The preview displays bracketed placeholders; replace them with Jacob's words before publishing the gallery. Keep notes concise enough to read like a short introduction to a dish, without guessing ingredients or technique from an image.

The native disclosure cards open with a tap, click, Enter or Space, and remain usable without JavaScript. Reduced motion disables their turn. Responsive WebP files come from the selected source photographs; CSS controls their framing without altering the food.

Kitchen recognition marks describe the venues, not personal awards. Verify Bastion's distinction through the [Michelin Guide](https://guide.michelin.com/us/en/tennessee/nashville_2790527/restaurant/bastion-1214985) and Blackberry Farm's membership through [Relais & Châteaux](https://www.relaischateaux.com/us/hotel/blackberry-farm/) when updating them. Relais & Châteaux is a membership association, not a Michelin star rating.
