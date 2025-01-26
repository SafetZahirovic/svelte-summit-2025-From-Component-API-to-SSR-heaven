import { z } from "zod";

export type VoucherParamsSchema = z.infer<typeof voucherParamsSchema>;
export const voucherParamsSchema = z.object({
  voucherId: z.string().uuid(),
});

export type VoucherDtoSchema = z.infer<typeof voucherDtoSchema>;
export const voucherDtoSchema = z.object({
  bottlesDeposited: z.number(),
  credit: z.number(),
});

export type RawVoucherDtoSchema = z.infer<typeof rawVoucherDtoSchema>;
export const rawVoucherDtoSchema = z.object({
  bottlesDeposited: z
    .object({
      small: z.number(),
      large: z.number(),
    })
    .default({ small: 0, large: 0 }),
  credit: z.number(),
  createdAt: z.coerce.date(),
  id: z.string().uuid(),
});
