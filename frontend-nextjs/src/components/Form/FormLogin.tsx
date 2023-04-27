import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchLogin } from "@/store/reducers/login";
import React, { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import * as Styled from "../styles/Components.styled";
import Error from "../Status/Error";
import { CircularProgress } from "@mui/material";
import Success from "../Status/Success";

const FormLogin = () => {
  const [loginData, setLoginData] = useState<ILoginFormData>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
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
          id="login-username"
          formData={loginData}
          saveFormData={setLoginData}
        />
        <Input
          name="Senha"
          id="login-password"
          formData={loginData}
          saveFormData={setLoginData}
        />
        <Styled.ButtonContainer>
          <Styled.Button disabled={loading || unfilledFields}>
            {loading ? "Entrando" : "Entrar"}
          </Styled.Button>
          {loading && <CircularProgress />}
        </Styled.ButtonContainer>
        <Success message={data?.status}/>
        <Error message={error} />
      </Styled.Form>
    </Styled.FormContainer>
  );
};

export default FormLogin;
