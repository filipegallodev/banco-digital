import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchRegister } from "@/store/reducers/register";
import React, { useCallback, useEffect, useState } from "react";
import Input from "../Input";
import * as Styled from "../../styles/Components.styled";
import PasswordRequirements from "../../PasswordRequirements";
import styled from "styled-components";
import { stringCapitalize } from "@/helper/stringCapitalize";

const FormRegister = () => {
  const [registerData, setRegisterData] = useState<IRegisterFormData>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [unfilledFields, setUnfilledFields] = useState(true);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.register);

  const checkRegisterFields = useCallback(() => {
    const { firstName, lastName, username, password } = registerData;
    if (firstName && lastName && username && password) return true;
    return false;
  }, [registerData]);

  useEffect(() => {
    if (checkRegisterFields()) return setUnfilledFields(false);
    setUnfilledFields(true);
  }, [registerData, checkRegisterFields]);

  function handleUserRegister(event: React.FormEvent) {
    event.preventDefault();
    if (checkRegisterFields() && !invalidPassword) {
      let firstNameCapitalized = stringCapitalize(registerData.firstName);
      let lastNameCapitalized = stringCapitalize(registerData.lastName);
      dispatch(
        fetchRegister({
          username: registerData.username.toLowerCase(),
          password: registerData.password,
          firstName: firstNameCapitalized.join(" "),
          lastName: lastNameCapitalized.join(" "),
        })
      );
    }
  }

  function handleUserPassword() {
    const passwordRequirementsRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    if (!passwordRequirementsRegex.test(registerData.password)) {
      return setInvalidPassword(true);
    }
    setInvalidPassword(false);
  }

  return (
    <Styled.FormContainer className="animeRight">
      <Styled.ThirdTitle>Cadastre-se</Styled.ThirdTitle>
      <Styled.Text>
        É simples, basta preencher os campos e criar sua conta:
      </Styled.Text>
      <Styled.Form onSubmit={handleUserRegister}>
        <NameContainer>
          <Input
            id="register-firstName"
            placeholder="Nome"
            formData={registerData}
            value={registerData.firstName}
            saveFormData={setRegisterData}
            autoFocus
          />
          <Input
            id="register-lastName"
            placeholder="Sobrenome"
            formData={registerData}
            value={registerData.lastName}
            saveFormData={setRegisterData}
          />
        </NameContainer>
        <Input
          id="register-username"
          type="email"
          placeholder="E-mail"
          formData={registerData}
          value={registerData.username}
          saveFormData={setRegisterData}
          autoComplete="off"
        />
        <Input
          id="register-password"
          placeholder="Nova senha"
          formData={registerData}
          value={registerData.password}
          saveFormData={setRegisterData}
          onBlur={handleUserPassword}
          type="password"
          autoComplete="new-password"
        />
        {invalidPassword && (
          <Styled.ErrorText>Formato de senha inválido.</Styled.ErrorText>
        )}
        <PasswordRequirements />
        <Styled.ButtonContainer>
          <Styled.Button disabled={loading || unfilledFields}>
            {loading ? "Cadastrando" : "Cadastre-se"}
          </Styled.Button>
        </Styled.ButtonContainer>
      </Styled.Form>
    </Styled.FormContainer>
  );
};

const NameContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

export default FormRegister;
