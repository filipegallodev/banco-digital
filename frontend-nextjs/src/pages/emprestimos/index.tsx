import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header";
import ReturnButton from "@/components/ReturnButton";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import { Slider } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import styled from "styled-components";

export default function Emprestimos() {
  const user = useTokenAuthentication();
  const [loan, setLoan] = useState<number>();
  const [customLoan, setCustomLoan] = useState<number>(50);

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
  }, [user]);

  function handleSliderChange(event: Event, newValue: number | number[]) {
    if (typeof newValue === "number") {
      setCustomLoan(newValue);
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
                onChange={handleSliderChange}
              />
            </>
          )}
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
