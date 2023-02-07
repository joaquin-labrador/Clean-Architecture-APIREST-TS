/*
  Warnings:

  - The primary key for the `UserCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `userCategoryId` column on the `UserCategory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userCategoryId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userCategoryId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userCategoryId",
ADD COLUMN     "userCategoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserCategory" DROP CONSTRAINT "UserCategory_pkey",
DROP COLUMN "userCategoryId",
ADD COLUMN     "userCategoryId" SERIAL NOT NULL,
ADD CONSTRAINT "UserCategory_pkey" PRIMARY KEY ("userCategoryId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userCategoryId_fkey" FOREIGN KEY ("userCategoryId") REFERENCES "UserCategory"("userCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
