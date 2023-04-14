/*
  Warnings:

  - Changed the type of `balance` on the `accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `value` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "balance",
ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "value",
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;
