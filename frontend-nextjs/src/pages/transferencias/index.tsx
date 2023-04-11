import Header from "@/components/Header";
import { useAppSelector } from "@/hooks/useAppSelector";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";

export default function Transferencias() {
  const { user } = useAppSelector((state: IReduxState) => state);
  const route = useRouter();

  useEffect(() => {
    if (!user.data?.validToken) route.push("/");
  }, [user.data, route]);

  return (
    <>
      <Head>
        <title>Painel | Banco Digital</title>
        <meta name="description" content="Painel do seu Banco Digital!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Container>
          <Title>Transferências</Title>
        </Container>
      </main>
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
`;

const Title = styled.h1`
  margin: 48px 0;
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
