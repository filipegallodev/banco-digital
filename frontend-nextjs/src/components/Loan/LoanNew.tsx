import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import * as Styled from "@/components/styles/Components.styled";
import LoanStepper from "./LoanStepper";
import LoanConfirmation from "./LoanConfirmation";
import LoanInstallment from "./LoanInstallment";
import LoanValue from "./LoanValue";

const steps = ["Defina o valor", "Quantidade de parcelas", "Confirmação"];

export interface IInstallment {
  amount: number;
  dueDay: number;
}

const LoanNew = () => {
  const user = useAppSelector((state) => state.user);
  const [loan, setLoan] = useState<number>();
  const [customLoan, setCustomLoan] = useState<number>(50);
  const [installment, setInstallment] = useState<IInstallment>({
    amount: 1,
    dueDay: 1,
  });
  const [finalLoan, setFinalLoan] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (user.data.user?.loan) {
      const loanNumber = Number(
        user.data.user.loan
          .replace(/\D{2}\s/g, "")
          .replaceAll(".", "")
          .replace(",", ".")
      );
      setLoan(loanNumber);
      if (loan === 0 || loan === undefined) setCustomLoan(loanNumber);
    }
  }, [user.data.user?.loan, loan]);

  useEffect(() => {
    setFinalLoan(
      Number(
        (
          Number(
            (
              (customLoan * 0.0483 * installment.amount + customLoan) /
              installment.amount
            ).toFixed(2)
          ) * installment.amount
        ).toFixed(2)
      )
    );
  }, [customLoan, installment.amount]);

  if (user.loading) return <Styled.Text>Carregando...</Styled.Text>;
  if (!loan)
    return (
      <Styled.Text>
        Empréstimo indisponível para sua conta. Atualize seu salário em seu
        perfil para obter novas opções de empréstimo.
      </Styled.Text>
    );
  return (
    <>
      <LoanStepper
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      {activeStep === 0 ? (
        <LoanValue
          customLoan={customLoan}
          setCustomLoan={setCustomLoan}
          loan={loan}
        />
      ) : activeStep === 1 ? (
        <LoanInstallment
          installment={installment}
          setInstallment={setInstallment}
          finalLoan={finalLoan}
        />
      ) : (
        <LoanConfirmation
          customLoan={customLoan}
          installment={installment}
          finalLoan={finalLoan}
        />
      )}
      <Styled.ButtonContainer>
        <Styled.Button
          onClick={() => setActiveStep(activeStep - 1)}
          disabled={activeStep === 0}
        >
          Voltar
        </Styled.Button>
        <Styled.Button
          onClick={() => setActiveStep(activeStep + 1)}
          disabled={activeStep >= steps.length - 1}
        >
          Próximo
        </Styled.Button>
      </Styled.ButtonContainer>
    </>
  );
};

export default LoanNew;
