/*
  Warnings:

  - You are about to drop the `FullRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FullRecord" DROP CONSTRAINT "FullRecord_compareid_fkey";

-- DropForeignKey
ALTER TABLE "FullRecord" DROP CONSTRAINT "FullRecord_latestid_fkey";

-- DropForeignKey
ALTER TABLE "ProjectStatusInstance" DROP CONSTRAINT "ProjectStatusInstance_projectid_fkey";

-- DropForeignKey
ALTER TABLE "SubtaskStatusInstance" DROP CONSTRAINT "SubtaskStatusInstance_taskid_fkey";

-- DropForeignKey
ALTER TABLE "TaskStatusInstance" DROP CONSTRAINT "TaskStatusInstance_instanceid_fkey";

-- DropForeignKey
ALTER TABLE "TransactionRecord" DROP CONSTRAINT "TransactionRecord_projectid_fkey";

-- DropForeignKey
ALTER TABLE "TransactionRecord" DROP CONSTRAINT "TransactionRecord_taskid_fkey";

-- DropForeignKey
ALTER TABLE "TransactionRecord" DROP CONSTRAINT "TransactionRecord_userid_fkey";

-- DropTable
DROP TABLE "FullRecord";

-- DropTable
DROP TABLE "TransactionRecord";

-- AddForeignKey
ALTER TABLE "ProjectStatusInstance" ADD CONSTRAINT "ProjectStatusInstance_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskStatusInstance" ADD CONSTRAINT "TaskStatusInstance_instanceid_fkey" FOREIGN KEY ("instanceid") REFERENCES "ProjectStatusInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskStatusInstance" ADD CONSTRAINT "TaskStatusInstance_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtaskStatusInstance" ADD CONSTRAINT "SubtaskStatusInstance_taskid_fkey" FOREIGN KEY ("taskid") REFERENCES "TaskStatusInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
