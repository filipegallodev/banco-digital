import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTransaction } from "@/store/reducers/transactions";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import styled from "styled-components";

const TransactionForm = () => {
  const [transactionData, setTransactionData] = useState<ITransactionFormData>({
    value: "",
    target: "",
  });
  const [transactionValue, setTransactionValue] = useState<string>();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.transactions
  );
  const [unfilledFields, setUnfilledFields] = useState(true);

  useEffect(() => {
    if (transactionData.value && transactionData.target)
      return setUnfilledFields(false);
    setUnfilledFields(true);
  }, [transactionData]);

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
      <Form onSubmit={handleTransaction}>
        <Label htmlFor="transaction-value">Quanto deseja transferir?</Label>
        <CurrencyInput
          id="transaction-value"
          name="transaction-value"
          placeholder="R$ 0,00"
          prefix="R$ "
          decimalsLimit={2}
          value={transactionValue}
          onValueChange={(value) => setTransactionValue(value)}
        />
        <Label htmlFor="transaction-target">
          Para quem você deseja transferir essa quantia?
        </Label>
        <input
          type="text"
          id="transaction-target"
          name="transaction-target"
          placeholder="email@exemplo.com"
          onChange={({ target }) =>
            setTransactionData({ ...transactionData, target: target.value })
          }
        />
        <Verify>Confirme os dados preenchidos.</Verify>
        <Submit disabled={loading || unfilledFields}>Enviar</Submit>
      </Form>
      {loading && <Loading>Realizando transferência...</Loading>}
      {data && !data.allTransactions && <Success>{data.status}</Success>}
      {error && <Error>{error}</Error>}
    </div>
  );
};

const Form = styled.form`
  & input {
    width: 100%;
    margin: 2px 0px 8px 0px;
    padding: 10px 12px;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    font-size: 1.125rem;
  }
`;

const Label = styled.label`
  font-size: 1.25rem;
  display: block;
`;

const Verify = styled.p`
  font-size: 1.25rem;
`;

const Submit = styled.button`
  background-color: #fa92ff;
  margin: 8px 0px;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.25rem;
  cursor: pointer;
  transition: 0.1s;
  &:disabled {
    background-color: #e5e5e5;
    cursor: not-allowed;
  }
  &:enabled:hover {
    background-color: #f53fff;
  }
`;

const Loading = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
`;

const Error = styled.p`
  color: #f22;
  font-size: 1.125rem;
  font-weight: 500;
`;

const Success = styled.p`
  color: #2b2;
  font-size: 1.125rem;
  font-weight: 500;
`;

export default TransactionForm;
