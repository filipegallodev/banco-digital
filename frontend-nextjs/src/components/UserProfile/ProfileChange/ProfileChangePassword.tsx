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
                inputError ||
                loading
                  ? true
                  : false
              }
            >
              Trocar senha
            </Styled.Button>
            {loading && <CircularProgress />}
            {inputError && <p>{inputError}</p>}
          </Styled.ButtonContainer>
        </Styled.Form>
      </Styled.FormContainer>
    </>
  );
};

export default ProfileChangePassword;
