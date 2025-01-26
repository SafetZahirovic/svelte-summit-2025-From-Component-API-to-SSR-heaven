import {
  rawVoucherDtoSchema,
  voucherDtoSchema,
  type RawVoucherDtoSchema,
} from "@panteautomaten/server-types";
import { z } from "zod";

export type VoucherStore = ReturnType<typeof createVoucherStore>;
export type TypeOfBottle = "small" | "large" | undefined;

type VoucherStoreState = {
  bottlesDeposited: number;
  credit: number;
};

export const createVoucherStore = () => {
  const state = $state<VoucherStoreState>({
    bottlesDeposited: 0,
    credit: 0,
  });

  const allVouchersState = $state<RawVoucherDtoSchema[]>([]);

  return {
    get state() {
      return state;
    },
    get allVouchers() {
      return allVouchersState;
    },
    async updateVoucher(voucherId: string) {
      const response = await fetch(
        `http://localhost:3000/api/voucher/${voucherId}`
      );
      if (!response.ok) {
        throw new Error("Voucher not found");
      }

      const data = voucherDtoSchema.parse(await response.json());
      state.bottlesDeposited = data.bottlesDeposited ?? 0;
      state.credit = data.credit ?? 0;
    },

    async getAllVouchers() {
      const response = await fetch("http://localhost:3000/api/voucher");
      if (!response.ok) {
        throw new Error("Failed to fetch vouchers");
      }

      const data = z.array(rawVoucherDtoSchema).parse(await response.json());
      data.forEach((voucher) => {
        allVouchersState?.push(voucher);
      });
    },

    updateVoucherCredit(credit: number) {
      state.credit = credit;
    },
  };
};
