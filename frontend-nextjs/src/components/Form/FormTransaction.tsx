import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTransaction } from "@/store/reducers/transactions";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import styled from "styled-components";
import * as Styled from "@/components/styles/Components.styled";

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
        <Styled.Button disabled={loading || unfilledFields}>
          Enviar
        </Styled.Button>
      </Form>
      {loading && <Loading>Realizando transferência...</Loading>}
      {data && !data.allTransactions && <Success>{data.status}</Success>}
      {error && <Error>{error}</Error>}
    </div>
  );
};

const Form = styled.form`
  margin-bottom: 24px;
  & input {
    width: 100%;
    padding: 10px 12px;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    font-size: 1.125rem;
    transition: 0.1s;
    &:hover {
      box-shadow: 0px 0px 0px 2px #aaa;
    }
    &:focus {
      box-shadow: 0px 0px 0px 2px #222;
      outline: double;
    }
  }
`;

const Label = styled.label`
  display: block;
  margin: 16px 0px 8px 0px;
  font-size: 1.25rem;
`;

const Verify = styled.p`
  margin: 16px 0px;
  font-size: 1.25rem;
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
