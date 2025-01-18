-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "userid" TEXT;

-- CreateTable
CREATE TABLE "TransactionRecord" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "projectid" TEXT NOT NULL,
    "taskid" TEXT NOT NULL,

    CONSTRAINT "TransactionRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionRecord_id_key" ON "TransactionRecord"("id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionRecord" ADD CONSTRAINT "TransactionRecord_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionRecord" ADD CONSTRAINT "TransactionRecord_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionRecord" ADD CONSTRAINT "TransactionRecord_taskid_fkey" FOREIGN KEY ("taskid") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
