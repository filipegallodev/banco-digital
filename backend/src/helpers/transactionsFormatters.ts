import currencyFormatter from "./currencyFormatter";

interface ITransaction {
  id: string;
  debitedAccountId: number;
  creditedAccountId: number;
  value: string;
  createdAt: Date;
}

export default function transactionsFormatter(transactions: any[]) {
  const newList = transactionCurrencyFormatter(transactions);
  return transactionDateFormatter(newList);
}

function transactionCurrencyFormatter(transactions: any[]) {
  const newList = transactions
    .map((transaction: ITransaction) => {
      return {
        ...transaction,
        value: currencyFormatter("pt-BR", "BRL", transaction.value),
      };
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return newList;
}

function transactionDateFormatter(transactions: ITransaction[]) {
  const newList = transactions.map((transaction) => {
    return {
      ...transaction,
      createdAt: transaction.createdAt.toLocaleString(),
    };
  });
  return newList;
}
