import React from "react";
import LoginForm from "./LoginForm";

import "./LoginScreen.css";

const LoginScreen = () => {
  return (
    <div className="login-container">
      <h1 className="primary-title">FAZER LOGIN</h1>
      <LoginForm />
    </div>
  );
};

export default LoginScreen;
