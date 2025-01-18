/*
  Warnings:

  - You are about to drop the `_ProjectToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "ProjectRole" ADD VALUE 'PENDING';

-- DropForeignKey
ALTER TABLE "_ProjectToUser" DROP CONSTRAINT "_ProjectToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToUser" DROP CONSTRAINT "_ProjectToUser_B_fkey";

-- DropTable
DROP TABLE "_ProjectToUser";
