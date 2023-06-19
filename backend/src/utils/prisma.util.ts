import { PrismaClient, User } from "@prisma/client";
import { hashSync } from "bcrypt";
import {
  IRegisterData,
  IUserUpdateFormData,
  IEmailUpdateFormData,
  IPasswordUpdateFormData,
} from "../types/user";
import Decimal from "decimal.js";

const prisma = new PrismaClient();

type TProperty = string | number | undefined;

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

export async function updateEmail(formData: IEmailUpdateFormData) {
  try {
    const user = await prisma.user.update({
      where: {
        username: formData.oldEmail,
      },
      data: {
        username: formData.newEmail,
      },
    });
    return user;
  } catch (error) {
    return;
  }
}

export async function updatePassword(
  formData: IPasswordUpdateFormData,
  user: User
) {
  try {
    const saltRounds = 10;
    const hashedPassword = hashSync(formData.newPassword, saltRounds);
    const updatedUser = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        password: hashedPassword,
      },
    });
    return updatedUser;
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

export async function createLoan(loanValue: number, user: User) {
  try {
    const account = await prisma.account.findUnique({
      where: {
        id: user.accountId,
      },
    });
    const updatedAccount = await prisma.account.update({
      where: {
        id: user.accountId,
      },
      data: {
        balance: new Decimal(account?.balance ? account?.balance : 0).plus(
          new Decimal(loanValue)
        ),
      },
    });
    return updatedAccount;
  } catch (error) {
    return;
  }
}
