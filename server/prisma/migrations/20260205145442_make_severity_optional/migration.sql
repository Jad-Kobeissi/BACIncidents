/*
  Warnings:

  - You are about to drop the column `score` on the `Child` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Child" DROP COLUMN "score";

-- AlterTable
ALTER TABLE "Incident" ALTER COLUMN "severity" DROP NOT NULL;
