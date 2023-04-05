import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchLogin } from "@/store/reducers/login";
import React, { useState } from "react";

// Login Test:
// username: fulanodetal
// password: Senha@302

const FormLogin = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.login);

  function handleUserLogin(event: React.FormEvent) {
    event.preventDefault();
    if (loginData.username && loginData.password) {
      dispatch(fetchLogin(loginData));
    }
  }

  return (
    <div>
      <h2>Faça seu login</h2>
      <form onSubmit={handleUserLogin}>
        <label htmlFor="username">Usuário</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={({ target }) =>
            setLoginData({ ...loginData, username: target.value })
          }
        />
        <label htmlFor="password">Senha</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={({ target }) =>
            setLoginData({ ...loginData, password: target.value })
          }
        />
        <button disabled={loading}>Entrar</button>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default FormLogin;
