import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header/Header";
import ReturnButton from "@/components/ReturnButton";
import SectionTitle from "@/components/Section/SectionTitle";
import SectionContainer from "@/components/Section/SectionContainer";
import TransactionSection from "@/components/Transaction/TransactionSection";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { clearTransactionStatus } from "@/store/reducers/transactions";

export default function Transferencias() {
  const user = useTokenAuthentication();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearTransactionStatus());
  }, []);

  if (!user.data.user) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Transferências | NextBank</title>
        <meta name="description" content="Transferências do seu NextBank!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <SectionContainer>
          <ReturnButton />
          <SectionTitle>Transferências</SectionTitle>
          <TransactionSection />
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
