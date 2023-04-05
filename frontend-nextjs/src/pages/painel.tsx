import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { resetState } from "@/store/reducers/user";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Painel() {
  const { user } = useAppSelector((state: IReduxState) => state);
  const dispatch = useAppDispatch();
  const route = useRouter();

  useEffect(() => {
    if (!user.data?.validToken) route.push("/");
  }, [user.data, route]);

  function handleUserLogout() {
    dispatch(resetState());
  }

  if (!user.data) return null;
  return (
    <>
      <Head>
        <title>Painel | Banco Digital</title>
        <meta name="description" content="Bem-vindo ao seu Banco Digital!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button onClick={handleUserLogout}>Sair</button>
        Painel | {user.data?.user.username} | {user.data?.user.balance}
      </main>
    </>
  );
}
