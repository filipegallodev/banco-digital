import { Account, Transaction } from "@prisma/client";
import Decimal from "decimal.js";
import currencyFormatter from "./currencyFormatter";

export default function getTotalTransferValue(
  account: Account,
  transactions: Transaction[]
) {
  const receivedValue = transactions.reduce((accumulator, transaction) => {
    const accumulatorDecimal = new Decimal(accumulator);
    if (account.id === transaction.destinationAccountId) {
      return accumulatorDecimal.plus(transaction.value);
    }
    return accumulatorDecimal;
  }, new Decimal(0));

  const sentValue = transactions.reduce((accumulator, transaction) => {
    const accumulatorDecimal = new Decimal(accumulator);
    if (account.id === transaction.originAccountId) {
      return accumulatorDecimal.plus(transaction.value);
    }
    return accumulatorDecimal;
  }, new Decimal(0));

  return {
    receivedValue: currencyFormatter("pt-BR", "BRL", receivedValue),
    sentValue: currencyFormatter("pt-BR", "BRL", sentValue),
    total: currencyFormatter("pt-BR", "BRL", receivedValue.minus(sentValue)),
  };
}
