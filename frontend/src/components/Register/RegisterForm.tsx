import React from "react";
import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = React.useState("");
  const [validUsername, setValidUsername] = React.useState(false);
  const [usernameExist, setUsernameExist] = React.useState(false);

  const [password, setPassword] = React.useState("");
  const [validPassword, setValidPassword] = React.useState(false);

  const [registerStatus, setRegisterStatus] = React.useState(0);

  // Obtém o username do input e salva o estado em uma variável
  function verifyUsername({ target }: any) {
    setUsername(target.value);
    if (target.value === "") {
      return setValidUsername(false);
    }
    if ([...target.value].length >= 3) {
      // searchExistingUsername(target.value);
    }
  }

  React.useEffect(() => {
    if (username !== "") {
      const delayDebounceFn = setTimeout(async () => {
        const response = await fetch(
          `https://ng-cash-app-production.up.railway.app/byUsername/${username}`
        );
        const json = await response.json();
        if (json) {
          return setUsernameExist(true);
        }
        return setUsernameExist(false);
      }, 1500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [username]);

  React.useEffect(() => {
    const usernameExisting = document.querySelector(".username-existing");
    if (usernameExist) {
      return usernameExisting?.classList.add("active");
    }
    return usernameExisting?.classList.remove("active");
  }, [usernameExist]);

  // Verifica se o username possui os requisitos necessários
  React.useEffect(() => {
    // Verifica se o username está vazio, caso sim, remove a classe "active" do requisito
    if (username === "") {
      document.querySelector(".username-condition")?.classList.remove("active");
    }

    // Verifica se o username contém o mínimo de 3 caracteres
    if ([...username].length < 3) {
      document.querySelector(".username-condition")?.classList.remove("active");
      setValidUsername(false);
    } else {
      document.querySelector(".username-condition")?.classList.add("active");
      setValidUsername(true);
    }
  }, [username]);

  // Obtém a senha do input e salva o estado em uma variável
  function verifyPassword({ target }: any) {
    setPassword(target.value);
    if (target.value === "") {
      setValidPassword(false);
    }
  }

  // Verifica se a senha possui os requisitos necessários
  React.useEffect(() => {
    let condicoes = 0;

    // Verifica se a senha está vazia, caso sim, remove a classe "active" de cada requisito
    if (password === "") {
      return document
        .querySelectorAll(".password-conditions span")
        ?.forEach((span) => span.classList.remove("active"));
    }

    // Verifica se a senha possui letras minúsculas
    if (!password.match(/[a-z]/g)) {
      document
        .querySelector(".password-condition-1")
        ?.classList.remove("active");
    } else {
      document.querySelector(".password-condition-1")?.classList.add("active");
      condicoes++;
    }

    // Verifica se a senha possui letras maiúsculas
    if (!password.match(/[A-Z]/g)) {
      document
        .querySelector(".password-condition-2")
        ?.classList.remove("active");
    } else {
      document.querySelector(".password-condition-2")?.classList.add("active");
      condicoes++;
    }

    // Verifica se a senha possui números
    if (!password.match(/[0-9]/g)) {
      document
        .querySelector(".password-condition-3")
        ?.classList.remove("active");
    } else {
      document.querySelector(".password-condition-3")?.classList.add("active");
      condicoes++;
    }

    // Verifica se a senha possui caracteres especiais
    if (!password.match(/\W|_/g)) {
      document
        .querySelector(".password-condition-4")
        ?.classList.remove("active");
    } else {
      document.querySelector(".password-condition-4")?.classList.add("active");
      condicoes++;
    }

    // Verifica se a senha contém 8 ou mais caracteres
    if ([...password].length < 8) {
      document
        .querySelector(".password-condition-5")
        ?.classList.remove("active");
    } else {
      document.querySelector(".password-condition-5")?.classList.add("active");
      condicoes++;
    }

    // Caso todos os requisitos de senha sejam atendidos, a senha é validada para uso
    if (condicoes === 5) {
      return setValidPassword(true);
    } else {
      return setValidPassword(false);
    }
  }, [password]);

  // Se o username e senha forem válidos, o botão ficará ativo, caso contrário, inativo
  React.useEffect(() => {
    const registerButton = document.querySelector(".register-button");
    if (validUsername && validPassword && !usernameExist) {
      return registerButton?.classList.add("active");
    }
    return registerButton?.classList.remove("active");
  }, [validUsername, validPassword, usernameExist]);

  // Registra o usuário após todas as validações
  function registerUser(e: any) {
    e.preventDefault();
    if (validUsername && validPassword) {
      fetchPostUser(username, password);
    }
  }

  async function fetchPostUser(user: any, pass: any) {
    const userData = { username: user, password: pass };

    axios
      .post("https://ng-cash-app-production.up.railway.app/", userData)
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error));
  }

  return (
    <form className="register-form">
      <label htmlFor="username">Usuário</label>
      <input
        onChange={verifyUsername}
        type="text"
        name="username"
        id="username"
        required
      />
      <span className="username-existing">
        Este nome de usuário já está em uso!
      </span>
      <span className="condition">Pelo menos:</span>
      <div>
        <span className="username-condition">No mínimo 3 caracteres.</span>
      </div>
      <label htmlFor="password">Senha</label>
      <input
        onChange={verifyPassword}
        type="password"
        name="password"
        id="password"
        required
      />
      <span className="condition">Pelo menos:</span>
      <div className="password-conditions">
        <span className="password-condition-1">1 letras minúsculas;</span>
        <span className="password-condition-2">1 letra maiúscula;</span>
        <span className="password-condition-3">1 número;</span>
        <span className="password-condition-4">1 caracter especial;</span>
        <span className="password-condition-5">No mínimo 8 caracteres.</span>
      </div>
      <div className="register-button-container">
        <button className="register-button" onClick={registerUser}>
          Registrar
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
