import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchRegister } from "@/store/reducers/register";
import React, { useEffect, useRef, useState } from "react";

const FormRegister = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.register
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function handleUserRegister(event: React.FormEvent) {
    event.preventDefault();
    const { firstName, lastName, email, password } = registerData;
    if (firstName && lastName && email && password) {
      dispatch(fetchRegister({ username: email, password }));
    }
  }

  useEffect(() => {
    if (loading) return setButtonDisabled(true);
    setButtonDisabled(false);
  }, [loading]);

  return (
    <div>
      <h2>Preencha seu cadastro</h2>
      <form onSubmit={handleUserRegister}>
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
        <button disabled={buttonDisabled}>Registrar</button>
        {loading && <p>Realizando cadastro...</p>}
        {data?.status && <p>{data.status}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default FormRegister;
