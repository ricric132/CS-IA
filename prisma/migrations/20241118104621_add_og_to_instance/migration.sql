/*
  Warnings:

  - Added the required column `originalid` to the `TaskStatusInstance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskStatusInstance" ADD COLUMN     "originalid" TEXT NOT NULL;
