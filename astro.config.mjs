import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import latexMdx from "./src/plugins/latex-mdx.mjs";

const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:4321");

export default defineConfig({
  site,
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [latexMdx()],
    // Mermaid's diagram modules import CommonJS dependencies such as dayjs.
    // Pre-bundling keeps those imports browser-compatible in local previews.
    optimizeDeps: {
      include: ["mermaid", "dayjs"],
    },
  },
  markdown: {
    syntaxHighlight: {
      type: "shiki",
    },
  },
});
