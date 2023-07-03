import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header/Header";
import ReturnButton from "@/components/ReturnButton";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React from "react";
import SectionContainer from "@/components/Section/SectionContainer";
import SectionTitle from "@/components/Section/SectionTitle";
import Footer from "@/components/Footer";
import Success from "@/components/Status/Success";
import Error from "@/components/Status/Error";

export default function EntradaSaida() {
  const user = useTokenAuthentication();

  if (!user.data) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Entrada e Saída | NextBank</title>
        <meta
          name="description"
          content="Entrada e Saída para o seu NextBank!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <SectionContainer>
          <ReturnButton />
          <SectionTitle>Entrada e Saída</SectionTitle>
          <p>Em desenvolvimento.</p>
        </SectionContainer>
      </main>
      <Footer />
      <Success message={user.data.status} />
      <Error message={user.error} />
    </>
  );
}
