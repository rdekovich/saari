export function publicSiteOrigin(value?: string): string | null {
  if (!value?.trim()) return null;
  const url = new URL(value.trim());
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  )
    throw new Error(
      "SITE_URL must be a public HTTPS origin, for example https://example.com",
    );
  return url.origin;
}
