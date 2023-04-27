import { PrismaClient, User } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

type TProperty = string | number | undefined;

interface IRegisterData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export async function createUser({
  username,
  password,
  firstName,
  lastName,
}: IRegisterData) {
  try {
    const saltRounds = 10;
    const hashedPassword = hashSync(password, saltRounds);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        account: {
          create: {
            balance: 100,
          },
        },
      },
      include: {
        account: true,
      },
    });
    return user;
  } catch (error) {
    return;
  }
}

export async function findUser(field: string, property: TProperty) {
  if (!property) return null;
  try {
    const user = await prisma.user.findUnique({
      where: {
        [field]: property,
      },
    });
    return user;
  } catch (error) {
    return;
  }
}

export async function findAccount(user: User) {
  try {
    const account = await prisma.account.findUnique({
      where: {
        id: user.accountId,
      },
    });
    return account;
  } catch (error) {
    return;
  }
}

export async function findTransactions(field: string, user: User) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        [field]: user.accountId,
      },
    });
    return transactions;
  } catch (error) {
    return;
  }
}
