interface ILoan {
  loan: {
    requested: number;
    debt: number;
  };
  installment: {
    amount: number;
    dueDay: number;
    value: number;
  };
}
