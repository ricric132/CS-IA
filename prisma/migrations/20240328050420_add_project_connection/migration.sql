/*
  Warnings:

  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LessonToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('OWNER', 'ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "_LessonToUser" DROP CONSTRAINT "_LessonToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LessonToUser" DROP CONSTRAINT "_LessonToUser_B_fkey";

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "_LessonToUser";

-- CreateTable
CREATE TABLE "UserProject" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "projectid" TEXT NOT NULL,
    "role" "ProjectRole" NOT NULL,

    CONSTRAINT "UserProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
