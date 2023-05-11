interface IUserReducerState {
  loading: boolean;
  data: {
    validToken: null | boolean;
    user: null | {
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
      loan?: string;
    };
    status: null | string;
  };
  error: null | string;
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

interface IEmailUpdateFormData {
  oldEmail: string;
  newEmail: string;
}

interface IPasswordUpdateFormData {
  oldPassword: string;
  newPassword: string;
}
