import { z } from "zod";

export type CollectBodySchema = z.infer<typeof collectBodySchema>;

export const collectBodySchema = z.object({
  amountOfMoney: z.number(),
  amountOfBottles: z.object({
    large: z.number(),
    small: z.number(),
  }),
});

export type CollectDtoSchema = z.infer<typeof collectDtoSchema>;
export const collectDtoSchema = z.object({
  voucherId: z.string(),
});
