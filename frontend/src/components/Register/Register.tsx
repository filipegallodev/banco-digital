import React from "react";

import "./Register.css";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [validUsername, setValidUsername] = React.useState(false);

  const [password, setPassword] = React.useState("");
  const [validPassword, setValidPassword] = React.useState(false);

  // Obtém o username do input e salva o estado em uma variável
  function verifyUsername({ target }: any) {
    setUsername(target.value);
  }

  // Verifica se o username possui os requisitos necessários
  React.useEffect(() => {
    // Verifica se o username está vazio, caso sim, remove a classe "active" do requisito
    if (username === "") {
      document.querySelector(".username-condition")?.classList.remove("active");
    }

    // Verifica se o username contém o mínimo de 3 caracteres
    if ([...username].length < 3) {
      document.querySelector(".username-condition")?.classList.remove("active");
    } else {
      document.querySelector(".username-condition")?.classList.add("active");
      setValidUsername(true);
    }
  }, [username]);

  // Obtém a senha do input e salva o estado em uma variável
  function verifyPassword({ target }: any) {
    setPassword(target.value);
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
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }, [password]);

  return (
    <div className="register-container">
      <h1 className="primary-title">Registre-se</h1>
      <form>
        <label htmlFor="username">Usuário</label>
        <input
          onChange={verifyUsername}
          type="text"
          name="username"
          id="username"
          required
        />
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
          <button
            className="register-button"
            onClick={(e) => e.preventDefault()}
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
