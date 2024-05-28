-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "tonBalance" INTEGER NOT NULL,
    "gameBalance" INTEGER NOT NULL,
    "isPayed" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_user" ("gameBalance", "id", "isAdmin", "isPayed", "tonBalance", "username") SELECT "gameBalance", "id", "isAdmin", "isPayed", "tonBalance", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
PRAGMA foreign_key_check("user");
PRAGMA foreign_keys=ON;
