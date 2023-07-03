import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header/Header";
import ReturnButton from "@/components/ReturnButton";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React, { useEffect } from "react";
import SectionContainer from "@/components/Section/SectionContainer";
import SectionTitle from "@/components/Section/SectionTitle";
import Footer from "@/components/Footer";
import Success from "@/components/Status/Success";
import Error from "@/components/Status/Error";
import CardSection from "@/components/Card/CardSection";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getCards } from "@/store/reducers/card";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export default function Cartoes() {
  const user = useTokenAuthentication();
  const card = useAppSelector((state) => state.card);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (card.data.cards?.length) return;
    dispatch(getCards());
  }, [dispatch]);

  if (!user.data) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Cartões | NextBank</title>
        <meta name="description" content="Seus cartões do NextBank!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <SectionContainer>
          <ReturnButton />
          <SectionTitle>Cartões</SectionTitle>
          <CardSection />
        </SectionContainer>
      </main>
      <Footer />
      <Success message={card.data.status} />
      <Error message={card.error} />
    </>
  );
}
