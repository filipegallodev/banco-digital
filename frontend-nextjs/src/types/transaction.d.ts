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
    attention: null | string;
    userAccountId: null | string;
    allTransactions?: null | ITransaction[];
    totalTransferValue: {
      receivedValue: null | string;
      sentValue: null | string;
      total: null | string;
    };
    filteredTransactions: null | ITransaction[];
  };
  error: null | string;
}

interface ITransactionFilter {
  type: string;
  start: string;
  end: string;
}
