import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

const TransactionForm = () => {
  const [transactionData, setTransactionData] = useState({
    value: "",
    target: "",
  });
  const [transactionValue, setTransactionValue] = useState<string>();

  useEffect(() => {
    if (!transactionValue) return;
    const formattedTransactionValue = transactionValue
      .replace(",", ".")
      .replace(/(\.$)/g, "");
    setTransactionData({
      ...transactionData,
      value: formattedTransactionValue,
    });
  }, [transactionValue]);

  useEffect(() => {
    console.log(transactionData);
  }, [transactionData]);

  function handleTransaction(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div>
      <h2>Preencha os campos necessários para realizar uma transação:</h2>
      <form onSubmit={handleTransaction}>
        <label htmlFor="transaction-value">Quanto deseja transferir?</label>
        <CurrencyInput
          id="transaction-value"
          name="transaction-value"
          placeholder="R$ 0,00"
          prefix="R$ "
          decimalsLimit={2}
          value={transactionValue}
          onValueChange={(value) => setTransactionValue(value)}
        />
        <label htmlFor="transaction-target">
          Para quem você deseja transferir essa quantia?
        </label>
        <input
          type="text"
          id="transaction-target"
          name="transaction-target"
          placeholder="email@exemplo.com"
          onChange={({ target }) =>
            setTransactionData({ ...transactionData, target: target.value })
          }
        />
        Confirme os dados preenchidos.
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default TransactionForm;
