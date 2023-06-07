import Head from "next/head";
import AuthSection from "@/components/Form/Auth/AuthSection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import { useAppSelector } from "@/hooks/useAppSelector";
import AuthPage from "@/components/AuthPage";
import Error from "@/components/Status/Error";
import Success from "@/components/Status/Success";
import { Backdrop, CircularProgress } from "@mui/material";
import SectionContainer from "@/components/Section/SectionContainer";
import Footer from "@/components/Footer";
import styled from "styled-components";

export default function Home() {
  const user = useTokenAuthentication();
  const login = useAppSelector((state: IReduxState) => state.login);
  const register = useAppSelector((state: IReduxState) => state.register);
  const router = useRouter();

  useEffect(() => {
    if (user.data.validToken) router.push("/painel");
  }, [user.data.validToken, router]);

  if (user.data.user) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Banco Digital | Seja Bem-vindo!</title>
        <meta name="description" content="Bem-vindo ao seu Banco Digital!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <SectionContainer>
          <Container>
            <MainSection>
              <h2>Seja bem-vindo!</h2>
            </MainSection>
            <AuthSection />
          </Container>
        </SectionContainer>
      </main>
      <Footer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={login.loading || register.loading || user.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Success message={login.data?.status || register.data?.status} />
      <Error message={login.error || register.error} />
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;
  width: 100%;
  min-height: 100vh;
`;

const MainSection = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
