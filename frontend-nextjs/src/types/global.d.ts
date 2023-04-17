interface ILogin {
  username: string;
  password: string;
}

interface IRegisterData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface ITransactionData {
  value: string;
  target: string;
}

interface IFetchState {
  loading: boolean;
  error: null | string;
}

interface ILoginState extends IFetchState {
  data: null | {
    auth: boolean;
    token: string;
  };
}

interface IUserState extends IFetchState {
  data: null | {
    validToken: boolean;
    user: {
      username: string;
      balance: string;
      firstName: string;
      lastName: string;
    };
  };
}

interface IRegisterState extends IFetchState {
  data: null | {
    status: string;
  };
}

interface ITransactionState extends IFetchState {
  data: null | {
    status: string;
  };
}

interface IReduxState {
  user: IUserState;
  login: ILoginState;
  register: IRegisterState;
  transactions: ITransactionState;
}
