import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import React, { useState, useEffect } from "react";
import * as Styled from "../../styles/Components.styled";
import Input from "@/components/Form/Input";
import Success from "@/components/Status/Success";
import Error from "@/components/Status/Error";
import { CircularProgress } from "@mui/material";

const ProfileChangePassword = () => {
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector(
    (state: IReduxState) => state.user
  );
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
  }, [changePasswordData.newPassword, changePasswordData.newPasswordConfirm]);

  return (
    <>
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
                inputError
                  ? true
                  : false
              }
            >
              Trocar senha
            </Styled.Button>
            <Error message={inputError} />
          </Styled.ButtonContainer>
        </Styled.Form>
      </Styled.FormContainer>
    </>
  );
};

export default ProfileChangePassword;
