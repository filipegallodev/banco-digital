import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header";
import ReturnButton from "@/components/ReturnButton";
import SectionTitle from "@/components/Section/SectionTitle";
import SectionContainer from "@/components/Section/SectionContainer";
import TransactionSection from "@/components/Transaction/TransactionSection";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React from "react";

export default function Transferencias() {
  const user = useTokenAuthentication();

  if (!user.data.user) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Transferências | Banco Digital</title>
        <meta
          name="description"
          content="Transferências do seu Banco Digital!"
        />
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
    </>
  );
}
