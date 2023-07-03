import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header/Header";
import ReturnButton from "@/components/ReturnButton";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React from "react";
import SectionContainer from "@/components/Section/SectionContainer";
import SectionTitle from "@/components/Section/SectionTitle";
import Footer from "@/components/Footer";
import CardNew from "@/components/Card/CardNew";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Cartoes() {
  const user = useTokenAuthentication();
  const { loading } = useAppSelector((state) => state.card);

  if (!user.data) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Novo cartão | NextBank</title>
        <meta
          name="description"
          content="Solicitar um novo cartão do NextBank!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <SectionContainer>
          <ReturnButton />
          <SectionTitle>Solicitar um novo cartão</SectionTitle>
          <CardNew />
        </SectionContainer>
      </main>
      <Footer />
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          cursor: "wait",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
