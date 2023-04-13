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

interface ILoginState {
  loading: boolean;
  data: null | {
    auth: boolean;
    token: string;
  };
  error: null | string;
}

interface IUserState {
  loading: boolean;
  data: null | {
    validToken: boolean;
    user: {
      username: string;
      balance: string;
      firstName: string;
      lastName: string;
    };
  };
  error: null | string;
}

interface IRegisterState {
  loading: boolean;
  data: null | {
    status: string;
  };
  error: null | string;
}

interface IReduxState {
  user: IUserState;
  login: ILoginState;
  register: IRegisterState;
}
