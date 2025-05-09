
import { readFileSync } from "fs";
import "pino-pretty";
import { render } from "svelte/server";
import { hmrClientPlugin } from "./hmr.ts";

export const devMode = "development" === "development"

export async function renderSvelteView({ name, props }: { name: string, props: object }) {
  const distUrl = new URL("../../client/dist", import.meta.url);
  const ssrFile = distUrl.pathname + `/ssr/${name}/index.js`;
  const clientFile = distUrl.pathname + `/client/${name}/index.js`;
  const { default: Component } = await import(ssrFile);

  const renderedSvelteModule = render(Component, {
    props
  });

  return { ...renderedSvelteModule, hydrate: readFileSync(clientFile, "utf-8") };
}

export function createDom({ body, hydrate, props }: { body: string, hydrate: string, props: object }) {
  return /*html*/`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="module">
      window.__PRELOADED_STATE__ = ${JSON.stringify(props)}
    </script>
    ${devMode ? `
      <script type="module">
        ${hmrClientPlugin()}
      </script>
    ` : ""
    }
   </head>
   <body>
    ${body}
    <script type="module" id="hydrate">
      ${hydrate}
    </script>
   </body>
  </html>
  `
}
