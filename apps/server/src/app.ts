import fastifyStatic from "@fastify/static";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";
import Fastify from "fastify";

export function createApp() {
    const envToLogger = {
        development: {
            customLevels: {
                info: false,
            },
            transport: {
                target: "pino-pretty",
                options: {
                    translateTime: "HH:MM:ss Z",
                    ignore: "pid,hostname",
                },
            },
        },
        production: true,
        test: false,
    };

    const fastify = Fastify({
        logger: envToLogger["development"] ?? true,
    });

    fastify.setValidatorCompiler(validatorCompiler);
    fastify.setSerializerCompiler(serializerCompiler);

    fastify.register(fastifyStatic, {
        root: new URL("../client/dist", import.meta.url).pathname,
        prefix: "/",
    });
    fastify.register(cors, {
        origin: "*",
    });
    fastify.register(websocket)


    fastify.setErrorHandler(function (error, _, reply) {
        // Log error
        this.log.error(error);
        // Send error response
        reply.status(409).send({ ok: false });
    });

    return fastify;
}

