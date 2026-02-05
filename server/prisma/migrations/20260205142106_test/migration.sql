/*
  Warnings:

  - Added the required column `type` to the `Incident` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('positive', 'negative', 'informational');

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "type" "Type" NOT NULL;
