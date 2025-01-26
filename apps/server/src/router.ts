import type { PrismaClient } from "@prisma/client/extension";
import type { FastifyInstance } from "fastify";
import createStreamRouter from "./routes/bottle.ts";
import createBottleService from "./services/bottle.ts";
import createVoucherService from "./services/voucher.ts";
import createVoucherRouter from "./routes/voucher.ts";

export default async function createRouter({
  fastify,
  prismaClient,
}: {
  fastify: FastifyInstance;
  prismaClient: PrismaClient;
}) {
  const bottleService = createBottleService(prismaClient);
  const voucherService = createVoucherService(prismaClient);

  fastify.register(async (fastify) =>
    createStreamRouter({ fastify, bottleService })
  );

  fastify.register(async (fastify) =>
    createVoucherRouter({ fastify, voucherService })
  );
}
