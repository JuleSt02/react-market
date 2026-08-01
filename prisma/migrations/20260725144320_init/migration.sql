/*
  Warnings:

  - You are about to drop the column `userId` on the `Sauce` table. All the data in the column will be lost.
  - Added the required column `sellerId` to the `Sauce` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sauce" DROP CONSTRAINT "Sauce_userId_fkey";

-- AlterTable
ALTER TABLE "Sauce" DROP COLUMN "userId",
ADD COLUMN     "sellerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Sauce" ADD CONSTRAINT "Sauce_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
