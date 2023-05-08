interface ITransaction {
  id: string;
  debitedAccountId: number;
  creditedAccountId: number;
  value: string;
  createdAt: Date;
}

interface ITransactionData {
  value: string;
  target: string;
}
