-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "onramptransaction_id_seq";
