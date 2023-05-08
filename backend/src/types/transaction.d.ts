export interface ITransaction {
  id: string;
  debitedAccountId: number;
  creditedAccountId: number;
  value: string;
  createdAt: Date;
}

export interface ITransactionData {
  value: string;
  target: string;
}
