import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchLogin } from "@/store/reducers/login";
import React, { useCallback, useEffect, useState } from "react";
import Input from "../Input";
import * as Styled from "../../styles/Components.styled";

const FormLogin = () => {
  const { loading } = useAppSelector((state: IReduxState) => state.login);
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState<ILoginFormData>({
    username: "",
    password: "",
  });
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
      <Styled.ThirdTitle>Login</Styled.ThirdTitle>
      <Styled.Form onSubmit={handleUserLogin}>
        <Input
          id="login-username"
          placeholder="E-mail"
          formData={loginData}
          value={loginData.username}
          saveFormData={setLoginData}
          autoComplete="off"
          autoFocus
        />
        <Input
          id="login-password"
          placeholder="Senha"
          formData={loginData}
          value={loginData.password}
          saveFormData={setLoginData}
          type="password"
          autoComplete="off"
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
