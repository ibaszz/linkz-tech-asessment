/*
  Warnings:

  - The primary key for the `Cats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_catId_fkey";

-- AlterTable
ALTER TABLE "Cats" DROP CONSTRAINT "Cats_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cats_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_pkey",
ALTER COLUMN "catId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId", "catId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Cats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
