import type { FastifyInstance } from "fastify"
import { watch, existsSync, readFileSync } from "fs"
import { join } from "path"
import { fileURLToPath } from "url"

export function hmrFastifyPlugin(fastify: FastifyInstance) {
    fastify.get("/hmr", { websocket: true }, async (socket) => {
        const clientDistLocation = join(fileURLToPath(import.meta.url), '../../../client/dist')
        watch(clientDistLocation, { recursive: true }, (_, filename) => {
            const targetFile = join(clientDistLocation, filename, "index.js")
            console.log("File changed", targetFile)
            const interval = setInterval(() => {
                if (existsSync(targetFile)) {
                    const file = readFileSync(targetFile, { encoding: "utf-8" });
                    socket.send(file.toString())
                    clearInterval(interval)
                }
            }, 500)
        })
    })
}

export function hmrClientPlugin() {
    return /*js*/`
        const socket = new WebSocket('ws://localhost:3000/hmr');

        socket.addEventListener('open', () => {
            console.log('Connected to server');
            socket.send('Hello from the browser!');
        });

        socket.addEventListener('message', (event) => {
            const script = document.getElementById('hydrate');
            script.remove();
            const newScript = document.createElement('script');
            newScript.type = 'module';
            newScript.id = 'hydrate';
            newScript.textContent = event.data;
            document.body.appendChild(newScript);
            console.log('Received message from server:', event.data);
        });

        socket.addEventListener('close', () => {
            console.log('Disconnected');
        });
    `
}
