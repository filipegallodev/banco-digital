import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import React, { useState, useEffect } from "react";
import * as Styled from "../../styles/Components.styled";
import Input from "@/components/Form/Input";
import { CircularProgress } from "@mui/material";
import { fetchPasswordUpdate } from "@/store/reducers/user";

const ProfileChangePassword = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: IReduxState) => state.user);
  const [changePasswordData, setChangePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [inputError, setInputError] = useState<string>("");

  useEffect(() => {
    if (
      changePasswordData.newPassword !== changePasswordData.newPasswordConfirm
    ) {
      return setInputError("Senhas não coincidem.");
    }
    setInputError("");
  }, [changePasswordData]);

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (
      changePasswordData.oldPassword &&
      changePasswordData.newPassword &&
      !inputError
    )
      dispatch(
        fetchPasswordUpdate({
          oldPassword: changePasswordData.oldPassword,
          newPassword: changePasswordData.newPassword,
        })
      );
  }

  return (
    <>
      <Styled.ThirdTitle>Senha</Styled.ThirdTitle>
      <Styled.FormContainer>
        <Styled.Form onSubmit={handleFormSubmit}>
          <Input
            label="Senha atual"
            id="oldPassword"
            formData={changePasswordData}
            saveFormData={setChangePasswordData}
            value={changePasswordData.oldPassword}
            type="password"
            autocomplete="current-password"
          />
          <Input
            label="Nova senha"
            id="newPassword"
            formData={changePasswordData}
            saveFormData={setChangePasswordData}
            value={changePasswordData.newPassword}
            type="password"
            autocomplete="new-password"
          />
          <Input
            label="Confirme a nova senha"
            id="newPasswordConfirm"
            formData={changePasswordData}
            saveFormData={setChangePasswordData}
            value={changePasswordData.newPasswordConfirm}
            type="password"
            autocomplete="new-password"
          />
          <Styled.ButtonContainer>
            <Styled.Button
              disabled={
                !changePasswordData.oldPassword ||
                !changePasswordData.newPasswordConfirm ||
                inputError ||
                loading
                  ? true
                  : false
              }
            >
              Trocar senha
            </Styled.Button>
            {inputError && <p>{inputError}</p>}
          </Styled.ButtonContainer>
        </Styled.Form>
      </Styled.FormContainer>
    </>
  );
};

export default ProfileChangePassword;
