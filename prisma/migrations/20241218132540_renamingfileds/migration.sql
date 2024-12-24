/*
  Warnings:

  - You are about to drop the column `platformName` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Social` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `Resume` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `platform` to the `Social` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Social` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Social" DROP COLUMN "platformName",
DROP COLUMN "url",
ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Resume_slug_key" ON "Resume"("slug");
