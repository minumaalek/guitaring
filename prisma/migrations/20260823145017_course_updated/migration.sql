/*
  Warnings:

  - You are about to drop the `_CourseToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newPrice` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_CourseToUser_B_index";

-- DropIndex
DROP INDEX "_CourseToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CourseToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_StudentCourses" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StudentCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "originalPrice" INTEGER NOT NULL,
    "newPrice" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "teacherId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("categoryId", "id", "slug", "title") SELECT "categoryId", "id", "slug", "title" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_StudentCourses_AB_unique" ON "_StudentCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentCourses_B_index" ON "_StudentCourses"("B");
