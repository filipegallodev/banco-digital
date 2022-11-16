import React from "react";

const RegisterForm = () => {
  const [username, setUsername] = React.useState("");
  const [validUsername, setValidUsername] = React.useState(false);

  const [password, setPassword] = React.useState("");
  const [validPassword, setValidPassword] = React.useState(false);

  // Obtém o username do input e salva o estado em uma variável
  function verifyUsername({ target }: any) {
    setUsername(target.value);
    if (target.value === "") {
      setValidUsername(false);
    }
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
    if (validUsername && validPassword) {
      return registerButton?.classList.add("active");
    }
    return registerButton?.classList.remove("active");
  }, [validUsername, validPassword]);

  // Registra o usuário após todas as validações
  function registerUser(e: any) {
    e.preventDefault();
    if (validUsername && validPassword) {
      console.log({ name: username, password: password });
    }
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
