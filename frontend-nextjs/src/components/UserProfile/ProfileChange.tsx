import React, { useState } from "react";
import * as Styled from "../styles/Components.styled";
import styled from "styled-components";
import Input from "../Form/Input";

const ProfileChange = () => {
  const [changeEmailData, setChangeEmailData] = useState({
    oldEmail: "",
    newEmail: "",
    newEmailConfirm: "",
  });
  const [changePasswordData, setChangePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  return (
    <Container className="animeRight">
      <Styled.SubTitle>Trocar e-mail/senha</Styled.SubTitle>
      <Styled.ThirdTitle>E-mail</Styled.ThirdTitle>
      <Input
        name="E-mail atual"
        id="old-email"
        formData={changeEmailData}
        saveFormData={setChangeEmailData}
        value={changeEmailData.oldEmail}
      />
      <Input
        name="Novo e-mail"
        id="new-email"
        formData={changeEmailData}
        saveFormData={setChangeEmailData}
        value={changeEmailData.oldEmail}
      />
      <Input
        name="Confirme o novo e-mail"
        id="new-email-confirm"
        formData={changeEmailData}
        saveFormData={setChangeEmailData}
        value={changeEmailData.oldEmail}
      />
      <Styled.Button>Trocar e-mail</Styled.Button>
      <Styled.ThirdTitle>Senha</Styled.ThirdTitle>
      <Input
        name="Senha atual"
        id="old-password"
        formData={changePasswordData}
        saveFormData={setChangePasswordData}
        value={changePasswordData.oldPassword}
      />
      <Input
        name="Nova senha"
        id="new-password"
        formData={changePasswordData}
        saveFormData={setChangePasswordData}
        value={changePasswordData.oldPassword}
      />
      <Input
        name="Nova senha"
        id="new-password-confirm"
        formData={changePasswordData}
        saveFormData={setChangePasswordData}
        value={changePasswordData.oldPassword}
      />
      <Styled.Button>Trocar senha</Styled.Button>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  width: 100%;
`;

export default ProfileChange;
