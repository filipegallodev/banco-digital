import { PrismaClient } from "@prisma/client";
import Decimal from "decimal.js";
import checkAuth from "../middleware/checkAuth.middleware";
import * as PrismaUtil from "../utils/prisma.util";

const prisma = new PrismaClient();

interface ITransactionData {
  value: string;
  target: string;
}

export async function create(
  { target, value }: ITransactionData,
  authorization: string | undefined
) {
  const userId = checkAuth(authorization);
  const originUser = await PrismaUtil.findUser("id", userId);
  const destinyUser = await PrismaUtil.findUser("username", target);
  if (!originUser || !destinyUser) return { status: "Usuário não encontrado." };
  const originUserAccount = await PrismaUtil.findAccount(originUser);
  const destinyUserAccount = await PrismaUtil.findAccount(destinyUser);
  if (!originUserAccount?.balance) return { status: "Saldo insuficiente." };
  if (!destinyUserAccount?.balance) return;
  const transactionValue = new Decimal(value);
  const originUserAccountBalance = originUserAccount?.balance;
  const destinyUserAccountBalance = new Decimal(destinyUserAccount?.balance);
  if (transactionValue.greaterThan(originUserAccount?.balance))
    return { status: "Saldo insuficiente." };
  await prisma.accounts.update({
    where: {
      id: originUserAccount.id,
    },
    data: {
      balance: originUserAccountBalance.minus(transactionValue),
    },
  });
  await prisma.accounts.update({
    where: {
      id: destinyUserAccount.id,
    },
    data: {
      balance: transactionValue.plus(destinyUserAccountBalance),
    },
  });
  await prisma.transactions.create({
    data: {
      creditedAccountId: originUserAccount.id,
      debitedAccountId: destinyUserAccount.id,
      value: transactionValue,
    },
  });
  return { status: "Transferência realizada com sucesso.", success: true };
}
