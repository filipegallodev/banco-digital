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
