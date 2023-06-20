import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header";
import ReturnButton from "@/components/ReturnButton";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React from "react";
import SectionContainer from "@/components/Section/SectionContainer";
import SectionTitle from "@/components/Section/SectionTitle";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/router";
import * as Styled from "@/components/styles/Components.styled";
import Success from "@/components/Status/Success";
import Error from "@/components/Status/Error";

export default function Emprestimos() {
  const user = useTokenAuthentication();
  const loan = useAppSelector((state) => state.loan);
  const router = useRouter();

  if (!user.data) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Empréstimos | NextBank</title>
        <meta name="description" content="Empréstimos do seu NextBank!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <SectionContainer>
          <ReturnButton />
          <SectionTitle>Empréstimos</SectionTitle>
          <Styled.Button onClick={() => router.push("/emprestimos/novo")}>
            Solicitar empréstimo
          </Styled.Button>
        </SectionContainer>
      </main>
      <Footer />
      <Success message={loan.data.status} />
      <Error message={loan.error} />
    </>
  );
}
