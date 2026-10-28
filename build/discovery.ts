import { chefPortrait } from "../src/config/artwork";
import { credit } from "../src/config/brand";
import {
  biography,
  contact,
  introduction,
  offerings,
  table,
} from "../src/config/content";
import { pages } from "../src/config/pages";
import { business, social } from "../src/config/site";
import { gallery, galleryPhotos } from "../src/config/gallery";

export function homeStructuredData(origin: string) {
  const url = new URL("/", origin).href;
  const personId = `${url}#jacob-saari`;
  const websiteId = `${url}#website`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url,
        name: business.fullName,
        alternateName: business.domain,
        inLanguage: "en-US",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: pages.home.title,
        description: pages.home.description,
        inLanguage: "en-US",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: business.fullName,
        url,
        description: pages.home.description,
        jobTitle: business.role,
        image: new URL(chefPortrait.src, origin).href,
        sameAs: Object.values(social).map((profile) => profile.url),
        worksFor: {
          "@type": "Organization",
          name: business.restaurant,
        },
      },
    ],
  };
}

export function serializeStructuredData(value: unknown): string {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

export function renderLlms(origin: string): string {
  const url = new URL("/", origin).href;
  return (
    [
      `# ${business.fullName}`,
      `> ${pages.home.description}`,
      `Official website: ${url}`,
      "## Chef page",
      `- [Chef page in Markdown](${new URL("/index.md", origin).href}): Text version of the published chef page.`,
      `- [Chef page](${url}): Biography, kitchen references, food photographs, private chef cooking, pop-ups and contact links.`,
      "## Profiles",
      `- [Instagram](${social.instagram.url}): ${social.instagram.handle}.`,
      `- [LinkedIn](${social.linkedin.url}): ${social.linkedin.name}.`,
      "## Optional",
      `- [Brand and artwork](${new URL(pages.brand.path, origin).href}): Approved logos, illustrations and downloads.`,
      `- [Privacy](${new URL(pages.privacy.path, origin).href}): How the website handles preferences and enquiries.`,
    ].join("\n\n") + "\n"
  );
}

export function renderHomeMarkdown(origin: string): string {
  return (
    [
      `# ${introduction.eyebrow}`,
      `[${business.domain}](${new URL("/", origin).href})`,
      `## ${introduction.headline.join(" ")}`,
      introduction.description,
      `## ${biography.title}`,
      ...biography.paragraphs,
      `### ${biography.kitchensLabel}`,
      biography.kitchens
        .map((kitchen) =>
          kitchen.href
            ? `- [${kitchen.name}](${kitchen.href})`
            : `- ${kitchen.name}`,
        )
        .join("\n"),
      `## ${gallery.title}`,
      gallery.description,
      ...galleryPhotos.map((photo) =>
        [
          `![${photo.alt}](${new URL(`/images/gallery/${photo.id}-960.webp`, origin).href})`,
          photo.dish,
          [photo.place, photo.date].filter(Boolean).join(" · "),
          photo.note,
        ]
          .filter(Boolean)
          .join("\n\n"),
      ),
      `## ${table.title}`,
      table.description,
      ...offerings.flatMap((offering) => [
        `### ${offering.title}`,
        offering.subtitle,
        offering.description,
      ]),
      `## ${contact.title}`,
      contact.eyebrow,
      `- [${business.email}](mailto:${business.email})\n- [Instagram: ${social.instagram.handle}](${social.instagram.url})\n- [LinkedIn: ${social.linkedin.name}](${social.linkedin.url})`,
      `${credit.short} [${credit.name}](${credit.url})`,
    ].join("\n\n") + "\n"
  );
}
