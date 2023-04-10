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
      <div>Header</div>
      <UserInfoContainer>
        {user && <Name>Nome Completo</Name>}
        {user && <LogoutButton onClick={handleUserLogout}>Sair</LogoutButton>}
      </UserInfoContainer>
    </Container>
  );
};

const Container = styled.header`
  background-color: #151515;
  color: #f5f5f5;
  padding: 40px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  padding: 8px 16px;
  font-size: 1.125rem;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

export default Header;
