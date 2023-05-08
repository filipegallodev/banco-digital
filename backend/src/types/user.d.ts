export interface IUserUpdateFormData {
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

export interface IEmailUpdateFormData {
  oldEmail: string;
  newEmail: string;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IRegisterData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
