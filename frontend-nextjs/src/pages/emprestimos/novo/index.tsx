import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header/Header";
import ReturnButton from "@/components/ReturnButton";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React from "react";
import LoanNew from "@/components/Loan/LoanNew";
import SectionContainer from "@/components/Section/SectionContainer";
import SectionTitle from "@/components/Section/SectionTitle";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Backdrop, CircularProgress } from "@mui/material";
import Success from "@/components/Status/Success";
import Error from "@/components/Status/Error";

export default function Emprestimos() {
  const user = useTokenAuthentication();
  const loan = useAppSelector((state) => state.loan);

  if (!user.data) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Novo empréstimo | NextBank</title>
        <meta
          name="description"
          content="Solicitar um novo empréstimo do NextBank!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <SectionContainer>
          <ReturnButton />
          <SectionTitle>Novo Empréstimo</SectionTitle>
          <LoanNew />
        </SectionContainer>
      </main>
      <Footer />
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          cursor: "wait",
        }}
        open={loan.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Success message={loan.data.status} />
      <Error message={loan.error} />
    </>
  );
}
