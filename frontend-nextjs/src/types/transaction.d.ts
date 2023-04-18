interface ITransactionFormData {
  value: string;
  target: string;
}

interface ITransaction {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: string;
  createdAt: string;
}

interface ITransactionReducerState extends IFetchReducerState {
  data: null | {
    status: string;
    receivedTransactions?: ITransaction[] | null;
    sentTransactions?: ITransaction[] | null;
    allTransactions?: ITransaction[];
    success?: boolean;
  };
}
