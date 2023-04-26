import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchLogin } from "@/store/reducers/login";
import React, { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import * as Styled from "../styles/Components.styled";

const FormLogin = () => {
  const [loginData, setLoginData] = useState<ILoginFormData>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(
    (state: IReduxState) => state.login
  );
  const [unfilledFields, setUnfilledFields] = useState(true);

  const checkLoginFields = useCallback(() => {
    const { username, password } = loginData;
    if (username && password) return true;
    return false;
  }, [loginData]);

  useEffect(() => {
    if (checkLoginFields()) return setUnfilledFields(false);
    setUnfilledFields(true);
  }, [loginData, checkLoginFields]);

  function handleUserLogin(event: React.FormEvent) {
    event.preventDefault();
    if (loginData.username && loginData.password) {
      dispatch(fetchLogin(loginData));
    }
  }

  return (
    <Styled.FormContainer>
      <Styled.SubTitle>Faça seu login</Styled.SubTitle>
      <Styled.Form onSubmit={handleUserLogin}>
        <Input
          name="Nome"
          id="username"
          formData={loginData}
          saveFormData={setLoginData}
        />
        <Input
          name="Senha"
          id="password"
          formData={loginData}
          saveFormData={setLoginData}
        />
        <Styled.Button disabled={loading || unfilledFields}>
          Entrar
        </Styled.Button>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
      </Styled.Form>
    </Styled.FormContainer>
  );
};

export default FormLogin;
