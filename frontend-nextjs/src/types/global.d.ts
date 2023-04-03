interface ILogin {
  username: string;
  password: string;
}

interface ILoginState {
  loading: boolean;
  data: null | {
    auth: boolean;
    token: string;
  };
  error: null | string;
}

interface IReduxState {
  login: ILoginState;
}
