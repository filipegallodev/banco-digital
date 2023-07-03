import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header";
import ReturnButton from "@/components/ReturnButton";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React, { useEffect } from "react";
import SectionContainer from "@/components/Section/SectionContainer";
import SectionTitle from "@/components/Section/SectionTitle";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/hooks/useAppSelector";
import Success from "@/components/Status/Success";
import Error from "@/components/Status/Error";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getLoans } from "@/store/reducers/loan";

export default function Investimentos() {
  const user = useTokenAuthentication();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLoans());
  }, [dispatch]);

  if (!user.data) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Investimentos | NextBank</title>
        <meta name="description" content="Investimentos para o seu NextBank!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <SectionContainer>
          <ReturnButton />
          <SectionTitle>Investimentos</SectionTitle>
          <p>Em desenvolvimento.</p>
        </SectionContainer>
      </main>
      <Footer />
      <Success message={user.data.status} />
      <Error message={user.error} />
    </>
  );
}
