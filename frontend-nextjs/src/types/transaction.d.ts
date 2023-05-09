interface ITransactionFormData {
  value: string;
  target: string;
}

interface ITransaction {
  id: number;
  value: string;
  createdAt: string;
  destinationAccountId: string;
  originAccountId: string;
}

interface ITransactionReducerState {
  loading: boolean;
  data: null | {
    status: null | string;
    allTransactions?: undefined | ITransaction[];
    totalTransferValue: undefined | string;
  };
  error: null | string;
}
