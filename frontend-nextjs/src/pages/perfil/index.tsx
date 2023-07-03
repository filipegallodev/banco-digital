import Head from "next/head";
import Header from "@/components/Header/Header";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import ReturnButton from "@/components/ReturnButton";
import ProfileNav from "@/components/UserProfile/ProfileNav";
import AuthPage from "@/components/AuthPage";
import { useEffect, useState } from "react";
import ProfileOverview from "@/components/UserProfile/ProfileOverview/ProfileOverview";
import ProfileEdit from "@/components/UserProfile/ProfileEdit";
import ProfileChange from "@/components/UserProfile/ProfileChange/ProfileChange";
import ProfileManage from "@/components/UserProfile/ProfileManage/ProfileManage";
import Error from "@/components/Status/Error";
import Success from "@/components/Status/Success";
import { Backdrop, CircularProgress } from "@mui/material";
import SectionContainer from "@/components/Section/SectionContainer";
import SectionTitle from "@/components/Section/SectionTitle";
import Footer from "@/components/Footer";

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

  if (!user.data.user) return <AuthPage />;
  return (
    <>
      <Head>
        <title>Meu perfil | NextBank</title>
        <meta name="description" content="Seu perfil do NextBank." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="animeRight">
        <SectionContainer>
          <ReturnButton />
          <SectionTitle>Meu perfil</SectionTitle>
          <ProfileNav menuItem={menuItem} setMenuItem={setMenuItem} />
          {profileScreen}
        </SectionContainer>
      </main>
      <Footer />
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          cursor: "wait",
        }}
        open={user.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Success message={user.data.status} />
      <Error message={user.error} />
    </>
  );
}
