-- AlterTable
ALTER TABLE "UserProject" ADD COLUMN     "joinDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ProjectStatusInstance" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "projectid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectStatusInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskStatusInstance" (
    "id" TEXT NOT NULL,
    "instanceid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "userid" TEXT,

    CONSTRAINT "TaskStatusInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubtaskStatusInstance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "taskid" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubtaskStatusInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectStatusInstance_id_key" ON "ProjectStatusInstance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TaskStatusInstance_id_key" ON "TaskStatusInstance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubtaskStatusInstance_id_key" ON "SubtaskStatusInstance"("id");

-- AddForeignKey
ALTER TABLE "ProjectStatusInstance" ADD CONSTRAINT "ProjectStatusInstance_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskStatusInstance" ADD CONSTRAINT "TaskStatusInstance_instanceid_fkey" FOREIGN KEY ("instanceid") REFERENCES "ProjectStatusInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtaskStatusInstance" ADD CONSTRAINT "SubtaskStatusInstance_taskid_fkey" FOREIGN KEY ("taskid") REFERENCES "TaskStatusInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
