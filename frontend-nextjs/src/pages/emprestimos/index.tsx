import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header";
import ReturnButton from "@/components/ReturnButton";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import SectionContainer from "@/components/Section/SectionContainer";
import SectionTitle from "@/components/Section/SectionTitle";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/router";
import * as Styled from "@/components/styles/Components.styled";
import Success from "@/components/Status/Success";
import Error from "@/components/Status/Error";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getLoans } from "@/store/reducers/loan";

export default function Emprestimos() {
  const [nextLoan, setNextLoan] = useState({ date: "", time: "" });
  const user = useTokenAuthentication();
  const loan = useAppSelector((state) => state.loan);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getLoans());
  }, [dispatch]);

  useEffect(() => {
    if (loan.data.loans && loan.data.loans.length && loan.data.nextLoan) {
      return setNextLoan({
        date: new Date(loan.data.nextLoan).toLocaleDateString(),
        time: new Date(loan.data.nextLoan).toLocaleTimeString(),
      });
    }
  }, [loan.data.loans, loan.data.nextLoan]);

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
            {loan.data.nextLoan && new Date().getTime() < loan.data.nextLoan
              ? "Simular empréstimo"
              : "Solicitar empréstimo"}
          </Styled.Button>
          {loan.data.nextLoan ? (
            <Styled.Text style={{ marginTop: "24px" }}>
              Próximo empréstimo disponível em <strong>{nextLoan.date}</strong>{" "}
              às <strong>{nextLoan.time}</strong>.
            </Styled.Text>
          ) : null}
        </SectionContainer>
      </main>
      <Footer />
      <Success message={loan.data.status} />
      <Error message={loan.error} />
    </>
  );
}
