import React from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";

import "./LoginScreen.css";

const LoginScreen = () => {
  return (
    <div className="login-container">
      <NavLink to="/" end>
        Voltar
      </NavLink>
      <h1 className="primary-title">FAZER LOGIN</h1>
      <LoginForm />
    </div>
  );
};

export default LoginScreen;
