import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header";
import ReturnButton from "@/components/ReturnButton";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import { Slider } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import styled from "styled-components";
import * as Styled from "../../components/styles/Components.styled";

export default function Emprestimos() {
  const user = useTokenAuthentication();
  const [loan, setLoan] = useState<number>();
  const [customLoan, setCustomLoan] = useState<number>(50);
  const [installment, setInstallment] = useState<number>(0);
  const [finalLoan, setFinalLoan] = useState<string>("");

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
      (customLoan + customLoan * (0.0446 * (installment * 0.5))).toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      )
    );
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

  if (!user.data) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Empréstimos | Banco Digital</title>
        <meta name="description" content="Empréstimos do seu Banco Digital!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <Container>
          <ReturnButton />
          <Title>Empréstimos</Title>
          <Styled.SubTitle>Valor</Styled.SubTitle>
          {loan && (
            <>
              <p>
                {customLoan
                  ? customLoan.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : loan.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
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
          )}
          <Styled.SubTitle>Parcelamento</Styled.SubTitle>
          <p>
            Você pode parcelar em até 24 vezes! A taxa de juros é de 4,46% ao
            mês.
          </p>
          <p>
            Parcelas: {installment} de {finalLoan}/mês.
          </p>
          <p>Valor final: {finalLoan}.</p>
          <Slider
            aria-label="Loan"
            value={installment}
            min={1}
            step={1}
            max={24}
            onChange={handleInstallmentChange}
          />
        </Container>
      </main>
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto 24px auto;
  max-width: 1200px;
`;

const Title = styled.h1`
  margin: 52px 0px;
  font-size: 2.5rem;
  text-transform: uppercase;
  box-sizing: border-box;
  &::before {
    content: "";
    width: 32px;
    height: 4px;
    background-color: #c500d0;
    position: absolute;
  }
`;
