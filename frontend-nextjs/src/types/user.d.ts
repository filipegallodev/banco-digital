interface IUserReducerState extends IFetchReducerState {
  data: null | {
    validToken: boolean;
    user: {
      username: string;
      balance: string;
      firstName: string;
      lastName: string;
      accountId: number;
    };
  };
}

interface IUserUpdateFormData {
  firstName: string;
  lastName: string;
  username: string;
  accountId: number;
  birth?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  income?: string;
  job?: string;
}
