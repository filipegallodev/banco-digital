import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchLogin } from "@/store/reducers/login";
import React, { useState } from "react";

const FormLogin = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const dispatch = useAppDispatch();

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    if (loginData.username && loginData.password) {
      dispatch(fetchLogin(loginData));
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <button>Login</button>
      </form>
    </div>
  );
};

export default FormLogin;
