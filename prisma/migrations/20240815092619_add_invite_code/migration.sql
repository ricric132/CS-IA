/*
  Warnings:

  - You are about to drop the `ProjectInvite` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[inviteCode]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inviteCode` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "inviteCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProjectInvite";

-- CreateIndex
CREATE UNIQUE INDEX "Project_inviteCode_key" ON "Project"("inviteCode");
