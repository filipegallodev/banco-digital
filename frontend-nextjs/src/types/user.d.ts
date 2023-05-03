interface IUserReducerState extends IFetchReducerState {
  data: null | {
    validToken: boolean;
    user: {
      username: string;
      balance: string;
      firstName: string;
      lastName: string;
      accountId: string;
      birth?: string;
      phoneNumber?: string;
      city?: string;
      state?: string;
      income?: string;
      job?: string;
    };
    status: string;
  };
}

interface IUserUpdateFormData {
  firstName: string;
  lastName: string;
  username: string;
  accountId: string;
  birth?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  income?: string;
  job?: string;
}
