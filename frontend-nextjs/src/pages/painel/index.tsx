import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header/Header";
import SectionTitle from "@/components/Section/SectionTitle";
import SectionContainer from "@/components/Section/SectionContainer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import { clearLoginStatus } from "@/store/reducers/login";
import { fetchTransactionsList } from "@/store/reducers/transactions";
import Head from "next/head";
import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import { clearLoanStatus } from "@/store/reducers/loan";
import { getCards } from "@/store/reducers/card";
import Dashboard from "@/components/Dashboard/Dashboard";
import * as Styled from "@/components/styles/Components.styled";

export default function Painel() {
  const user = useTokenAuthentication();
  const dispatch = useAppDispatch();
  const loan = useAppSelector((state) => state.loan);
  const login = useAppSelector((state) => state.login);
  const card = useAppSelector((state) => state.card);

  useEffect(() => {
    dispatch(fetchTransactionsList());
    if (!card.data.cards?.length) dispatch(getCards());
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
          <Styled.Text>
            Olá,{" "}
            {user.data ? (
              <strong>
                {user.data.user?.firstName.replace(/(\w+)\s(\D+)/g, "$1")}
              </strong>
            ) : (
              "Cliente"
            )}
            ! Aqui em seu painel, você consegue conferir um resumo geral de sua
            conta:
          </Styled.Text>
          <Dashboard />
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
