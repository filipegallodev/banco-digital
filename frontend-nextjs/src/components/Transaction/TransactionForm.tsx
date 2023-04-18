import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTransaction } from "@/store/reducers/transactions";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

const TransactionForm = () => {
  const [transactionData, setTransactionData] = useState({
    value: "",
    target: "",
  });
  const [transactionValue, setTransactionValue] = useState<string>();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.transactions
  );

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

  function handleTransaction(event: React.FormEvent) {
    event.preventDefault();
    if (transactionData.value && transactionData.target) {
      dispatch(fetchTransaction(transactionData));
    }
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
      {loading && <p>Realizando transferência...</p>}
      {data && data.status}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TransactionForm;
