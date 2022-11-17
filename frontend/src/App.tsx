import React from "react";
import LoginScreen from "./components/Login/LoginScreen";
import RegisterScreen from "./components/Register/RegisterScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstScreen from "./components/FirstScreen/FirstScreen";
import HomeScreen from "./components/HomeScreen/HomeScreen";

import "./main.css";
import logo from "./assets/ngcash-logo.svg";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<HomeScreen />} />
      </Routes>
      <div className="first-screen-container">
        <div>
          <div className="ng-cash-logo">
            <img src={logo} alt="NG.Cash Logo"></img>
            {/* Logo obtido no site oficial da NG.Cash, apenas para objetivo de uso neste projeto pessoal */}
          </div>
          <div className="description-container">
            <div className="first-screen-description">
              <p>A carteira da nova geração.</p>
              <p>É para todas as idades!</p>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<FirstScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
