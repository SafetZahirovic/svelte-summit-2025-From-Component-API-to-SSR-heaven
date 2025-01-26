import type { FastifyInstance } from "fastify";
import type { BottleService } from "../services/bottle.ts";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  collectBodySchema,
  collectDtoSchema,
} from "@panteautomaten/server-types";

export default function createStreamRouter({
  fastify,
  bottleService,
}: {
  fastify: FastifyInstance;
  bottleService: BottleService;
}) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/bottle/collect",
    schema: {
      body: collectBodySchema,
      response: {
        200: collectDtoSchema,
      },
    },
    handler: async (request, reply) => {
      const voucher = await bottleService.collectBottles({
        amountOfBottles: request.body.amountOfBottles,
        amountOfMoney: request.body.amountOfMoney,
      });

      reply.type("application/json").send({
        voucherId: voucher.id,
      });
    },
  });
}
