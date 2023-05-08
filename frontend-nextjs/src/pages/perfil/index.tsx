import Head from "next/head";
import styled from "styled-components";
import Header from "@/components/Header";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import ReturnButton from "@/components/ReturnButton";
import ProfileNav from "@/components/UserProfile/ProfileNav";
import AuthPage from "@/components/AuthPage";
import { useEffect, useState } from "react";
import ProfileOverview from "@/components/UserProfile/ProfileOverview";
import ProfileEdit from "@/components/UserProfile/ProfileEdit";
import ProfileChange from "@/components/UserProfile/ProfileChange";
import ProfileManage from "@/components/UserProfile/ProfileManage";

export default function Perfil() {
  const user = useTokenAuthentication();
  const [menuItem, setMenuItem] = useState<string>("geral");
  const [profileScreen, setProfileScreen] = useState<JSX.Element>(<p></p>);

  useEffect(() => {
    switch (menuItem) {
      case "geral":
        return setProfileScreen(<ProfileOverview />);
      case "editar":
        return setProfileScreen(<ProfileEdit />);
      case "trocar":
        return setProfileScreen(<ProfileChange />);
      default:
        return setProfileScreen(<ProfileManage />);
    }
  }, [menuItem]);

  if (!user.data) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Meu perfil | Banco Digital</title>
        <meta name="description" content="Meu perfil do Banco Digital." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <Container>
          <ReturnButton />
          <Title>Meu perfil</Title>
          <ProfileNav menuItem={menuItem} setMenuItem={setMenuItem} />
          {profileScreen}
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
