export interface ILoan {
  loan: {
    debt: number;
    requested: number;
  };
  installment: {
    amount: number;
    dueDay: number;
    value: number;
  };
}