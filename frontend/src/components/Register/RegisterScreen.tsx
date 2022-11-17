import React from "react";
import { NavLink } from "react-router-dom";
import RegisterForm from "./RegisterForm";

import "./RegisterScreen.css";

const RegisterScreen = () => {
  return (
    <div className="register-container">
      <NavLink to="/" end>
        <button className="return-button">Voltar</button>
      </NavLink>
      <h2 className="primary-title">Registre-se</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterScreen;
