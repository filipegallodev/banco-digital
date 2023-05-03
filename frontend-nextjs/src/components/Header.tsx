import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { resetState } from "@/store/reducers/user";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const user = useAppSelector((state: IReduxState) => state.user.data?.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleUserLogout() {
    dispatch(resetState());
    router.push("/");
  }

  return (
    <Container>
      <Content>
        <Title onClick={() => router.push("/painel")}>Banco Digital</Title>
        {user && (
          <ControllContainer>
            <UserProfile onClick={() => router.push("/perfil")}>
              <UserIcon />
              <UserName>
                {user.firstName} {user.lastName}
              </UserName>
            </UserProfile>
            <LogoutButton onClick={handleUserLogout}>
              <p>Sair</p>
              <LogoutIcon />
            </LogoutButton>
          </ControllContainer>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.header`
  background-color: #151515;
  color: #f5f5f5;
  height: 132px;
  display: flex;
  box-shadow: 0px 0px 4px 2px #fa92ff;
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
  text-transform: uppercase;
  cursor: pointer;
`;

const ControllContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 64px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    opacity: 0.85;
  }
`;

const UserIcon = styled.div`
  width: 56px;
  height: 56px;
  background-color: #fff;
  border-radius: 100%;
`;

const UserName = styled.p`
  text-transform: uppercase;
  font-size: 1.25rem;
`;

const LogoutButton = styled.button`
  padding: 16px;
  font-size: 1.25rem;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  gap: 8px;
  &:hover {
    background-color: #ffc1ff;
  }
`;

export default Header;
