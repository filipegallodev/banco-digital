import { Account, Transaction } from "@prisma/client";
import Decimal from "decimal.js";
import currencyFormatter from "./currencyFormatter";

export default function getTotalTransferValue(
  account: Account,
  transactions: Transaction[]
) {
  const totalValue = transactions.reduce((accumulator, transaction) => {
    const accumulatorDecimal = new Decimal(accumulator);
    if (account.id === transaction.destinationAccountId) {
      return accumulatorDecimal.plus(transaction.value);
    }
    return accumulatorDecimal.minus(transaction.value);
  }, new Decimal(0));
  return currencyFormatter("pt-BR", "BRL", totalValue);
}
