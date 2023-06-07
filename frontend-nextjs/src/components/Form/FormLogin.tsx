import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchLogin } from "@/store/reducers/login";
import React, { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import * as Styled from "../styles/Components.styled";
import { CircularProgress } from "@mui/material";

const FormLogin = () => {
  const [loginData, setLoginData] = useState<ILoginFormData>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: IReduxState) => state.login);
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
      dispatch(
        fetchLogin({
          username: loginData.username.toLowerCase(),
          password: loginData.password,
        })
      );
    }
  }

  return (
    <Styled.FormContainer className="animeRight">
      <Styled.SubTitle>Faça seu login</Styled.SubTitle>
      <Styled.Form onSubmit={handleUserLogin}>
        <Input
          label="E-mail"
          id="login-username"
          formData={loginData}
          value={loginData.username}
          saveFormData={setLoginData}
          autocomplete="current-username"
        />
        <Input
          label="Senha"
          id="login-password"
          formData={loginData}
          value={loginData.password}
          saveFormData={setLoginData}
          type="password"
          autocomplete="current-password"
        />
        <Styled.ButtonContainer>
          <Styled.Button disabled={loading || unfilledFields}>
            {loading ? "Entrando" : "Entrar"}
          </Styled.Button>
        </Styled.ButtonContainer>
      </Styled.Form>
    </Styled.FormContainer>
  );
};

export default FormLogin;
