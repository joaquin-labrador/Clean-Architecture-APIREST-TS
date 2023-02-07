/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SaleDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_userId_fkey";

-- DropForeignKey
ALTER TABLE "SaleDetails" DROP CONSTRAINT "SaleDetails_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleDetails" DROP CONSTRAINT "SaleDetails_saleId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userCategoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "productId" DROP DEFAULT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "productCategoryId" DROP NOT NULL,
ALTER COLUMN "productCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("productId");
DROP SEQUENCE "Product_productId_seq";

-- AlterTable
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_pkey",
ALTER COLUMN "productCategoryId" DROP DEFAULT,
ALTER COLUMN "productCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productCategoryId");
DROP SEQUENCE "ProductCategory_productCategoryId_seq";

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SaleDetails" DROP CONSTRAINT "SaleDetails_pkey",
ALTER COLUMN "saleDetailsId" DROP DEFAULT,
ALTER COLUMN "saleDetailsId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "saleId" DROP NOT NULL,
ADD CONSTRAINT "SaleDetails_pkey" PRIMARY KEY ("saleDetailsId");
DROP SEQUENCE "SaleDetails_saleDetailsId_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "userId" DROP DEFAULT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "userCategoryId" DROP NOT NULL,
ALTER COLUMN "userCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");
DROP SEQUENCE "User_userId_seq";

-- AlterTable
ALTER TABLE "UserCategory" DROP CONSTRAINT "UserCategory_pkey",
ALTER COLUMN "userCategoryId" DROP DEFAULT,
ALTER COLUMN "userCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserCategory_pkey" PRIMARY KEY ("userCategoryId");
DROP SEQUENCE "UserCategory_userCategoryId_seq";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("productCategoryId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userCategoryId_fkey" FOREIGN KEY ("userCategoryId") REFERENCES "UserCategory"("userCategoryId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("saleId") ON DELETE SET NULL ON UPDATE CASCADE;
