import type { PrismaClient } from "@prisma/client";
import { beforeEach, describe, expect, it } from "vitest";
import { type DeepMockProxy, mockDeep } from "vitest-mock-extended";
import createBottleService from "../bottle.ts";

describe("Bottle Service", () => {
  let prismaClient: DeepMockProxy<PrismaClient>;

  beforeEach(() => {
    prismaClient = mockDeep();
  });

  describe("collectBottles", () => {
    it("should create a voucher with the correct credit", async () => {
      const bottleService = createBottleService(prismaClient);

      const date = new Date();
      const amountOfBottles = { large: 1, small: 2 };
      const amountOfMoney = 10;
      const voucherId = "voucherId";
      const expectedVoucher = {
        id: voucherId,
        credit: 0,
        createdAt: date,
      };
      prismaClient.voucher.create.mockResolvedValue(expectedVoucher);

      const voucher = await bottleService.collectBottles({
        amountOfBottles,
        amountOfMoney,
      });

      expect(voucher).toEqual(expectedVoucher);
      expect(prismaClient.voucher.create).toHaveBeenCalledWith({
        data: {
          credit: 0,
        },
      });
      expect(prismaClient.bottle.create).toHaveBeenCalledTimes(3);
      expect(prismaClient.bottle.create).toHaveBeenCalledWith({
        data: {
          voucher: {
            connect: expectedVoucher,
          },
          bottleType: "LARGE",
          price: 3,
        },
      });
      expect(prismaClient.bottle.create).toHaveBeenCalledWith({
        data: {
          voucher: {
            connect: expectedVoucher,
          },
          bottleType: "SMALL",
          price: 2,
        },
      });
    });

    it("should update the voucher with the correct credit", async () => {
      const bottleService = createBottleService(prismaClient);

      const date = new Date();
      const amountOfBottles = { large: 1, small: 2 };
      const amountOfMoney = 10;
      const voucherId = "voucherId";
      const expectedVoucher = {
        id: voucherId,
        credit: 0,
        createdAt: date,
      };
      prismaClient.voucher.create.mockResolvedValue(expectedVoucher);

      await bottleService.collectBottles({
        amountOfBottles,
        amountOfMoney,
      });

      expect(prismaClient.voucher.update).toHaveBeenCalledWith({
        where: {
          id: voucherId,
        },
        data: {
          credit: amountOfMoney,
        },
      });
    });

    it("should return the voucher", async () => {
      const bottleService = createBottleService(prismaClient);

      const date = new Date();
      const amountOfBottles = { large: 1, small: 2 };
      const amountOfMoney = 10;
      const voucherId = "voucherId";
      const expectedVoucher = {
        id: voucherId,
        credit: 0,
        createdAt: date,
      };
      prismaClient.voucher.create.mockResolvedValue(expectedVoucher);

      const voucher = await bottleService.collectBottles({
        amountOfBottles,
        amountOfMoney,
      });

      expect(voucher).toEqual(expectedVoucher);
    });

    it("should throw an error if the voucher creation fails", async () => {
      const bottleService = createBottleService(prismaClient);

      prismaClient.voucher.create.mockRejectedValue(
        new Error("Failed to create voucher")
      );

      await expect(
        bottleService.collectBottles({
          amountOfBottles: { large: 1, small: 2 },
          amountOfMoney: 10,
        })
      ).rejects.toThrowError("Failed to create voucher");
    });
  });
});
