-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "OnRampTransaction_id_seq";
