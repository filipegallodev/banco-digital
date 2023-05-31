import React from "react";
import * as Styled from "@/components/styles/Components.styled";
import { currencyFormatter } from "@/helper/currencyFormatter";

interface IProps {
  installment: number;
  setInstallment: React.Dispatch<React.SetStateAction<any>>;
  finalLoan: number;
}

const LoanInstallment = ({
  installment,
  setInstallment,
  finalLoan,
}: IProps) => {
  return (
    <>
      <Styled.SubTitle>Parcelamento</Styled.SubTitle>
      <Styled.Text>
        Você pode parcelar em até 24 vezes! A taxa de juros é de{" "}
        <strong>4,83%</strong> ao mês.
      </Styled.Text>
      <Styled.Text>
        Parcelas: <strong>{installment}</strong> de{" "}
        <strong>{currencyFormatter(finalLoan / installment)}</strong>
        /mês .
      </Styled.Text>
      <Styled.Text>Escolha a quantidade de parcelas:</Styled.Text>
      <Styled.Select
        value={installment}
        onChange={({ target }) => setInstallment(Number(target.value))}
      >
        {Array.from(new Array(24)).map((item, index) => (
          <option key={index}>{index + 1}</option>
        ))}
      </Styled.Select>
      <Styled.SliderStyled
        aria-label="Loan"
        value={installment}
        min={1}
        step={1}
        max={24}
        onChange={(event, newValue) => setInstallment(newValue)}
      />
    </>
  );
};

export default LoanInstallment;
