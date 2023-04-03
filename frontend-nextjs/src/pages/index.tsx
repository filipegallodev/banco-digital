import Head from "next/head";
import * as Styled from "../styles/index.styled";
import styled from "styled-components";
import FormLogin from "@/components/Form/FormLogin";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data } = useAppSelector((state: IReduxState) => state.login);
  const route = useRouter();

  useEffect(() => {
    if (data?.auth) route.push("/painel");
  }, [data]);

  return (
    <>
      <Head>
        <title>Banco Digital | Seja Bem-vindo!</title>
        <meta name="description" content="Bem-vindo ao seu Banco Digital!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <div>
            {data?.auth && <p>Logado.</p>}
            <FormLogin />
            <button>Registrar</button>
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
