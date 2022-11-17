import React from "react";
import { NavLink } from "react-router-dom";

import "./FirstScreen.css";

const FirstScreen = () => {
  return (
    <div className="nav-container">
      <nav>
        <h2 className="primary-title">Já possui uma conta?</h2>
        <NavLink to="login">
          <button className="login-register">Entrar</button>
        </NavLink>
        <h2 className="secundary-title">
          Ainda não? Então não perca mais tempo! É{" "}
          <strong>muito simples</strong> abrir uma conta com a gente.
        </h2>
        <NavLink to="register">
          <button className="login-register">Registrar</button>
        </NavLink>
      </nav>
    </div>
  );
};

export default FirstScreen;
