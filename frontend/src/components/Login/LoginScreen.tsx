import React from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";

import "./LoginScreen.css";

const LoginScreen = () => {
  return (
    <div className="login-container">
      <NavLink to="/" end>
        <button className="return-button active">Voltar</button>
      </NavLink>
      <h2 className="primary-title">FAZER LOGIN</h2>
      <LoginForm />
    </div>
  );
};

export default LoginScreen;
