import { useAppSelector } from "@/hooks/useAppSelector";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Painel() {
  const { data } = useAppSelector((state: IReduxState) => state.login);
  const route = useRouter();

  useEffect(() => {
    if (!data?.auth) route.push("/");
  }, [data]);

  if (!data?.auth) return <p>Faça login para visualizar esta página.</p>;
  return (
    <>
      <Head>
        <title>Painel | Banco Digital</title>
        <meta name="description" content="Bem-vindo ao seu Banco Digital!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Painel</main>
    </>
  );
}
