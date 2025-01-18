/*
  Warnings:

  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INCOMPLETE', 'IN_PROCESS', 'COMPLETE');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL;
