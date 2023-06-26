interface IInstallment {
  amount: number;
  dueDay: number;
}

interface ILoanForm {
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

interface ILoan {
  id: string;
  value: string;
  debt: string;
  requestedAt: string;
  installmentAmount: number;
  installmentDueDay: number;
  installmentValue: string;
  requesterId: string;
}

interface ILoanFetch {
  loans: ILoan[];
  nextLoan: number;
}

interface ILoanFilter {
  start: string;
  end: string;
}
