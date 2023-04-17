import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

const TransactionForm = () => {
  const [transactionValue, setTransactionValue] = useState<string>();

  useEffect(() => {
    console.log(transactionValue?.replace(",", ".").replace(/(\.$)/g, ""));
  }, [transactionValue]);

  return (
    <div>
      <h2>Preencha os campos necessários para realizar uma transação:</h2>
      <form>
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
        {transactionValue}
      </form>
    </div>
  );
};

export default TransactionForm;
