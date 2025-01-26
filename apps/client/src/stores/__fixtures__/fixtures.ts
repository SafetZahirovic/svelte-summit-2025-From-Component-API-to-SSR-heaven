import type {
  CollectDtoSchema,
  VoucherDtoSchema,
} from "@panteautomaten/server-types";
import { randomUUID } from "node:crypto";

export const voucherDto: VoucherDtoSchema = {
  bottlesDeposited: 30,
  credit: 86,
};

export const collectDto: CollectDtoSchema = {
  voucherId: randomUUID(),
};
