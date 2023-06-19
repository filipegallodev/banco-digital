import { useAppDispatch } from "@/hooks/useAppDispatch";
import React, { useState, useEffect } from "react";
import * as Styled from "../../styles/Components.styled";
import { useAppSelector } from "@/hooks/useAppSelector";
import Input from "@/components/Form/Input";
import { CircularProgress } from "@mui/material";
import { clearUserStatus, fetchEmailUpdate } from "@/store/reducers/user";

const defaultEmailData = {
  oldEmail: "",
  newEmail: "",
  newEmailConfirm: "",
};

const ProfileChangeEmail = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.user);
  const [changeEmailData, setChangeEmailData] = useState(defaultEmailData);
  const [inputError, setInputError] = useState<string>("");

  useEffect(() => {
    dispatch(clearUserStatus());
  }, [dispatch]);

  useEffect(() => {
    if (changeEmailData.newEmail !== changeEmailData.newEmailConfirm) {
      return setInputError("E-mails não coincidem.");
    }
    setInputError("");
  }, [changeEmailData]);

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (changeEmailData.oldEmail && changeEmailData.newEmail && !inputError) {
      dispatch(
        fetchEmailUpdate({
          oldEmail: changeEmailData.oldEmail,
          newEmail: changeEmailData.newEmail,
        })
      );
      setChangeEmailData(defaultEmailData);
    }
  }

  return (
    <>
      <Styled.ThirdTitle>E-mail</Styled.ThirdTitle>
      <Styled.FormContainer>
        <Styled.Form onSubmit={handleFormSubmit}>
          <Input
            label="E-mail atual"
            id="oldEmail"
            type="email"
            placeholder="atual@exemplo.com"
            formData={changeEmailData}
            saveFormData={setChangeEmailData}
            value={changeEmailData.oldEmail}
          />
          <Input
            label="Novo e-mail"
            id="newEmail"
            type="email"
            placeholder="novo@exemplo.com"
            formData={changeEmailData}
            saveFormData={setChangeEmailData}
            value={changeEmailData.newEmail}
          />
          <Input
            label="Confirme o novo e-mail"
            id="newEmailConfirm"
            type="email"
            placeholder="novo@exemplo.com"
            formData={changeEmailData}
            saveFormData={setChangeEmailData}
            value={changeEmailData.newEmailConfirm}
          />
          <Styled.ButtonContainer>
            <Styled.Button
              disabled={
                !changeEmailData.oldEmail ||
                !changeEmailData.newEmailConfirm ||
                inputError ||
                loading
                  ? true
                  : false
              }
            >
              Trocar e-mail
            </Styled.Button>
            {inputError && <Styled.ErrorText>{inputError}</Styled.ErrorText>}
          </Styled.ButtonContainer>
        </Styled.Form>
      </Styled.FormContainer>
    </>
  );
};

export default ProfileChangeEmail;
