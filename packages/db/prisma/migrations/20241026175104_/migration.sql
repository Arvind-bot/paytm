/*
  Warnings:

  - You are about to drop the column `fromId` on the `P2PTransfers` table. All the data in the column will be lost.
  - You are about to drop the column `toId` on the `P2PTransfers` table. All the data in the column will be lost.
  - Added the required column `fromUserId` to the `P2PTransfers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `P2PTransfers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "P2PTransfers" DROP CONSTRAINT "P2PTransfers_fromId_fkey";

-- DropForeignKey
ALTER TABLE "P2PTransfers" DROP CONSTRAINT "P2PTransfers_toId_fkey";

-- AlterTable
ALTER TABLE "P2PTransfers" DROP COLUMN "fromId",
DROP COLUMN "toId",
ADD COLUMN     "fromUserId" INTEGER NOT NULL,
ADD COLUMN     "toUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "P2PTransfers" ADD CONSTRAINT "P2PTransfers_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransfers" ADD CONSTRAINT "P2PTransfers_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
