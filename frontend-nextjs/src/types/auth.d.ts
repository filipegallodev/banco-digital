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

interface ILoginReducerState {
  loading: boolean;
  data: null | {
    status: null | string;
    token: null | string;
  };
  error: null | string;
}

interface IRegisterReducerState {
  loading: boolean;
  data: null | {
    status: null | string;
  };
  error: null | string;
}
