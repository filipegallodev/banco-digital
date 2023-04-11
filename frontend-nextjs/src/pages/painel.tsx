import DashboardContainer from "@/components/Dashboard/DashboardContainer";
import DashboardItem from "@/components/Dashboard/DashboardItem";
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
          <WelcomeMessage>
            Olá, Sr{"("}a{")"} NOME
          </WelcomeMessage>
          <DashboardContainer>
            <DashboardItem name="Saldo" data={user.data?.user.balance} />
            <DashboardItem
              name="Transferências"
              data={2}
              page="transferencias"
            />
            <DashboardItem name="Saída/Entrada" data={100} />
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

const WelcomeMessage = styled.p`
  font-size: 1.35rem;
`;
