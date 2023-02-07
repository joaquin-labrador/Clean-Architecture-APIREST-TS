/*
  Warnings:

  - Added the required column `allProductsCost` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "allProductsCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalCost" DOUBLE PRECISION NOT NULL;
