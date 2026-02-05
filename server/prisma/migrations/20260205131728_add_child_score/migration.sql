/*
  Warnings:

  - You are about to drop the column `severity` on the `Incident` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Child" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "severity";
