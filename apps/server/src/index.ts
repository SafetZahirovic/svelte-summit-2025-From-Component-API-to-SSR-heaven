import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { readFileSync } from "fs";
import "pino-pretty";
import createPrismaClient from "./clients/prisma.ts";
import createRouter from "./router.ts";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

const prismaClient = await createPrismaClient();

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

fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Panteautomaten API",
      description: "Backend service for Panteautomaten",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

fastify.register(fastifySwaggerUI, {
  routePrefix: "/documentation",
});

fastify.register(fastifyStatic, {
  root: new URL("../client/dist", import.meta.url).pathname,
  prefix: "/",
});
fastify.register(cors, {
  origin: "*",
});

fastify.get("/", async (_, reply) => {
  const file = readFileSync(
    new URL("../client/dist", import.meta.url).pathname + "/index.html",
    "utf8"
  );
  return reply.type("text/html").send(file.toString());
});

fastify.register(
  async (fastify) =>
    createRouter({ fastify, prismaClient: prismaClient.getClient() }),
  {
    prefix: "/api",
  }
);

fastify.setErrorHandler(function (error, _, reply) {
  // Log error
  this.log.error(error);
  // Send error response
  reply.status(409).send({ ok: false });
});

const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
      host: "0.0.0.0",
    });
    console.log(`Server is running at http://localhost:3000`);
    console.log(`Swagger is running at http://localhost:3000/documentation`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

fastify.ready(() => {
  console.log(fastify.printRoutes({ commonPrefix: false }));
});

fastify.addHook("onClose", async () => {
  prismaClient.closeClient();
});

start();
