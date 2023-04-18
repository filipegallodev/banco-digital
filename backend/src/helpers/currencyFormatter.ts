import { Prisma, transactions } from "@prisma/client";

export default function currencyFormatter(
  locale: string,
  currency: string,
  userBalance: Prisma.Decimal | string | undefined
) {
  return Number(userBalance).toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}

interface ITransaction {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: string;
  createdAt: Date;
}

export function currencyFormatterFromAList(list: any[]) {
  const newList = list.map((transaction: ITransaction) => {
    return {
      ...transaction,
      value: currencyFormatter("pt-BR", "BRL", transaction.value),
    };
  });
  return newList;
}
