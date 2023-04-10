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
        {user && <p>NOME COMPLETO</p>}
        {user && <button onClick={handleUserLogout}>Sair</button>}
      </UserInfoContainer>
    </Container>
  );
};

const Container = styled.header`
  background-color: #111;
  color: #f5f5f5;
  padding: 16px;
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

export default Header;
