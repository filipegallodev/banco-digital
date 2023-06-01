import React, { useState } from "react";
import * as Styled from "@/components/styles/Components.styled";
import { Checkbox } from "@mui/material";
import { IInstallment } from "./LoanSection";
import { months } from "./LoanInstallment";

interface IProps {
  customLoan: number;
  installment: IInstallment;
  finalLoan: number;
}

const LoanConfirmation = ({ customLoan, installment, finalLoan }: IProps) => {
  const [confirmation, setConfirmation] = useState<boolean>(false);

  function handleLoanRequest() {
    console.log({
      requestedLoan: customLoan,
      installment,
      installmentValue: Number((finalLoan / installment.amount).toFixed(2)),
      dueDay: installment.dueDay,
      debt: finalLoan,
    });
  }

  return (
    <>
      <Styled.SubTitle>Confirmação</Styled.SubTitle>
      <Styled.Text>
        Confirme todos os dados antes de efetuar o empréstimo.
      </Styled.Text>
      <Styled.Label htmlFor="final-loan-value">
        Valor a ser emprestado:
      </Styled.Label>
      <Styled.CurrencyInputStyled
        id="final-loan-value"
        name="final-loan-value"
        placeholder="R$ 0,00"
        prefix="R$ "
        decimalsLimit={2}
        value={customLoan}
        disabled
      />
      <Styled.Label htmlFor="installment-amount">
        Parcelamento, <strong>{installment.amount}</strong> vez
        {installment.amount <= 1 ? "" : "es"} de:
      </Styled.Label>
      <Styled.CurrencyInputStyled
        id="installment-amount"
        name="installment-amount"
        placeholder="R$ 0,00"
        prefix="R$ "
        decimalsLimit={2}
        value={(finalLoan / installment.amount).toFixed(2)}
        disabled
      />
      <Styled.Label htmlFor="due-day">
        Melhor dia de pagamento, a partir de{" "}
        <strong>{months[new Date().getMonth() + 2]}</strong>:
      </Styled.Label>
      <Styled.CurrencyInputStyled
        id="due-day"
        value={installment.dueDay}
        disabled
      />
      <Styled.Label htmlFor="debt">Total a ser pago:</Styled.Label>
      <Styled.CurrencyInputStyled
        id="debt"
        name="debt"
        placeholder="R$ 0,00"
        prefix="R$ "
        decimalsLimit={2}
        value={finalLoan}
        disabled
      />
      <Styled.FormControlLabelStyled
        required
        control={<Checkbox />}
        label="Confirme as informações."
        value={confirmation}
        onChange={() => setConfirmation(!confirmation)}
      />
      <Styled.ButtonContainer style={{ marginBottom: "24px" }}>
        <Styled.Button disabled={!confirmation} onClick={handleLoanRequest}>
          Solicitar
          {/* {loading ? "Solicitando" : "Solicitar"} */}
        </Styled.Button>
        {/* {loading && <CircularProgress />} */}
      </Styled.ButtonContainer>
    </>
  );
};

export default LoanConfirmation;
