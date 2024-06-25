/*
  Warnings:

  - You are about to drop the column `departureCity` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `invoiceNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PAID', 'DECLINE');

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "departureCity",
ADD COLUMN     "ServiceInfo" TEXT,
ADD COLUMN     "amount" TEXT,
ADD COLUMN     "clientEmail" TEXT,
ADD COLUMN     "clientId" INTEGER,
ADD COLUMN     "clientName" TEXT,
ADD COLUMN     "invoiceNumber" BIGINT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "vendorInfo" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ALTER COLUMN "displayName" DROP NOT NULL,
ALTER COLUMN "walletAddress" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "requestNumber" BIGINT NOT NULL,
    "to_Id" INTEGER,
    "detail" TEXT,
    "amount" TEXT,
    "status" "Status" NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
