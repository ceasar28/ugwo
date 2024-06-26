/*
  Warnings:

  - You are about to drop the column `clientId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `to_Id` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "clientId",
ADD COLUMN     "clientAddress" TEXT,
ADD COLUMN     "receivingAddress" TEXT;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "to_Id",
ADD COLUMN     "payerAddress" TEXT,
ADD COLUMN     "receivingAddress" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT;
