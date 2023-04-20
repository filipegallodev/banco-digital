import Head from "next/head";
import * as Styled from "../styles/index.styled";
import styled from "styled-components";
import FormLogin from "@/components/Form/FormLogin";
import { useRouter } from "next/router";
import { useEffect } from "react";
import FormRegister from "@/components/Form/FormRegister";
import Header from "@/components/Header";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";

export default function Home() {
  const user = useTokenAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (user.data?.validToken) router.push("/painel");
  }, [user.data?.validToken]);

  return (
    <>
      <Head>
        <title>Banco Digital | Seja Bem-vindo!</title>
        <meta name="description" content="Bem-vindo ao seu Banco Digital!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Container>
          <div>
            <FormLogin />
            <FormRegister />
          </div>
        </Container>
      </main>
    </>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 1210px) {
    margin: 0 24px;
  }
`;
