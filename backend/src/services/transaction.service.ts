import { PrismaClient } from "@prisma/client";
import Decimal from "decimal.js";
import checkAuth from "../middleware/checkAuth.middleware";
import * as PrismaUtil from "../utils/prisma.util";
import { currencyFormatterFromAList } from "../helpers/currencyFormatter";
import getTotalTransferValue from "../helpers/getTotalTransferValue";

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
  if (!originUser || !destinyUser)
    return { status: "Usuário não encontrado.", success: false };
  const originUserAccount = await PrismaUtil.findAccount(originUser);
  const destinyUserAccount = await PrismaUtil.findAccount(destinyUser);
  if (!originUserAccount?.balance)
    return { status: "Saldo insuficiente.", success: false };
  if (!destinyUserAccount?.balance) return;
  const transactionValue = new Decimal(value);
  const originUserAccountBalance = originUserAccount?.balance;
  const destinyUserAccountBalance = new Decimal(destinyUserAccount?.balance);
  if (transactionValue.greaterThan(originUserAccount?.balance))
    return { status: "Saldo insuficiente.", success: false };
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

export async function list(authorization: string | undefined) {
  const userId = checkAuth(authorization);
  const dbUser = await PrismaUtil.findUser("id", userId);
  if (!dbUser) return { status: "Usuário não encontrado.", success: false };
  const dbUserAccount = await PrismaUtil.findAccount(dbUser);
  if (!dbUserAccount)
    return { status: "Conta não encontrada.", success: false };
  const receivedTransactions = await PrismaUtil.findTransactions(
    "debitedAccountId",
    dbUser
  );
  const sentTransactions = await PrismaUtil.findTransactions(
    "creditedAccountId",
    dbUser
  );
  if (!receivedTransactions && !sentTransactions)
    return { status: "Nenhuma transferência encontrada.", success: false };
  const allTransactions = [...receivedTransactions, ...sentTransactions];
  const totalTransferValue = getTotalTransferValue(
    dbUserAccount,
    allTransactions
  );
  return {
    status: "Busca concluída com sucesso.",
    receivedTransactions: currencyFormatterFromAList(receivedTransactions),
    sentTransactions: currencyFormatterFromAList(sentTransactions),
    allTransactions: currencyFormatterFromAList(allTransactions),
    totalTransferValue,
    success: true,
  };
}
