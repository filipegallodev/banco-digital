import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IUser {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  accountId: number;
}

type TProperty = string | number | undefined;

export async function findUser(field: string, property: TProperty) {
  if (!property) return null;
  return await prisma.users.findUnique({
    where: {
      [field]: property,
    },
  });
}

export async function findAccount(user: IUser) {
  return await prisma.accounts.findUnique({
    where: {
      id: user.accountId,
    },
  });
}
