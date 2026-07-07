/*
  Warnings:

  - You are about to drop the column `TId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `TId` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TId" DROP CONSTRAINT "TId_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "TId",
ADD COLUMN     "tid" TEXT;

-- DropTable
DROP TABLE "TId";

-- CreateTable
CREATE TABLE "Tid" (
    "uid" TEXT NOT NULL,
    "prefix" "Prefix" NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Tid_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tid_userId_key" ON "Tid"("userId");

-- AddForeignKey
ALTER TABLE "Tid" ADD CONSTRAINT "Tid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
