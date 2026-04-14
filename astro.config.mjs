// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

const env = loadEnv(process.env.NODE_ENV || "", process.cwd(), "PUBLIC_");

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: cloudflare({ imageService: "compile" }),
  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET || "production",
      useCdn: false,
      studioBasePath: "/admin",
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
