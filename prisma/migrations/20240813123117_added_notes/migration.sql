-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "projectid" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_id_key" ON "Note"("id");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
