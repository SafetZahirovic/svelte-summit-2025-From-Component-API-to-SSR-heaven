import type { PrismaClient } from "@prisma/client";
import { afterEach } from "node:test";
import { beforeEach, describe, expect, it } from "vitest";
import { type DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";
import { prismaVouchersFixture } from "../__fixtures__/voucher.ts";
import createVoucherService, { type VoucherService } from "../voucher.ts";

describe("Voucher Service", () => {
  let prismaClient: DeepMockProxy<PrismaClient>;
  let voucherService: VoucherService;

  beforeEach(() => {
    prismaClient = mockDeep();
    voucherService = createVoucherService(prismaClient);
  });

  afterEach(() => {
    mockReset(prismaClient);
  });
  it("should create a voucher with the correct credit", async () => {
    const amountOfMoney = 100;
    const date = new Date();
    const voucher = { id: "1", credit: amountOfMoney, createdAt: date };
    prismaClient.voucher.create.mockResolvedValue(voucher);

    const createdVoucher = await voucherService.createVoucher(amountOfMoney);

    expect(createdVoucher).toEqual(voucher);
  });

  it("should throw an error if the voucher creation fails", async () => {
    const amountOfMoney = 100;
    prismaClient.voucher.create.mockRejectedValue(
      new Error("Failed to create voucher")
    );

    await expect(voucherService.createVoucher(amountOfMoney)).rejects.toThrow(
      "Failed to create voucher"
    );
  });

  it("should get a voucher by id", async () => {
    const voucherId = "1";
    const voucher = { id: voucherId, credit: 100, createdAt: new Date() };
    prismaClient.voucher.findUnique.mockResolvedValue(voucher);

    const foundVoucher = await voucherService.getVoucherById(voucherId);

    expect(foundVoucher).toEqual(voucher);
  });

  it("should throw an error if the voucher does not exist", async () => {
    const voucherId = "1";
    prismaClient.voucher.findUnique.mockResolvedValue(null);

    await expect(voucherService.getVoucherById(voucherId)).rejects.toThrow(
      "Voucher not found"
    );
  });

  it("should get all vouchers", async () => {
    prismaClient.voucher.findMany.mockResolvedValue(prismaVouchersFixture);
    const expectedVouchers = prismaVouchersFixture.map((v) => ({
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

    const foundVouchers = await voucherService.getVouchers();

    expect(foundVouchers).toEqual(expectedVouchers);
  });

  it("should throw an error if no vouchers are found", async () => {
    prismaClient.voucher.findMany.mockResolvedValue([]);

    await expect(voucherService.getVouchers()).rejects.toThrow(
      "No vouchers found"
    );
  });
});
