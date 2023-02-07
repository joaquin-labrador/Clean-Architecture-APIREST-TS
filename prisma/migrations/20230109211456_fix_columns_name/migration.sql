/*
  Warnings:

  - You are about to drop the column `name` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `UserCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productCategoryName]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userCategoryName]` on the table `UserCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productCategoryName` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCategoryName` to the `UserCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ProductCategory_name_key";

-- DropIndex
DROP INDEX "UserCategory_name_key";

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "name",
ADD COLUMN     "productCategoryName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserCategory" DROP COLUMN "name",
ADD COLUMN     "userCategoryName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_productCategoryName_key" ON "ProductCategory"("productCategoryName");

-- CreateIndex
CREATE UNIQUE INDEX "UserCategory_userCategoryName_key" ON "UserCategory"("userCategoryName");
