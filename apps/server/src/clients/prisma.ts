import { PrismaClient } from "@prisma/client";

export type LocalPrismaClient = ReturnType<typeof createPrismaClient>;
export default async function createPrismaClient() {
  const prisma = new PrismaClient();
  await prisma.$connect();

  function getClient() {
    return prisma;
  }
  function closeClient() {
    return prisma.$disconnect();
  }

  return {
    getClient,
    closeClient,
  };
}
