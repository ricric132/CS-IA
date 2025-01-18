-- CreateTable
CREATE TABLE "FullRecord" (
    "id" TEXT NOT NULL,
    "latestid" TEXT NOT NULL,
    "compareid" TEXT NOT NULL,

    CONSTRAINT "FullRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FullRecord_id_key" ON "FullRecord"("id");

-- AddForeignKey
ALTER TABLE "FullRecord" ADD CONSTRAINT "FullRecord_latestid_fkey" FOREIGN KEY ("latestid") REFERENCES "ProjectStatusInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullRecord" ADD CONSTRAINT "FullRecord_compareid_fkey" FOREIGN KEY ("compareid") REFERENCES "ProjectStatusInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
