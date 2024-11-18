-- AlterTable
CREATE SEQUENCE onramptransaction_id_seq;
ALTER TABLE "OnRampTransaction" ALTER COLUMN "id" SET DEFAULT nextval('onramptransaction_id_seq');
ALTER SEQUENCE onramptransaction_id_seq OWNED BY "OnRampTransaction"."id";
