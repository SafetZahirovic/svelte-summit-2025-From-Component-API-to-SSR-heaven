import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const isSsr = mode === "ssr"
  const outputDir = isSsr ? "dist/ssr" : "dist/client";
  return {
    build: {
      outDir: outputDir,
      ssr: isSsr,
      assetsDir: "public",
      rollupOptions: {
        input: {
          home: isSsr ? 'src/views/home/index.ts' : 'src/views/home/hydrate.ts',
        },
        output: {
          entryFileNames: `[name]/index.js`,
        },
      },
      minify: false
    },
    plugins: [svelte({
      ... (!isSsr && {
        compilerOptions: {
          css: "injected"
        }
      })
    })],
  }
})
