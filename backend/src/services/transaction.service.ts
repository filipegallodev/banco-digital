import { PrismaClient } from "@prisma/client";
import validateToken from "../helpers/validateToken";
import Decimal from "decimal.js";

const prisma = new PrismaClient();

interface ITransactionData {
  value: string;
  target: string;
}

export async function create(
  body: ITransactionData,
  authorization: string | undefined
) {
  const userId = validateToken(authorization);
  const { target, value } = body;
  const originUser = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  const targetUser = await prisma.users.findUnique({
    where: {
      username: target,
    },
  });
  if (!originUser || !targetUser) return { status: "Usuário não encontrado." };
  const originUserAccount = await prisma.accounts.findUnique({
    where: {
      id: originUser.accountId,
    },
  });
  const targetUserAccount = await prisma.accounts.findUnique({
    where: {
      id: targetUser.accountId,
    },
  });
  if (!originUserAccount?.balance) return { status: "Saldo insuficiente." };
  if (!targetUserAccount?.balance) return;
  const transactionValue = new Decimal(value);
  const originUserAccountBalance = originUserAccount?.balance;
  const targetUserAccountBalance = new Decimal(targetUserAccount?.balance);
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
      id: targetUserAccount.id,
    },
    data: {
      balance: transactionValue.plus(targetUserAccountBalance),
    },
  });
  await prisma.transactions.create({
    data: {
      creditedAccountId: originUserAccount.id,
      debitedAccountId: targetUserAccount.id,
      value: transactionValue,
    },
  });
  return { status: "Transferência realizada com sucesso.", success: true };
}
