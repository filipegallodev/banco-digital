import React, { useState, useEffect } from "react";
import * as Styled from "../styles/Components.styled";
import styled from "styled-components";
import Input from "../Form/Input";
import Error from "../Status/Error";

const ProfileChange = () => {
  const [changeEmailData, setChangeEmailData] = useState({
    oldEmail: "",
    newEmail: "",
    newEmailConfirm: "",
    error: "",
  });
  const [changePasswordData, setChangePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
    error: "",
  });

  useEffect(() => {
    if (changeEmailData.newEmail !== changeEmailData.newEmailConfirm) {
      return setChangeEmailData({
        ...changeEmailData,
        error: "E-mails não coincidem.",
      });
    }
    return setChangeEmailData({
      ...changeEmailData,
      error: "",
    });
  }, [changeEmailData]);

  useEffect(() => {
    if (
      changePasswordData.newPassword !== changePasswordData.newPasswordConfirm
    ) {
      return setChangePasswordData({
        ...changePasswordData,
        error: "Senhas não coincidem.",
      });
    }
    return setChangePasswordData({
      ...changePasswordData,
      error: "",
    });
  }, [changePasswordData]);

  return (
    <Container className="animeRight">
      <Styled.SubTitle>Trocar e-mail/senha</Styled.SubTitle>
      <Styled.ThirdTitle>E-mail</Styled.ThirdTitle>
      <Styled.Form>
        <Input
          name="E-mail atual"
          id="oldEmail"
          type="email"
          formData={changeEmailData}
          saveFormData={setChangeEmailData}
          value={changeEmailData.oldEmail}
        />
        <Input
          name="Novo e-mail"
          id="newEmail"
          type="email"
          formData={changeEmailData}
          saveFormData={setChangeEmailData}
          value={changeEmailData.newEmail}
        />
        <Input
          name="Confirme o novo e-mail"
          id="newEmailConfirm"
          type="email"
          formData={changeEmailData}
          saveFormData={setChangeEmailData}
          value={changeEmailData.newEmailConfirm}
        />
        <Styled.ButtonContainer>
          <Styled.Button disabled={changeEmailData.error ? true : false}>
            Trocar e-mail
          </Styled.Button>
          {changeEmailData.error && <Error message={changeEmailData.error} />}
        </Styled.ButtonContainer>
      </Styled.Form>
      <Styled.ThirdTitle>Senha</Styled.ThirdTitle>
      <Input
        name="Senha atual"
        id="oldPassword"
        formData={changePasswordData}
        saveFormData={setChangePasswordData}
        value={changePasswordData.oldPassword}
      />
      <Input
        name="Nova senha"
        id="newPassword"
        formData={changePasswordData}
        saveFormData={setChangePasswordData}
        value={changePasswordData.newPassword}
      />
      <Input
        name="Nova senha"
        id="newPasswordConfirm"
        formData={changePasswordData}
        saveFormData={setChangePasswordData}
        value={changePasswordData.newPasswordConfirm}
      />
      <Styled.ButtonContainer>
        <Styled.Button disabled={changePasswordData.error ? true : false}>
          Trocar senha
        </Styled.Button>
        {changePasswordData.error && (
          <Error message={changePasswordData.error} />
        )}
      </Styled.ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  width: 100%;
`;

export default ProfileChange;
