import React from "react";
import LoginScreen from "./components/Login/LoginScreen";
import RegisterScreen from "./components/Register/RegisterScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstScreen from "./components/FirstScreen/FirstScreen";
import HomeScreen from "./components/HomeScreen/HomeScreen";

function App() {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const local = sessionStorage.getItem("login");
    if (local !== null) {
      const login = JSON.parse(local);
      setToken(login.token);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <Route path="/" element={<HomeScreen />} />
        ) : (
          <Route path="/" element={<FirstScreen />} />
        )}
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="home" element={<HomeScreen />} />
        <Route
          path="*"
          element={<div>ERRO 404 - Página não encontrada.</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
