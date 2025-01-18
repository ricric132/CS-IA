/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT;

-- CreateTable
CREATE TABLE "PendingUsers" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT,

    CONSTRAINT "PendingUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PendingUsers_id_key" ON "PendingUsers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PendingUsers_username_key" ON "PendingUsers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PendingUsers_email_key" ON "PendingUsers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
