import AuthPage from "@/components/AuthPage";
import DashboardContainer from "@/components/Dashboard/DashboardContainer";
import DashboardItem from "@/components/Dashboard/DashboardItem";
import Header from "@/components/Header";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import { resetLoginData } from "@/store/reducers/login";
import { fetchTransactionsList } from "@/store/reducers/transactions";
import Head from "next/head";
import React, { useEffect } from "react";
import styled from "styled-components";

export default function Painel() {
  const user = useTokenAuthentication();
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(
    (state: IReduxState) => state.transactions
  );
  const login = useAppSelector((state: IReduxState) => state.login);

  useEffect(() => {
    dispatch(fetchTransactionsList());
    if (login.data?.token) dispatch(resetLoginData());
  }, [dispatch]);

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
          <Title>Visão geral</Title>
          <WelcomeMessage>
            Olá, {user.data && user.data.user?.firstName}! Aqui está o resumo de
            sua conta:
          </WelcomeMessage>
          <DashboardContainer>
            <DashboardItem
              name="Saldo"
              data={user.data.user?.balance}
              loading={user.loading}
            />
            <DashboardItem
              name="Transferências"
              data={String(transactions.data?.allTransactions?.length || 0)}
              page="transferencias"
              loading={transactions.loading}
            />
            <DashboardItem
              name="Saída/Entrada"
              data={transactions.data?.totalTransferValue}
              loading={transactions.loading}
            />
            <DashboardItem
              name="Cartões"
              data={"0"}
              loading={transactions.loading}
            />
            <DashboardItem
              name="Investimentos"
              data={"0"}
              loading={transactions.loading}
            />
            <DashboardItem
              name="Empréstimos"
              prefix="até"
              data={user.data.user?.loan}
              loading={transactions.loading}
            />
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

const WelcomeMessage = styled.p`
  font-size: 1.35rem;
`;
