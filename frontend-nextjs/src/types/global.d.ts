interface IFetchReducerState {
  loading: boolean;
  error: null | string;
}

interface IReduxState {
  user: IUserReducerState;
  login: ILoginReducerState;
  register: IRegisterReducerState;
  transactions: ITransactionReducerState;
  modal: IModalReducerState;
}
