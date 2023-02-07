/*
  Warnings:

  - The primary key for the `Sale` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "SaleDetails" DROP CONSTRAINT "SaleDetails_saleId_fkey";

-- AlterTable
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_pkey",
ALTER COLUMN "saleId" DROP DEFAULT,
ALTER COLUMN "saleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sale_pkey" PRIMARY KEY ("saleId");
DROP SEQUENCE "Sale_saleId_seq";

-- AlterTable
ALTER TABLE "SaleDetails" ALTER COLUMN "saleId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("saleId") ON DELETE RESTRICT ON UPDATE CASCADE;
