import Head from "next/head";
import * as Styled from "../styles/index.styled";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Banco Digital</title>
        <meta name="description" content="Bem-vindo ao seu Banco Digital!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <div>
            <button>Registrar</button>
            <button>Login</button>
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