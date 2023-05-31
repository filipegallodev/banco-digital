import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header";
import ReturnButton from "@/components/ReturnButton";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React from "react";
import LoanSection from "@/components/Loan/LoanSection";
import SectionContainer from "@/components/Section/SectionContainer";
import SectionTitle from "@/components/Section/SectionTitle";
import Footer from "@/components/Footer";

export default function Emprestimos() {
  const user = useTokenAuthentication();

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
        <SectionContainer>
          <ReturnButton />
          <SectionTitle>Empréstimos</SectionTitle>
          <LoanSection />
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
