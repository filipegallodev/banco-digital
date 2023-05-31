import React from "react";
import * as Styled from "@/components/styles/Components.styled";

interface IProps {
  customLoan: number;
  setCustomLoan: React.Dispatch<React.SetStateAction<any>>;
  loan: number;
}

const LoanValue = ({ customLoan, setCustomLoan, loan }: IProps) => {
  function handleInputChange(value: string | undefined) {
    const valueNumber = Number(value);
    if (!loan) return;
    if (valueNumber <= loan) {
      setCustomLoan(valueNumber);
    }
    if (valueNumber > loan) {
      setCustomLoan(25000);
    }
    if (valueNumber < 50) {
      setCustomLoan(50);
    }
  }

  return (
    <>
      <Styled.SubTitle>Valor</Styled.SubTitle>
      <Styled.Label htmlFor="custom-loan-value">
        Defina o valor que deseja como empréstimo:
      </Styled.Label>
      <Styled.CurrencyInputStyled
        id="custom-loan-value"
        name="custom-loan-value"
        placeholder="R$ 0,00"
        prefix="R$ "
        decimalsLimit={2}
        value={customLoan}
        onValueChange={(value) => handleInputChange(value)}
      />
      <Styled.SliderStyled
        aria-label="Loan"
        value={customLoan}
        min={50}
        step={50}
        max={loan}
        onChange={(event, newValue) => setCustomLoan(newValue)}
      />
    </>
  );
};

export default LoanValue;
