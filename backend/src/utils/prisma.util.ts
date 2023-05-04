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

interface IUserUpdateFormData {
  firstName: string;
  lastName: string;
  username: string;
  accountId: string;
  birth?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  income?: string;
  job?: string;
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

export async function updateUser(formData: IUserUpdateFormData) {
  try {
    const user = await prisma.user.update({
      where: {
        accountId: formData.accountId,
      },
      data: {
        birth: formData.birth,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        state: formData.state,
        income: formData.income,
        job: formData.job,
      },
    });
    return user;
  } catch (error) {
    return;
  }
}

export async function deleteUser(dbUser: User) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: dbUser.id,
      },
    });
    const account = await prisma.account.delete({
      where: {
        id: dbUser.accountId,
      },
    });
    return { user, account };
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
