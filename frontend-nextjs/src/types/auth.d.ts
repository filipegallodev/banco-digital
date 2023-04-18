interface ILoginFormData {
  username: string;
  password: string;
}

interface IRegisterFormData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface ILoginReducerState extends IFetchReducerState {
  data: null | {
    auth: boolean;
    token: string;
  };
}

interface IRegisterReducerState extends IFetchReducerState {
  data: null | {
    status: string;
  };
}
