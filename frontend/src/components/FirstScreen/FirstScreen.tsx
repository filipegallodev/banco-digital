import React from "react";
import { NavLink } from "react-router-dom";

const FirstScreen = () => {
  return (
    <nav>
      <NavLink to="login">Entrar</NavLink>
      <NavLink to="register">Registrar</NavLink>
    </nav>
  );
};

export default FirstScreen;
