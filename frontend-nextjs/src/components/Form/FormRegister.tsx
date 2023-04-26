import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchRegister } from "@/store/reducers/register";
import React, { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import * as Styled from "../styles/Components.styled";

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
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.register
  );

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
          username: registerData.username,
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
    <Styled.FormContainer>
      <Styled.SubTitle>Preencha seu cadastro</Styled.SubTitle>
      <Styled.Form onSubmit={handleUserRegister}>
        <div>
          <Input
            name="Nome"
            id="firstName"
            formData={registerData}
            saveFormData={setRegisterData}
          />
          <Input
            name="Sobrenome"
            id="lastName"
            formData={registerData}
            saveFormData={setRegisterData}
          />
        </div>
        <Input
          name="E-mail"
          id="username"
          type="email"
          formData={registerData}
          saveFormData={setRegisterData}
        />
        <div>
          <Input
            name="Senha"
            id="password"
            formData={registerData}
            saveFormData={setRegisterData}
            onBlur={handleUserPassword}
          />
          {invalidPassword && (
            <p>
              Formato de senha inválido. Utilize ao menos oito caracteres, uma
              letra minúscula, uma letra maiúscula, um número e um caractere
              especial.
            </p>
          )}
        </div>
        <Styled.Button disabled={loading || unfilledFields}>
          Registrar
        </Styled.Button>
        {loading && <p>Realizando cadastro...</p>}
        {data?.status && <p>{data.status}</p>}
        {error && <p>{error}</p>}
      </Styled.Form>
    </Styled.FormContainer>
  );
};

export default FormRegister;
