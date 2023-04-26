import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

type TProperty = string | number | undefined;

export async function findUser(field: string, property: TProperty) {
  if (!property) return null;
  return await prisma.user.findUnique({
    where: {
      [field]: property,
    },
  });
}

export async function findAccount(user: User) {
  return await prisma.account.findUnique({
    where: {
      id: user.accountId,
    },
  });
}

export async function findTransactions(field: string, user: User) {
  return await prisma.transaction.findMany({
    where: {
      [field]: user.accountId,
    },
  });
}
