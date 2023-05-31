import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchRegister } from "@/store/reducers/register";
import React, { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import * as Styled from "../styles/Components.styled";
import { CircularProgress } from "@mui/material";

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
  const { loading } = useAppSelector((state: IReduxState) => state.register);

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
      dispatch(
        fetchRegister({
          username: registerData.username.toLowerCase(),
          password: registerData.password,
          firstName: registerData.firstName,
          lastName: registerData.lastName,
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
      <Styled.SubTitle>Preencha seu cadastro</Styled.SubTitle>
      <Styled.Form onSubmit={handleUserRegister}>
        <div>
          <Input
            name="Nome"
            id="register-firstName"
            formData={registerData}
            value={registerData.firstName}
            saveFormData={setRegisterData}
          />
          <Input
            name="Sobrenome"
            id="register-lastName"
            formData={registerData}
            value={registerData.lastName}
            saveFormData={setRegisterData}
          />
        </div>
        <Input
          name="E-mail"
          id="register-username"
          type="email"
          formData={registerData}
          value={registerData.username}
          saveFormData={setRegisterData}
        />
        <div>
          <Input
            name="Senha"
            id="register-password"
            formData={registerData}
            value={registerData.password}
            saveFormData={setRegisterData}
            onBlur={handleUserPassword}
            type="password"
          />
          {invalidPassword && (
            <p>
              Formato de senha inválido. Utilize ao menos oito caracteres, uma
              letra minúscula, uma letra maiúscula, um número e um caractere
              especial.
            </p>
          )}
        </div>
        <Styled.ButtonContainer>
          <Styled.Button disabled={loading || unfilledFields}>
            {loading ? "Cadastrando" : "Registrar"}
          </Styled.Button>
        </Styled.ButtonContainer>
      </Styled.Form>
    </Styled.FormContainer>
  );
};

export default FormRegister;
