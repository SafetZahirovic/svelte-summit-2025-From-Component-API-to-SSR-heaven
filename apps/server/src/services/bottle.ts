import type { PrismaClient } from "@prisma/client/extension";

export type BottleService = ReturnType<typeof createBottleService>;
export default function createBottleService(prismaClient: PrismaClient) {
  async function collectBottles({
    amountOfBottles,
    amountOfMoney,
  }: {
    amountOfBottles: { large: number; small: number };
    amountOfMoney: number;
  }) {
    const voucher = await prismaClient.voucher.create({
      data: {
        credit: 0,
      },
    });

    for (let i = 0; i < amountOfBottles.large; i++) {
      await prismaClient.bottle.create({
        data: {
          voucher: {
            connect: voucher,
          },
          bottleType: "LARGE",
          price: 3,
        },
      });
    }

    for (let i = 0; i < amountOfBottles.small; i++) {
      await prismaClient.bottle.create({
        data: {
          voucher: {
            connect: voucher,
          },
          bottleType: "SMALL",
          price: 2,
        },
      });
    }

    await prismaClient.voucher.update({
      where: {
        id: voucher.id,
      },
      data: {
        credit: amountOfMoney,
      },
    });

    return voucher;
  }

  return {
    collectBottles,
  };
}
