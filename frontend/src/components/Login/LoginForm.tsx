import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER_LOGIN_URL = "https://ng-cash-app-production.up.railway.app/login";

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginStatus, setLoginStatus] = React.useState(false);
  const [authorizationToken, setAuthorizationToken] = React.useState("");

  const navigate = useNavigate();

  // Obtém o username digitado pelo usuário
  function verifyUsername({ target }: any) {
    setUsername(target.value);
  }

  // Obtém a senha digitada pelo usuário
  function verifyPassword({ target }: any) {
    setPassword(target.value);
  }

  // Realiza o login do usuário caso as informações estejam corretas
  function handleLogin(e: any) {
    e.preventDefault();
    if (!username || !password) {
      return null;
    }
    const userData = { username: username, password: password };
    axios
      .post(SERVER_LOGIN_URL, userData)
      .then((response) => {
        setLoginStatus(response.data.auth);
        setAuthorizationToken(response.data.token);
      })
      .catch((error) => error);
  }

  // Verifica se o status de login e o token de autorização existem e depois salva no armazenamento da sessão
  React.useEffect(() => {
    if (!loginStatus && authorizationToken === "") return;
    sessionStorage.setItem(
      "login",
      JSON.stringify({ status: loginStatus, token: authorizationToken })
    );
    navigate("/home");
  }, [loginStatus, authorizationToken]);

  return (
    <form className="login-form">
      <label htmlFor="login-username">Usuário</label>
      <input
        onChange={verifyUsername}
        type="text"
        name="login-username"
        id="login-username"
        required
      />
      <label htmlFor="login-password">Senha</label>
      <input
        onChange={verifyPassword}
        type="password"
        name="login-password"
        id="login-password"
        required
      />
      <div>
        <button className="active" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
