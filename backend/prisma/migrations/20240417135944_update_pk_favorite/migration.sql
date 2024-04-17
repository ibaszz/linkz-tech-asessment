/*
  Warnings:

  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uuid` on the `Favorite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_pkey",
DROP COLUMN "uuid",
ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId", "catId");
