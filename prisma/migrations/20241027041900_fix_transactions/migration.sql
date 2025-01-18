/*
  Warnings:

  - Added the required column `action` to the `TransactionRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `TransactionRecord` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionAction" AS ENUM ('CREATE', 'COMPLETE', 'STARTED', 'REMOVE');

-- AlterTable
ALTER TABLE "TransactionRecord" ADD COLUMN     "action" "TransactionAction" NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
