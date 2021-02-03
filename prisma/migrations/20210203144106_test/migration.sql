-- CreateTable
CREATE TABLE "admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Description" TEXT,
    "Lieux" TEXT NOT NULL,
    "Picture1" TEXT,
    "Picture2" TEXT,
    "Picture3" TEXT,
    "Price" INTEGER NOT NULL,
    "RoyalFamilyId" INTEGER NOT NULL,
    FOREIGN KEY ("RoyalFamilyId") REFERENCES "RoyalFamily" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RoyalFamily" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "RoyalTitle" TEXT,
    "Picture" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "admin.email_unique" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Properties.Title_unique" ON "Properties"("Title");
