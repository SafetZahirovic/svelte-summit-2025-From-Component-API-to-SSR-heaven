import type { FastifyInstance } from "fastify";
import type { VoucherService } from "../services/voucher.ts";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  voucherParamsSchema,
  voucherDtoSchema,
  type VoucherDtoSchema,
  rawVoucherDtoSchema,
} from "@panteautomaten/server-types";
import { z } from "zod";

export default function createVoucherRouter({
  fastify,
  voucherService,
}: {
  fastify: FastifyInstance;
  voucherService: VoucherService;
}) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/voucher/:voucherId",
    schema: {
      params: voucherParamsSchema,
      response: {
        200: voucherDtoSchema,
      },
    },
    handler: async (request, reply) => {
      const { voucherId } = request.params;
      const voucher = await voucherService.getVoucherById(voucherId);

      const voucherDto: VoucherDtoSchema = {
        bottlesDeposited: voucher._count.bottlesDeposited,
        credit: voucher.credit,
      };

      reply.type("application/json").send(voucherDto);
    },
  });

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/voucher",
    schema: {
      response: {
        200: z.array(rawVoucherDtoSchema),
      },
    },
    handler: async (_, reply) => {
      const vouchersDto = await voucherService.getVouchers();
      reply.type("application/json").send(vouchersDto);
    },
  });
}
