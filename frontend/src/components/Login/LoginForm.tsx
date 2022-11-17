import React from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginStatus, setLoginStatus] = React.useState(false);

  function verifyUsername({ target }: any) {
    setUsername(target.value);
  }

  function verifyPassword({ target }: any) {
    setPassword(target.value);
  }

  function handleLogin(e: any) {
    e.preventDefault();
    if (!username || !password) {
      return null;
    }
    const userData = { username: username, password: password };
    axios
      .post("https://ng-cash-app-production.up.railway.app/login", userData)
      .then((response) => setLoginStatus(response.data))
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    if (!loginStatus) return;
    console.log("Logado!");
  }, [loginStatus]);

  return (
    <form>
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
        <button onClick={handleLogin}>Entrar</button>
      </div>
    </form>
  );
};

export default LoginForm;
