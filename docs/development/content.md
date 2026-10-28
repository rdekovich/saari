# Content and editing

Keep the site a personal chef page: direct, specific to cooking and written in the first person. Use lowercase display copy, concise headings and real details. Keep the current positioning until Jacob confirms changes to his offerings. Do not infer services, prices, awards or business addresses for metadata.

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

Jacob is based in Detroit; Casa Pernoi is in Birmingham, Michigan. Keep those locations distinct. The biography introduces him as Jake or Deens and mentions his interest in fish and shellfish.

The selected kitchens are Casa Pernoi, Bastion, Blackberry Farms and Chapman House. Casa Pernoi appears first as his current kitchen. Present them as compact references without employment dates, a career timeline or a responsibilities list. Chapman House remains unlinked. Names and official links are maintained together in the content config.

## Images and links

Portfolio photographs should show Jacob and his actual work with permission to publish. Preserve the portrait's natural appearance and colors. Sardine drawings are decorative; information and contact actions remain real text and links.

Instagram has labelled links in the hero and contact section. Footer social links are icon-only with accessible names and 44px targets. Use the existing shared components and SVG icons. Avoid embeds or tracking scripts for social profiles.

The footer credits Rob Dekovich and links to the website source beside that credit. The brand page carries the full colophon. Contact stays a direct email link; mailbox provisioning is separate from website releases and successful link tests do not establish mail delivery.
