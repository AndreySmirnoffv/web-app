-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "tonBalance" INTEGER NOT NULL,
    "gameBalance" INTEGER NOT NULL,
    "payed" BOOLEAN NOT NULL
);
