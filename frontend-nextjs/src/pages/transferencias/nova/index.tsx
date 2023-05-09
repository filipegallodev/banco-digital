import AuthPage from "@/components/AuthPage";
import FormTransaction from "@/components/Form/FormTransaction";
import Header from "@/components/Header";
import ReturnButton from "@/components/ReturnButton";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import { clearStatus } from "@/store/reducers/transactions";
import Head from "next/head";
import React, { useEffect } from "react";
import styled from "styled-components";

export default function Nova() {
  const user = useTokenAuthentication();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearStatus());
  }, [dispatch]);

  if (!user.data) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Nova transferência | Banco Digital</title>
        <meta name="description" content="Realizar uma nova transferência." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <Container>
          <ReturnButton />
          <Title>Realizar Transferência</Title>
          <FormTransaction />
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
