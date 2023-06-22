import AuthPage from "@/components/AuthPage";
import DashboardContainer from "@/components/Dashboard/DashboardContainer";
import DashboardItem from "@/components/Dashboard/DashboardItem";
import Header from "@/components/Header";
import SectionTitle from "@/components/Section/SectionTitle";
import SectionContainer from "@/components/Section/SectionContainer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import { clearLoginStatus } from "@/store/reducers/login";
import { fetchTransactionsList } from "@/store/reducers/transactions";
import Head from "next/head";
import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "@/components/Footer";
import { clearLoanStatus } from "@/store/reducers/loan";

export default function Painel() {
  const user = useTokenAuthentication();
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions);
  const loan = useAppSelector((state) => state.loan);
  const login = useAppSelector((state) => state.login);

  useEffect(() => {
    dispatch(fetchTransactionsList());
    if (login.data?.token) dispatch(clearLoginStatus());
    if (loan.data.status || loan.error) dispatch(clearLoanStatus());
  }, [dispatch, loan.data.status, loan.error, login.data?.token]);

  if (!user.data.user) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Painel | NextBank</title>
        <meta name="description" content="Painel do seu NextBank!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <SectionContainer>
          <SectionTitle>Visão geral</SectionTitle>
          <WelcomeMessage>
            Olá,{" "}
            {user.data ? (
              <strong>{user.data.user?.firstName.replace(
                /(\w+)\s(\D+)/g,
                "$1"
              )}</strong>
            ) : (
              "Cliente"
            )}
            ! Aqui está o resumo de sua conta:
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
              page="cartoes"
              loading={transactions.loading}
            />
            <DashboardItem
              name="Investimentos"
              data={"0"}
              loading={transactions.loading}
            />
            <DashboardItem
              name="Empréstimos"
              prefix={user.data.user?.loan === "R$ 0,00" ? "" : "até"}
              page="emprestimos"
              data={
                user.data.user?.loan === "R$ 0,00"
                  ? "Indisponível"
                  : user.data.user?.loan
              }
              loading={transactions.loading}
            />
          </DashboardContainer>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}

const WelcomeMessage = styled.p`
  font-size: 1.35rem;
`;
