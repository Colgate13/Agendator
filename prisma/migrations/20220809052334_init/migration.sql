-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Appointments" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "user_uid" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "update_at" DATETIME NOT NULL,
    CONSTRAINT "Appointments_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "User" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_uid_key" ON "Appointments"("uid");
