import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { currencyFormatter } from "@/helper/currencyFormatter";
import * as Styled from "@/components/styles/Components.styled";
import LoanStepper from "./LoanStepper";
import { Checkbox } from "@mui/material";

const steps = ["Defina o valor", "Quantidade de parcelas", "Confirmação"];

const LoanSection = () => {
  const user = useAppSelector((state) => state.user);
  const [loan, setLoan] = useState<number>();
  const [customLoan, setCustomLoan] = useState<number>(50);
  const [installment, setInstallment] = useState<number>(1);
  const [finalLoan, setFinalLoan] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [confirmation, setConfirmation] = useState<boolean>(false);

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

  function handleLoanRequest() {
    console.log({
      requestedLoan: customLoan,
      installment,
      debt: finalLoan,
    });
  }

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
        <>
          <Styled.SubTitle>Valor</Styled.SubTitle>
          <Styled.Text>Defina o valor que deseja como empréstimo:</Styled.Text>
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
            onChange={handleLoanChange}
          />
        </>
      ) : activeStep === 1 ? (
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
          <Styled.Text>
            Valor total a ser pago:{" "}
            <strong>{currencyFormatter(finalLoan)}</strong>.
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
            onChange={handleInstallmentChange}
          />
        </>
      ) : (
        <>
          <Styled.SubTitle>Confirmação</Styled.SubTitle>
          <Styled.Text>
            Confirme todos os dados antes de efetuar o empréstimo.
          </Styled.Text>
          <Styled.Text>
            Valor a ser emprestado:{" "}
            <strong>{currencyFormatter(customLoan)}</strong>
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

export default LoanSection;
