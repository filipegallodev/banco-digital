import Head from "next/head";
import FormLogin from "@/components/Form/FormLogin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormRegister from "@/components/Form/FormRegister";
import Header from "@/components/Header";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import * as Styled from "@/components/styles/Components.styled";
import { useAppSelector } from "@/hooks/useAppSelector";
import AuthPage from "@/components/AuthPage";
import Error from "@/components/Status/Error";
import Success from "@/components/Status/Success";
import { Backdrop, CircularProgress } from "@mui/material";
import SectionTitle from "@/components/Section/SectionTitle";
import SectionContainer from "@/components/Section/SectionContainer";
import Footer from "@/components/Footer";

export default function Home() {
  const user = useTokenAuthentication();
  const router = useRouter();
  const [form, setForm] = useState<string>("");
  const login = useAppSelector((state: IReduxState) => state.login);
  const register = useAppSelector((state: IReduxState) => state.register);

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
          <SectionTitle>O que deseja fazer?</SectionTitle>
          <Styled.ButtonContainer>
            <Styled.Button onClick={() => setForm("register")}>
              Criar uma conta
            </Styled.Button>
            <Styled.Button onClick={() => setForm("login")}>
              Fazer login
            </Styled.Button>
          </Styled.ButtonContainer>
          {form === "login" ? (
            <FormLogin />
          ) : form === "register" ? (
            <FormRegister />
          ) : null}
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
