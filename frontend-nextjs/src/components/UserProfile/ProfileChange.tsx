import React, { useState, useEffect } from "react";
import * as Styled from "../styles/Components.styled";
import styled from "styled-components";
import Input from "../Form/Input";
import Error from "../Status/Error";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchEmailUpdate } from "@/store/reducers/user";
import { useAppSelector } from "@/hooks/useAppSelector";
import Success from "../Status/Success";
import { CircularProgress } from "@mui/material";

const ProfileChange = () => {
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector(
    (state: IReduxState) => state.user
  );
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
    return setChangeEmailData({
      ...changeEmailData,
      error: "",
    });
  }, [changeEmailData.oldEmail]);

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
  }, [changeEmailData.newEmail, changeEmailData.newEmailConfirm]);

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
  }, [changePasswordData.newPassword, changePasswordData.newPasswordConfirm]);

  function handleEmailChange(event: React.FormEvent) {
    event.preventDefault();
    if (changeEmailData.oldEmail !== data?.user.username) {
      return setChangeEmailData({
        ...changeEmailData,
        error: "E-mail atual não coincide com o cadastrado.",
      });
    }
    if (changeEmailData.newEmail === data?.user.username) {
      return setChangeEmailData({
        ...changeEmailData,
        error: "O novo e-mail é igual ao e-mail atual.",
      });
    }
    if (
      changeEmailData.oldEmail &&
      changeEmailData.newEmail &&
      !changeEmailData.error
    )
      dispatch(
        fetchEmailUpdate({
          oldEmail: changeEmailData.oldEmail,
          newEmail: changeEmailData.newEmail,
        })
      );
  }

  return (
    <Container className="animeRight">
      <Styled.SubTitle>Trocar e-mail/senha</Styled.SubTitle>
      <Styled.ThirdTitle>E-mail</Styled.ThirdTitle>
      <Styled.FormContainer>
        <Styled.Form onSubmit={handleEmailChange}>
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
            <Styled.Button
              disabled={
                !changeEmailData.oldEmail ||
                !changeEmailData.newEmailConfirm ||
                changeEmailData.error ||
                loading
                  ? true
                  : false
              }
            >
              Trocar e-mail
            </Styled.Button>
            {loading && <CircularProgress />}
            <Success message={data?.status} />
            <Error message={error} />
            {changeEmailData.error && <Error message={changeEmailData.error} />}
          </Styled.ButtonContainer>
        </Styled.Form>
      </Styled.FormContainer>
      <Styled.ThirdTitle>Senha</Styled.ThirdTitle>
      <Styled.FormContainer>
        <Styled.Form>
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
            name="Confirme a nova senha"
            id="newPasswordConfirm"
            formData={changePasswordData}
            saveFormData={setChangePasswordData}
            value={changePasswordData.newPasswordConfirm}
          />
          <Styled.ButtonContainer>
            <Styled.Button
              disabled={
                !changePasswordData.oldPassword ||
                !changePasswordData.newPasswordConfirm ||
                changePasswordData.error
                  ? true
                  : false
              }
            >
              Trocar senha
            </Styled.Button>
            {changePasswordData.error && (
              <Error message={changePasswordData.error} />
            )}
          </Styled.ButtonContainer>
        </Styled.Form>
      </Styled.FormContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  width: 100%;
`;

export default ProfileChange;
