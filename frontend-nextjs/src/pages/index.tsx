import Head from "next/head";
import * as Styled from "../styles/index.styled";
import styled from "styled-components";
import FormLogin from "@/components/Form/FormLogin";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchToken, resetState } from "@/store/reducers/user";
import FormRegister from "@/components/Form/FormRegister";

export default function Home() {
  const { data } = useAppSelector((state: IReduxState) => state.login);
  const { user } = useAppSelector((state: IReduxState) => state);
  const dispatch = useAppDispatch();
  const route = useRouter();

  useEffect(() => {
    if (user.data?.validToken) route.push("/painel");
  }, [user.data, route]);

  useEffect(() => {
    if (user.error) {
      dispatch(resetState());
    }
  }, [user, dispatch]);

  const validateUserToken = useCallback(() => {
    const token = localStorage.getItem("jwt-token");
    if (token && !user.data?.validToken) {
      return dispatch(fetchToken(token));
    }
  }, [dispatch, user.data?.validToken]);

  useEffect(() => {
    validateUserToken();
  }, [data, validateUserToken]);

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
