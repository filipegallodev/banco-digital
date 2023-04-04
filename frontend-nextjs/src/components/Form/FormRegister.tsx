import React, { useState } from "react";

const FormRegister = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    const { firstName, lastName, email, password } = registerData;
    if (firstName && lastName && email && password) {
      console.log(registerData);
    }
  }

  return (
    <div>
      <h2>Preencha seu cadastro</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="firstName">Nome</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={({ target }) =>
              setRegisterData({ ...registerData, firstName: target.value })
            }
          />
          <label htmlFor="lastName">Sobrenome</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={({ target }) =>
              setRegisterData({ ...registerData, lastName: target.value })
            }
          />
        </div>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={({ target }) =>
            setRegisterData({ ...registerData, email: target.value })
          }
        />
        <label htmlFor="password">Senha</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={({ target }) =>
            setRegisterData({ ...registerData, password: target.value })
          }
        />
        <button>Registrar</button>
      </form>
    </div>
  );
};

export default FormRegister;
