import React from "react";
import * as Styled from "@/components/styles/Components.styled";
import { currencyFormatter } from "@/helper/currencyFormatter";

interface IProps {
  installment: IInstallment;
  setInstallment: React.Dispatch<React.SetStateAction<any>>;
  finalLoan: number;
}

export const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

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
        Parcelas: <strong>{installment.amount}</strong> de{" "}
        <strong>{currencyFormatter(finalLoan / installment.amount)}</strong>
        /mês.
      </Styled.Text>
      <Styled.Label htmlFor="due-day">
        Defina o melhor dia de pagamento das parcelas, começando a partir de{" "}
        <strong>
          {months[new Date().getMonth() + 1]} de {new Date().getFullYear()}
        </strong>
        :
      </Styled.Label>
      <Styled.Select
        id="due-day"
        value={installment.dueDay}
        onChange={({ target }) =>
          setInstallment({ ...installment, dueDay: Number(target.value) })
        }
      >
        {Array.from(new Array(30)).map((item, index) => (
          <option key={index}>{index + 1}</option>
        ))}
      </Styled.Select>
      <Styled.Label htmlFor="installment-amount">
        Escolha a quantidade de parcelas:
      </Styled.Label>
      <Styled.Select
        id="installment-amount"
        value={installment.amount}
        onChange={({ target }) =>
          setInstallment({ ...installment, amount: Number(target.value) })
        }
      >
        {Array.from(new Array(24)).map((item, index) => (
          <option key={index}>{index + 1}</option>
        ))}
      </Styled.Select>
      <Styled.SliderStyled
        aria-label="Loan"
        value={installment.amount}
        min={1}
        step={1}
        max={24}
        onChange={(event, newValue) =>
          setInstallment({ ...installment, amount: newValue })
        }
      />
    </>
  );
};

export default LoanInstallment;
