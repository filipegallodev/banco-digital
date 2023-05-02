import Head from "next/head";
import styled from "styled-components";
import Header from "@/components/Header";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import ReturnButton from "@/components/ReturnButton";
import ProfileNav from "@/components/UserProfile/ProfileNav";
import AuthPage from "@/components/AuthPage";

export default function Perfil() {
  const user = useTokenAuthentication();

  if (!user.data) return <AuthPage />;
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
        <Container>
          <ReturnButton />
          <Title>Meu perfil</Title>
          <ProfileNav />
        </Container>
      </main>
    </>
  );
}

const Container = styled.section`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 auto;
  min-height: 50vh;
  max-width: 1200px;
`;

const Title = styled.h1`
  margin: 52px 0px;
  font-size: 2.5rem;
  text-transform: uppercase;
  box-sizing: border-box;
  &::before {
    content: "";
    width: 32px;
    height: 4px;
    background-color: #c500d0;
    position: absolute;
  }
`;
