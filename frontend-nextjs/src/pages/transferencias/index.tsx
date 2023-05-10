import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header";
import ReturnButton from "@/components/ReturnButton";
import TransactionSection from "@/components/Transaction/TransactionSection";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React from "react";
import styled from "styled-components";

export default function Transferencias() {
  const user = useTokenAuthentication();

  if (!user.data.user) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Transferências | Banco Digital</title>
        <meta name="description" content="Transferências do seu Banco Digital!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <Container>
          <ReturnButton />
          <Title>Transferências</Title>
          <TransactionSection />
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
