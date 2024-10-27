/*
  Warnings:

  - Added the required column `amount` to the `P2PTransfers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `P2PTransfers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "P2PTransfers" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
