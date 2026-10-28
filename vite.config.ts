import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { publicSiteOrigin } from "./build/publicSite";
import { siteHtml } from "./build/siteHtml";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    siteHtml(publicSiteOrigin(loadEnv(mode, process.cwd(), "").SITE_URL)),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    allowedHosts: ["preview.dekovich.com"],
  },
  preview: { allowedHosts: ["preview.dekovich.com"] },
}));
