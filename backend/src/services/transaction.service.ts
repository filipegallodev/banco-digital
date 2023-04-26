import { PrismaClient } from "@prisma/client";
import Decimal from "decimal.js";
import checkAuth from "../middleware/checkAuth.middleware";
import * as PrismaUtil from "../utils/prisma.util";
import transactionsFormatter from "../helpers/transactionsFormatters";
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
  if (originUser.accountId === destinyUser.accountId)
    return {
      status: "Não é possível realizar uma transferência para a própria conta.",
      success: false,
    };
  const originUserAccount = await PrismaUtil.findAccount(originUser);
  const destinationUserAccount = await PrismaUtil.findAccount(destinyUser);
  if (!originUserAccount?.balance)
    return { status: "Saldo insuficiente.", success: false };
  if (!destinationUserAccount?.balance) return;
  const transactionValue = new Decimal(value);
  const originUserAccountBalance = originUserAccount?.balance;
  const destinationUserAccountBalance = new Decimal(destinationUserAccount?.balance);
  if (transactionValue.greaterThan(originUserAccount?.balance))
    return { status: "Saldo insuficiente.", success: false };
  await prisma.account.update({
    where: {
      id: originUserAccount.id,
    },
    data: {
      balance: originUserAccountBalance.minus(transactionValue),
    },
  });
  await prisma.account.update({
    where: {
      id: destinationUserAccount.id,
    },
    data: {
      balance: transactionValue.plus(destinationUserAccountBalance),
    },
  });
  await prisma.transaction.create({
    data: {
      originAccountId: originUserAccount.id,
      destinationAccountId: destinationUserAccount.id,
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
    "destinationAccountId",
    dbUser
  );
  const sentTransactions = await PrismaUtil.findTransactions(
    "originAccountId",
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
    receivedTransactions: transactionsFormatter(receivedTransactions),
    sentTransactions: transactionsFormatter(sentTransactions),
    allTransactions: transactionsFormatter(allTransactions),
    totalTransferValue,
    success: true,
  };
}
