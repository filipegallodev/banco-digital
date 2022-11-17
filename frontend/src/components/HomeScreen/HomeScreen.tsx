import axios from "axios";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";

import "./HomeScreen.css";

const SERVER_VALIDATE_URL =
  "https://ng-cash-app-production.up.railway.app/validateToken";

const SERVER_TRANSFER_URL =
  "https://ng-cash-app-production.up.railway.app/transfer";

const HomeScreen = () => {
  const [validToken, setValidToken] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [user, setUser] = React.useState({ username: null, balance: null });

  const [userToTransfer, setUserToTransfer] = React.useState(null);
  const [amountToTransfer, setAmountToTransfer] = React.useState(null);

  const [transactionLoading, setTransactionLoading] = React.useState(false);
  const [transactionStatus, setTransactionStatus] = React.useState(false);

  const userInput = React.useRef<any>(null);
  const amountInput = React.useRef<any>(null);

  const navigate = useNavigate();

  // Verifica se existe um token JWT salvo na armazenamento local da sessão e o valida
  React.useEffect(() => {
    const local = sessionStorage.getItem("login");
    if (local !== null) {
      setLoading(true);
      const login = JSON.parse(local);
      validateToken(login.token);
    }
  }, []);

  // Valida o token JWT
  async function validateToken(localToken: any) {
    await fetch(SERVER_VALIDATE_URL, {
      method: "POST",
      headers: {
        Authorization: `${localToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setValidToken(data.validToken);
        setUser(data.user);
      });
    setLoading(false);
  }

  // Obtém o username
  function handleUsername({ target }: any) {
    setUserToTransfer(target.value);
  }

  // Obtém e limpa o valor de transferência
  function handleTransferValue({ target }: any) {
    const cleanAmount = target.value
      .replace("R$ ", "")
      .replace(".", "")
      .replace(",", ".")
      .replace(/(\.\d\d)(\d+)/g, "$1");
    setAmountToTransfer(cleanAmount);
  }

  // Realiza a operação de transferência
  async function handleTransfer(e: any) {
    e.preventDefault();
    if (!userToTransfer || !amountToTransfer) return null;
    userInput.current!.value = "";
    amountInput.current!.value = "";
    if (userToTransfer === user.username) return null;
    setTransactionLoading(true);
    await axios
      .post(SERVER_TRANSFER_URL, {
        userOrigin: user.username,
        userDestiny: userToTransfer,
        amountToTransfer,
      })
      .then((response) => {
        setTransactionLoading(false);
        setTransactionStatus(response.data.transactionStatus);
      });
  }

  // Exibe uma mensagem de transação em andamento
  React.useEffect(() => {
    const loadingMessage = document.querySelector(".transaction-loading");
    if (transactionLoading) return loadingMessage?.classList.add("active");
    return loadingMessage?.classList.remove("active");
  }, [transactionLoading]);

  // Exibe uma mensagem quando a transação é bem sucedida
  React.useEffect(() => {
    const successMessage = document.querySelector(".transaction-success");
    if (!transactionStatus) {
      return successMessage?.classList.remove("active");
    }
    successMessage?.classList.add("active");
    setTimeout("", 5000);
    successMessage?.classList.remove("active");
  }, [transactionStatus]);

  // Realiza o logout do usuário
  function handleLogout() {
    sessionStorage.removeItem("login");
    navigate("/login");
  }

  if (loading) {
    return <div className="home-screen">Carregando...</div>;
  }
  if (validToken) {
    return (
      <div className="home-screen">
        <button onClick={handleLogout}>Logout</button>
        <div>
          <h1 className="primary-title">NG.CASH</h1>
        </div>
        <div className="user-data">
          <span className="user-welcome">
            Seja bem-vindo <span className="username">{user.username}</span>!
          </span>
          <span className="user-balance">
            Seu saldo atual é de:{" "}
            <span className="user-money">{user.balance}</span>.
          </span>
        </div>
        <section>
          <div className="section-container">
            <h2>Realizar transferências</h2>
            <div>
              <form>
                <label htmlFor="username-destiny">
                  Nome do usuário que receberá a transferência
                </label>
                <input
                  onChange={handleUsername}
                  type="text"
                  name="username-destiny"
                  id="username-destiny"
                  placeholder="Ex: fulanodetal"
                  ref={userInput}
                  required
                />
                <label htmlFor="transfer-value">
                  Valor que deseja transferir em reais {"(R$)"}
                </label>
                <CurrencyInput
                  onChange={handleTransferValue}
                  name="transfer-value"
                  id="transfer-value"
                  placeholder="Ex: R$ 250,50"
                  prefix="R$ "
                  decimalSeparator=","
                  decimalScale={1.5}
                  groupSeparator="."
                  ref={amountInput}
                  required
                />
                <div className="button-container">
                  <button className="active" onClick={handleTransfer}>
                    Transferir
                  </button>
                  <span className="transaction-loading">
                    Realizando transação...
                  </span>
                  <span className="transaction-success">
                    Transação realizada com sucesso!
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>
        <section>
          <div className="section-container">
            <h2>Transferências realizadas</h2>
            {/* <table>
              <thead>Ola</thead>
              <tbody>Teste</tbody>
            </table> */}
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="home-screen unauthorized-access">
      ERRO 401 - Você não tem permissão para acessar esta página.
    </div>
  );
};

export default HomeScreen;
