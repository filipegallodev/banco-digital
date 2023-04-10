import Header from "@/components/Header";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { resetState } from "@/store/reducers/user";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Painel() {
  const { user } = useAppSelector((state: IReduxState) => state);
  const route = useRouter();

  useEffect(() => {
    if (!user.data?.validToken) route.push("/");
  }, [user.data, route]);

  if (!user.data) return <Header />;
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
        <div>
          Painel | Olá, Sr{"("}a{")"} NOME | {user.data?.user.username} |{" "}
          {user.data?.user.balance}
        </div>
      </main>
    </>
  );
}
