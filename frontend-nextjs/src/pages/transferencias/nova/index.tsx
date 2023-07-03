import AuthPage from "@/components/AuthPage";
import TransactionForm from "@/components/Transaction/TransactionForm";
import Header from "@/components/Header/Header";
import ReturnButton from "@/components/ReturnButton";
import SectionTitle from "@/components/Section/SectionTitle";
import SectionContainer from "@/components/Section/SectionContainer";
import Error from "@/components/Status/Error";
import Success from "@/components/Status/Success";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import { clearTransactionStatus } from "@/store/reducers/transactions";
import { Backdrop, CircularProgress } from "@mui/material";
import Head from "next/head";
import React, { useEffect } from "react";
import Footer from "@/components/Footer";

export default function Nova() {
  const user = useTokenAuthentication();
  const transactions = useAppSelector((state) => state.transactions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearTransactionStatus());
  }, [dispatch]);

  if (!user.data.user) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Nova transferência | NextBank</title>
        <meta name="description" content="Realizar uma nova transferência." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <SectionContainer>
          <ReturnButton />
          <SectionTitle>Realizar Transferência</SectionTitle>
          <TransactionForm />
        </SectionContainer>
      </main>
      <Footer />
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          cursor: "wait",
        }}
        open={transactions.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Success message={transactions.data?.status} />
      <Error message={transactions.error} />
    </>
  );
}
