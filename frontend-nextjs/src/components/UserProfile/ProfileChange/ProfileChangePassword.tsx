import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import React, { useState, useEffect } from "react";
import * as Styled from "../../styles/Components.styled";
import Input from "@/components/Form/Input";
import PasswordRequirements from "../../PasswordRequirements";
import { fetchPasswordUpdate } from "@/store/reducers/user";

const defaultPasswordData = {
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
};

const ProfileChangePassword = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const [changePasswordData, setChangePasswordData] =
    useState(defaultPasswordData);
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
    ) {
      dispatch(
        fetchPasswordUpdate({
          oldPassword: changePasswordData.oldPassword,
          newPassword: changePasswordData.newPassword,
        })
      );
      setChangePasswordData(defaultPasswordData);
    }
  }

  return (
    <>
      <Styled.ThirdTitle>Senha</Styled.ThirdTitle>
      <PasswordRequirements />
      <Styled.FormContainer>
        <Styled.Form onSubmit={handleFormSubmit}>
          <Input
            placeholder="Senha atual"
            id="oldPassword"
            formData={changePasswordData}
            saveFormData={setChangePasswordData}
            value={changePasswordData.oldPassword}
            type="password"
            autoComplete="current-password"
          />
          <Input
            placeholder="Nova senha"
            id="newPassword"
            formData={changePasswordData}
            saveFormData={setChangePasswordData}
            value={changePasswordData.newPassword}
            type="password"
            autoComplete="new-password"
          />
          <Input
            placeholder="Confirme a nova senha"
            id="newPasswordConfirm"
            formData={changePasswordData}
            saveFormData={setChangePasswordData}
            value={changePasswordData.newPasswordConfirm}
            type="password"
            autoComplete="new-password"
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
            {inputError && <Styled.ErrorText>{inputError}</Styled.ErrorText>}
          </Styled.ButtonContainer>
        </Styled.Form>
      </Styled.FormContainer>
    </>
  );
};

export default ProfileChangePassword;
