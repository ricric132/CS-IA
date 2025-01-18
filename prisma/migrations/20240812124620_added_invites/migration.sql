-- CreateTable
CREATE TABLE "ProjectInvite" (
    "id" TEXT NOT NULL,
    "projectid" TEXT NOT NULL,
    "expireTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectInvite_id_key" ON "ProjectInvite"("id");
