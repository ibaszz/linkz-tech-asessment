-- CreateTable
CREATE TABLE "Favorite" (
    "uuid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "catId" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Cats" (
    "id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Cats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Cats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
