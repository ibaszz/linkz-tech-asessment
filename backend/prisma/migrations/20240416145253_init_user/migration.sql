-- CreateTable
CREATE TABLE "User" (
    "uuid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "latestLogin" DATE,
    "deletedAt" DATE,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);
