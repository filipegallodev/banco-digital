import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  const user = useAppSelector((state) => state.user.data.user);
  const router = useRouter();

  return (
    <Container>
      <Content>
        <Logo />
        {user && (
          <ControllContainer>
            <UserProfile onClick={() => router.push("/perfil")}>
              <UserIcon>{user.firstName[0]}</UserIcon>
              <UserName>
                {user.firstName.replace(/(\w+)\s((\w{1})\w+)(\D+)/g, "$1 $3") +
                  " " +
                  user.lastName}
              </UserName>
            </UserProfile>
            <HeaderMenu />
          </ControllContainer>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.header`
  background-color: #050512;
  color: #f5f5f5;
  min-height: 132px;
  height: 100%;
  display: flex;
  box-shadow: 0px 0px 4px 2px ${(props) => props.theme.button.color};
  margin-bottom: 24px;
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1240px) {
    margin: 0 24px;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 32px;
    margin: 32px 0px;
  }
`;

const ControllContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 64px;
  @media (max-width: 400px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    color: ${(props) => props.theme.button.color};
  }
`;

const UserIcon = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.button.secondary.color};
  border-radius: 100%;
  color: #333;
  font-size: 1.75rem;
  filter: drop-shadow(0px 0px 2px #fff);
`;

const UserName = styled.p`
  text-transform: uppercase;
  font-size: 1.25rem;
`;

export default Header;
