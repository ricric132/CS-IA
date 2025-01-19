-- DropForeignKey
ALTER TABLE "Subtask" DROP CONSTRAINT "Subtask_taskid_fkey";

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_taskid_fkey" FOREIGN KEY ("taskid") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
