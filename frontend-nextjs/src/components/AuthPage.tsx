import Head from "next/head";
import React, { useEffect } from "react";
import Header from "./Header/Header";
import styled from "styled-components";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

const AuthPage = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user.loading === false && user.data.validToken === null) {
      router.push("/");
    }
  }, [user.loading, user.data.validToken, router]);

  return (
    <>
      <Head>
        <title>Autenticando | NextBank</title>
        <meta name="description" content="Painel do seu NextBank!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <Container>
          <CircularProgress />
          <AuthText>Autenticando...</AuthText>
        </Container>
      </main>
    </>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 0 auto;
  max-width: 1200px;
  height: calc(100vh - 132px);
`;

const AuthText = styled.p`
  font-size: 1.5rem;
`;

export default AuthPage;
