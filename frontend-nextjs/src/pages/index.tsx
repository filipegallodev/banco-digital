import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import AuthPage from "@/components/AuthPage";
import AuthSection from "@/components/Form/Auth/AuthSection";
import Error from "@/components/Status/Error";
import Success from "@/components/Status/Success";
import { Backdrop, CircularProgress } from "@mui/material";
import SectionContainer from "@/components/Section/SectionContainer";
import styled from "styled-components";
import BankImage from "../../public/bank-auth-page.webp";
import Image from "next/image";
import Logo from "../components/Header/Logo";

export default function Home() {
  const user = useTokenAuthentication();
  const login = useAppSelector((state) => state.login);
  const register = useAppSelector((state) => state.register);
  const router = useRouter();

  useEffect(() => {
    if (user.data.validToken) router.push("/painel");
  }, [user.data.validToken, router]);

  if (user.data.user) return <AuthPage />;
  return (
    <>
      <Head>
        <title>NextBank | Seja Bem-vindo!</title>
        <meta name="description" content="Bem-vindo ao seu NextBank!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SectionContainer>
          <Container>
            <MainSection>
              <LogoAndImageContainer>
                <ImageStyled src={BankImage} alt="Imagem de banco" />
                <Logo styleClass="black large" />
              </LogoAndImageContainer>
            </MainSection>
            <AuthSection />
          </Container>
        </SectionContainer>
      </main>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          cursor: "wait",
        }}
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
  max-width: 1200px;
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-height: 800px) {
    min-height: 100vh;
  }
  @media (max-width: 1150px) {
    gap: 32px;
    margin: 32px 0px 64px 0px;
    justify-content: center;
  }
`;

const MainSection = styled.section`
  min-width: 400px;
  display: flex;
  align-items: center;
  @media (max-width: 450px) {
    min-width: 0px;
    width: 100%;
  }
`;

const LogoAndImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ImageStyled = styled(Image)`
  max-width: 500px;
  width: 100%;
  height: 100%;
`;
