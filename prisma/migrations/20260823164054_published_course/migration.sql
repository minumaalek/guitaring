/*
  Warnings:

  - Added the required column `published` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "originalPrice" INTEGER NOT NULL,
    "newPrice" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "teacherId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("categoryId", "content", "description", "id", "newPrice", "originalPrice", "slug", "teacherId", "title", "userId") SELECT "categoryId", "content", "description", "id", "newPrice", "originalPrice", "slug", "teacherId", "title", "userId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
