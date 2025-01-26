import type { RawVoucherDtoSchema } from "@panteautomaten/server-types";
import type { PrismaClient } from "@prisma/client";

export type VoucherService = ReturnType<typeof createVoucherService>;
export default function createVoucherService(prismaClient: PrismaClient) {
  async function createVoucher(amountOfMoney: number) {
    const voucher = await prismaClient.voucher.create({
      data: {
        credit: amountOfMoney,
      },
    });

    return voucher;
  }

  async function getVoucherById(voucherId: string) {
    const voucher = await prismaClient.voucher.findUnique({
      where: {
        id: voucherId,
      },
      include: {
        _count: {
          select: {
            bottlesDeposited: true,
          },
        },
      },
    });
    if (!voucher) {
      throw new Error("Voucher not found");
    }
    return voucher;
  }

  async function getVouchers() {
    const vouchers = await prismaClient.voucher.findMany({
      include: {
        bottlesDeposited: true,
      },
    });

    if (vouchers.length === 0) {
      throw new Error("No vouchers found");
    }

    const rawVouchersDto: RawVoucherDtoSchema[] = vouchers.map((v) => ({
      bottlesDeposited: {
        small: v.bottlesDeposited.filter((b) => b.bottleType === "SMALL")
          .length,
        large: v.bottlesDeposited.filter((b) => b.bottleType === "LARGE")
          .length,
      },
      credit: v.credit,
      createdAt: v.createdAt,
      id: v.id,
    }));

    return rawVouchersDto;
  }

  return {
    createVoucher,
    getVoucherById,
    getVouchers,
  };
}
