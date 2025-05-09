import { createApp } from "./app.ts";
import { hmrFastifyPlugin } from "./hmr.ts";
import { devMode } from "./utils.ts";
import { viewsRouter } from "./viewRouter.ts";


const fastify = await createApp()
fastify.register(viewsRouter)

if (devMode)
    fastify.register(hmrFastifyPlugin)

try {

    await fastify.listen({
        port: 3000,
        host: "0.0.0.0",
    });
    console.log(`Server is running at http://localhost:3000`);
    console.log(`Swagger is running at http://localhost:3000/documentation`);
    console.log(fastify.printRoutes({ commonPrefix: false }));
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}

