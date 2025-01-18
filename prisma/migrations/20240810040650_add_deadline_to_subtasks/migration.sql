/*
  Warnings:

  - Added the required column `deadline` to the `Subtask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subtask" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;
