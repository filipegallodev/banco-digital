import Header from "@/components/Header";
import { useAppSelector } from "@/hooks/useAppSelector";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";

export default function Painel() {
  const { user } = useAppSelector((state: IReduxState) => state);
  const route = useRouter();

  useEffect(() => {
    if (!user.data?.validToken) route.push("/");
  }, [user.data, route]);

  if (!user.data) return <Header />;
  return (
    <>
      <Head>
        <title>Painel | Banco Digital</title>
        <meta name="description" content="Painel do seu Banco Digital!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Container>
          <Title>Visão geral</Title>
          <p>
            Olá, Sr{"("}a{")"} NOME
          </p>
          <DashboardContainer>
            <DashboardItem>Saldo: {user.data?.user.balance}</DashboardItem>
            <DashboardItem>Transferências hoje:</DashboardItem>
            <DashboardItem>Saída/Entrada</DashboardItem>
          </DashboardContainer>
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
  max-width: 1000px;
`;

const Title = styled.h1`
  margin: 32px 0;
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

const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #555;
`;

const DashboardItem = styled.div`
  /* border: 1px solid #555; */
  width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
