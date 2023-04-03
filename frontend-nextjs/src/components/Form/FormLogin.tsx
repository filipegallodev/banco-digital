import React, { useEffect, useState } from "react";

const FormLogin = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  useEffect(() => {
    console.log(loginData);
  }, [loginData]);

  return (
    <div>
      <form>
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
      </form>
      <button>Login</button>
    </div>
  );
};

export default FormLogin;
