import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { currencyFormatter } from "@/helper/currencyFormatter";
import CurrencyInput from "react-currency-input-field";
import { Slider } from "@mui/material";
import * as Styled from "@/components/styles/Components.styled";
import LoanStepper from "./LoanStepper";

const steps = ["Valor", "Parcelamento", "Confirmação"];

const LoanSection = () => {
  const user = useAppSelector((state) => state.user);
  const [loan, setLoan] = useState<number>();
  const [customLoan, setCustomLoan] = useState<number>(50);
  const [installment, setInstallment] = useState<number>(1);
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
    setFinalLoan(customLoan + customLoan * 0.0483 * installment);
  }, [customLoan, installment]);

  function handleLoanChange(event: Event, newValue: number | number[]) {
    if (typeof newValue === "number") {
      setCustomLoan(newValue);
    }
  }

  function handleInstallmentChange(event: Event, newValue: number | number[]) {
    if (typeof newValue === "number") {
      setInstallment(newValue);
    }
  }

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

  if (!loan) return null;
  return (
    <>
      <LoanStepper
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      {activeStep === 0 ? (
        <>
          <Styled.SubTitle>Valor</Styled.SubTitle>
          <p>
            {customLoan
              ? currencyFormatter(customLoan)
              : currencyFormatter(loan)}
          </p>
          <CurrencyInput
            id="custom-loan-value"
            name="custom-loan-value"
            placeholder="R$ 0,00"
            prefix="R$ "
            decimalsLimit={2}
            value={customLoan}
            onValueChange={(value) => handleInputChange(value)}
          />
          <Slider
            aria-label="Loan"
            value={customLoan}
            min={50}
            step={50}
            max={loan}
            onChange={handleLoanChange}
          />
        </>
      ) : activeStep === 1 ? (
        <>
          <Styled.SubTitle>Parcelamento</Styled.SubTitle>
          <p>
            Você pode parcelar em até 24 vezes! A taxa de juros é de 4,83% ao
            mês.
          </p>
          <p>
            Parcelas: {installment} de{" "}
            {currencyFormatter(finalLoan / installment)}
            /mês.
          </p>
          <p>Valor final: {currencyFormatter(finalLoan)}.</p>
          <Slider
            aria-label="Loan"
            value={installment}
            min={1}
            step={1}
            max={24}
            onChange={handleInstallmentChange}
          />
        </>
      ) : (
        <>
          <Styled.SubTitle>Confirmação</Styled.SubTitle>
          <p>Confirme os dados antes de confirmar o empréstimo.</p>
          <p>Valor a ser emprestado: {currencyFormatter(finalLoan)}</p>
          <p>
            Parcelamento: {installment} parcela{"(s)"} de{" "}
            {currencyFormatter(finalLoan / installment)}
            /mês
          </p>
          <p>Confirmo os dados.</p>
          <button>Solicitar</button>
        </>
      )}
    </>
  );
};

export default LoanSection;
