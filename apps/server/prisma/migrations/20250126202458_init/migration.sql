-- CreateEnum
CREATE TYPE "BottleType" AS ENUM ('LARGE', 'SMALL');

-- CreateTable
CREATE TABLE "Voucher" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credit" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bottle" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bottleType" "BottleType" NOT NULL,
    "price" INTEGER NOT NULL,
    "voucherId" TEXT NOT NULL,

    CONSTRAINT "Bottle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bottle" ADD CONSTRAINT "Bottle_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
