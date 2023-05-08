import React from "react";
import * as Styled from "../../styles/Components.styled";
import styled from "styled-components";
import ProfileChangeEmail from "./ProfileChangeEmail";
import ProfileChangePassword from "./ProfileChangePassword";

const ProfileChange = () => {
  return (
    <Container className="animeRight">
      <Styled.SubTitle>Trocar e-mail/senha</Styled.SubTitle>
      <ProfileChangeEmail />
      <ProfileChangePassword />
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  width: 100%;
`;

export default ProfileChange;
