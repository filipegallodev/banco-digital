import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { resetState } from "@/store/reducers/user";
import React from "react";
import styled from "styled-components";

const Header = () => {
  const user = useAppSelector((state: IReduxState) => state.user.data?.user);
  const dispatch = useAppDispatch();

  function handleUserLogout() {
    dispatch(resetState());
  }

  return (
    <Container>
      <Content>
        <Title>Banco Digital</Title>
        <UserInfoContainer>
          {user && <Name>Nome Completo</Name>}
          {user && <LogoutButton onClick={handleUserLogout}>Sair</LogoutButton>}
        </UserInfoContainer>
      </Content>
    </Container>
  );
};

const Container = styled.header`
  background-color: #151515;
  color: #f5f5f5;
  height: 132px;
  display: flex;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 2rem;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

const Name = styled.p`
  text-transform: uppercase;
  font-size: 1.25rem;
`;

const LogoutButton = styled.button`
  padding: 12px 24px;
  font-size: 1.25rem;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #ffddff;
  }
`;

export default Header;
