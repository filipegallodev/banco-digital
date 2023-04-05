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
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [unfilledFields, setUnfilledFields] = useState(true);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.register
  );

  useEffect(() => {
    if (checkRegisterFields()) return setUnfilledFields(false);
    setUnfilledFields(true);
  }, [registerData]);

  function handleUserRegister(event: React.FormEvent) {
    event.preventDefault();
    if (checkRegisterFields() && !invalidPassword) {
      dispatch(
        fetchRegister({
          username: registerData.email,
          password: registerData.password,
        })
      );
    }
  }

  function checkRegisterFields() {
    const { firstName, lastName, email, password } = registerData;
    if (firstName && lastName && email && password) {
      return true;
    }
    return false;
  }

  function handleUserPassword() {
    const passwordRequirementsRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    if (!passwordRequirementsRegex.test(registerData.password)) {
      return setInvalidPassword(true);
    }
    setInvalidPassword(false);
  }

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
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="text"
            id="password"
            name="password"
            onChange={({ target }) =>
              setRegisterData({ ...registerData, password: target.value })
            }
            onBlur={handleUserPassword}
          />
          {invalidPassword && <p>Formato inválido.</p>}
        </div>
        <button disabled={loading || unfilledFields}>Registrar</button>
        {loading && <p>Realizando cadastro...</p>}
        {data?.status && <p>{data.status}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default FormRegister;
