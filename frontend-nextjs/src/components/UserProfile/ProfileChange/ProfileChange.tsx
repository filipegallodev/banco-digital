import React from "react";
import * as Styled from "../../styles/Components.styled";
import styled from "styled-components";
import ProfileChangeEmail from "./ProfileChangeEmail";
import ProfileChangePassword from "./ProfileChangePassword";

const ProfileChange = () => {
  return (
    <Container className="animeRight">
      <Styled.SubTitle>Trocar e-mail/senha</Styled.SubTitle>
      <Styled.Text>
        Nesta seção você pode alterar seu e-mail e sua senha.
      </Styled.Text>
      <ProfileChangeEmail />
      <ProfileChangePassword />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default ProfileChange;
