import { PrismaClient, users } from "@prisma/client";

const prisma = new PrismaClient();

type TProperty = string | number | undefined;

export async function findUser(field: string, property: TProperty) {
  if (!property) return null;
  return await prisma.users.findUnique({
    where: {
      [field]: property,
    },
  });
}

export async function findAccount(user: users) {
  return await prisma.accounts.findUnique({
    where: {
      id: user.accountId,
    },
  });
}

export async function findTransactions(field: string, user: users) {
  return await prisma.transactions.findMany({
    where: {
      [field]: user.id,
    },
  });
}
