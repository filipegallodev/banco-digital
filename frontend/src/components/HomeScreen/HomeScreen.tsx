import React from "react";

import "./HomeScreen.css";

const HomeScreen = () => {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const local = sessionStorage.getItem("login");
    if (local !== null) {
      const login = JSON.parse(local);
      setToken(login.token);
    }
  }, []);

  if (token) {
    return <div className="home-screen">Token existe!</div>;
  }
  return (
    <div className="unauthorized-access">
      ERRO 401 - Você não tem permissão para ver esta página.
    </div>
  );
};

export default HomeScreen;
