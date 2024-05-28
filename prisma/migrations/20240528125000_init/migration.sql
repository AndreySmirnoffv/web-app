/*
  Warnings:

  - You are about to drop the column `payed` on the `user` table. All the data in the column will be lost.
  - Added the required column `isAdmin` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPayed` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "tonBalance" INTEGER NOT NULL,
    "gameBalance" INTEGER NOT NULL,
    "isPayed" BOOLEAN NOT NULL,
    "isAdmin" BOOLEAN NOT NULL
);
INSERT INTO "new_user" ("gameBalance", "id", "tonBalance", "username") SELECT "gameBalance", "id", "tonBalance", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
PRAGMA foreign_key_check("user");
PRAGMA foreign_keys=ON;
