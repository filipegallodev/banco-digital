/*
  Warnings:

  - You are about to drop the column `accountid` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_accountid_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "accountid";

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "balance" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
