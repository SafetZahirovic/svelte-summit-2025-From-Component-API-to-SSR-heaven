import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    assetsDir: "public",
  },
  plugins: [svelte(), tailwindcss()],
  test: {
    include: ["**/*.spec.ts"],
  },
  resolve: process.env.VITEST
    ? {
        conditions: ["browser"],
      }
    : undefined,
});
