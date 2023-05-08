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

interface ILoginData {
  username: string;
  password: string;
}

interface IRegisterData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}