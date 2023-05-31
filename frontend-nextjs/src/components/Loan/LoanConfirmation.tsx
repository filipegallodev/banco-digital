import React, { useState } from "react";
import * as Styled from "@/components/styles/Components.styled";
import { Checkbox } from "@mui/material";
import { currencyFormatter } from "@/helper/currencyFormatter";

interface IProps {
  customLoan: number;
  installment: number;
  finalLoan: number;
}

const LoanConfirmation = ({ customLoan, installment, finalLoan }: IProps) => {
  const [confirmation, setConfirmation] = useState<boolean>(false);

  function handleLoanRequest() {
    console.log({
      requestedLoan: customLoan,
      installment,
      debt: finalLoan,
    });
  }

  return (
    <>
      <Styled.SubTitle>Confirmação</Styled.SubTitle>
      <Styled.Text>
        Confirme todos os dados antes de efetuar o empréstimo.
      </Styled.Text>
      <Styled.Text>
        Valor a ser emprestado: <strong>{currencyFormatter(customLoan)}</strong>
      </Styled.Text>
      <Styled.Text>
        Parcelamento: <strong>{installment}</strong> parcela{"(s)"} de{" "}
        <strong>{currencyFormatter(finalLoan / installment)}</strong>
        /mês
      </Styled.Text>
      <Styled.Text>
        Total a ser pago: <strong>{currencyFormatter(finalLoan)}</strong>
      </Styled.Text>
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
