interface ITransactionFormData {
  value: string;
  target: string;
}

interface ITransaction {
  id: number;
  value: string;
  createdAt: string;
  destinationAccountId: number;
  originAccountId: number;
}

interface ITransactionReducerState extends IFetchReducerState {
  data: null | {
    status: string;
    receivedTransactions?: ITransaction[] | null;
    sentTransactions?: ITransaction[] | null;
    allTransactions?: ITransaction[];
    totalTransferValue: string;
    success?: boolean;
  };
}
