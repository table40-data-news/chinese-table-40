import { copyFile, mkdir, writeFile } from "node:fs/promises";

const worker = `export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405 });
    }

    const url = new URL(request.url);
    const assets = env?.ASSETS;
    if (!assets?.fetch) {
      return new Response("Static assets binding is unavailable.", { status: 500 });
    }

    if (url.pathname === "/" || !url.pathname.split("/").pop().includes(".")) {
      return assets.fetch(new Request(new URL("/index.html", url), request));
    }

    return assets.fetch(request);
  },
};
`;

await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
await writeFile("dist/server/index.js", worker);
