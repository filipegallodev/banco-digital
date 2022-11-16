import React from "react";
import RegisterForm from "./RegisterForm";

import "./RegisterScreen.css";

const Register = () => {
  return (
    <div className="register-container">
      <h1 className="primary-title">Registre-se</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
