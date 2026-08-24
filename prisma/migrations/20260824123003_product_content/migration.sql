/*
  Warnings:

  - You are about to drop the `_ProductToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudentCourses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `Course` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_ProductToUser_B_index";

-- DropIndex
DROP INDEX "_ProductToUser_AB_unique";

-- DropIndex
DROP INDEX "_StudentCourses_B_index";

-- DropIndex
DROP INDEX "_StudentCourses_AB_unique";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "content" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProductToUser";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_StudentCourses";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "originalPrice" INTEGER NOT NULL,
    "newPrice" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "teacherId" TEXT NOT NULL,
    CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("categoryId", "content", "description", "id", "newPrice", "originalPrice", "published", "slug", "teacherId", "title") SELECT "categoryId", "content", "description", "id", "newPrice", "originalPrice", "published", "slug", "teacherId", "title" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
