/*
  Warnings:

  - You are about to drop the column `email` on the `UserDetail` table. All the data in the column will be lost.
  - Added the required column `id` to the `UserDetail` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserDetail" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    CONSTRAINT "UserDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserDetail" ("city", "country", "name") SELECT "city", "country", "name" FROM "UserDetail";
DROP TABLE "UserDetail";
ALTER TABLE "new_UserDetail" RENAME TO "UserDetail";
CREATE UNIQUE INDEX "UserDetail_name_key" ON "UserDetail"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
