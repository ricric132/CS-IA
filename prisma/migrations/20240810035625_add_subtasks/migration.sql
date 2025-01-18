-- CreateTable
CREATE TABLE "Subtask" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "taskid" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Subtask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subtask_id_key" ON "Subtask"("id");

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_taskid_fkey" FOREIGN KEY ("taskid") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
