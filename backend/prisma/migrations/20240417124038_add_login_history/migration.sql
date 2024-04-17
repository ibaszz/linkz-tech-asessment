-- AlterTable
ALTER TABLE "User" ALTER COLUMN "latestLogin" SET DATA TYPE TIMESTAMP,
ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP;

-- CreateTable
CREATE TABLE "LoginHistory" (
    "uuid" TEXT NOT NULL,
    "dateTime" TIMESTAMP NOT NULL,

    CONSTRAINT "LoginHistory_pkey" PRIMARY KEY ("uuid")
);
