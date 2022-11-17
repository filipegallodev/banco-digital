import React from "react";
import { NavLink } from "react-router-dom";
import RegisterForm from "./RegisterForm";

import "./RegisterScreen.css";

const RegisterScreen = () => {
  return (
    <div className="register-container">
      <NavLink to="/" end>
        Voltar
      </NavLink>
      <h1 className="primary-title">Registre-se</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterScreen;
