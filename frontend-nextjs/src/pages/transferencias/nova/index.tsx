import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header";
import ReturnButton from "@/components/ReturnButton";
import TransactionForm from "@/components/Transaction/TransactionForm";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React from "react";
import styled from "styled-components";

export default function Nova() {
  const user = useTokenAuthentication();

  if (!user.data) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Painel | Banco Digital</title>
        <meta name="description" content="Painel do seu Banco Digital!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <Container>
          <ReturnButton />
          <Title>Realizar Transferência</Title>
          <TransactionForm />
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
  margin: 0 auto;
  max-width: 1200px;
`;

const Title = styled.h1`
  margin: 48px 0;
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