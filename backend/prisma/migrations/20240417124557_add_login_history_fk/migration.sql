/*
  Warnings:

  - Added the required column `userId` to the `LoginHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoginHistory" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
