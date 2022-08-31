-- CreateTable
CREATE TABLE "games" (
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "developer" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);
