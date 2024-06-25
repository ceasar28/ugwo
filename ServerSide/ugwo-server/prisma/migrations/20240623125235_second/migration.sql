/*
  Warnings:

  - You are about to drop the column `chat_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `BookingSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SearchResults` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[displayName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookingSession" DROP CONSTRAINT "BookingSession_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "SearchResults" DROP CONSTRAINT "SearchResults_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_chat_id_fkey";

-- DropIndex
DROP INDEX "User_chat_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "chat_id",
DROP COLUMN "country",
DROP COLUMN "currency",
DROP COLUMN "language",
DROP COLUMN "username",
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL;

-- DropTable
DROP TABLE "BookingSession";

-- DropTable
DROP TABLE "SearchResults";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "departureCity" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_displayName_key" ON "User"("displayName");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
