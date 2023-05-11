import { useAppDispatch } from "@/hooks/useAppDispatch";
import React, { useState, useEffect } from "react";
import * as Styled from "../../styles/Components.styled";
import { useAppSelector } from "@/hooks/useAppSelector";
import Input from "@/components/Form/Input";
import Success from "@/components/Status/Success";
import Error from "@/components/Status/Error";
import { CircularProgress } from "@mui/material";
import { clearStatus, fetchEmailUpdate } from "@/store/reducers/user";

const ProfileChangeEmail = () => {
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector(
    (state: IReduxState) => state.user
  );
  const [changeEmailData, setChangeEmailData] = useState({
    oldEmail: "",
    newEmail: "",
    newEmailConfirm: "",
  });
  const [inputError, setInputError] = useState<string>("");

  useEffect(() => {
    dispatch(clearStatus());
  }, [dispatch]);

  useEffect(() => {
    if (changeEmailData.newEmail !== changeEmailData.newEmailConfirm) {
      return setInputError("E-mails não coincidem.");
    }
    setInputError("");
  }, [changeEmailData]);

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (changeEmailData.oldEmail !== data.user?.username) {
      return setInputError("E-mail atual não coincide com o cadastrado.");
    }
    if (changeEmailData.newEmail === data.user?.username) {
      return setInputError("O novo e-mail é igual ao e-mail atual.");
    }
    if (changeEmailData.oldEmail && changeEmailData.newEmail && !inputError)
      dispatch(
        fetchEmailUpdate({
          oldEmail: changeEmailData.oldEmail,
          newEmail: changeEmailData.newEmail,
        })
      );
  }

  return (
    <>
      <Styled.ThirdTitle>E-mail</Styled.ThirdTitle>
      <Styled.FormContainer>
        <Styled.Form onSubmit={handleFormSubmit}>
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
                inputError ||
                loading
                  ? true
                  : false
              }
            >
              Trocar e-mail
            </Styled.Button>
            {loading && <CircularProgress />}
            <Success message={!inputError ? data.status : ""} />
            <Error message={error || inputError} />
          </Styled.ButtonContainer>
        </Styled.Form>
      </Styled.FormContainer>
    </>
  );
};

export default ProfileChangeEmail;