import React from "react";

// URL para o caminho "/home" do servidor
const SERVER_URL = "https://ng-cash-app-production.up.railway.app/home";

function App() {
  const [data, setData] = React.useState<any>([]);

  // Buscando as informações no servidor
  React.useEffect(() => {
    fetch(SERVER_URL)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return <div>{data ? <p>{data.name}</p> : <p>Carregando...</p>}</div>;
}

export default App;
