import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  clearTransactionStatus,
  fetchTransaction,
} from "@/store/reducers/transactions";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Styled from "@/components/styles/Components.styled";
import ProcessStepper from "../../ProcessStepper";
import ValueInput from "./ValueInput";
import TargetInput from "./TargetInput";
import Confirmation from "./Confirmation";

const steps = [
  "Valor da transferência",
  "Para quem deseja transferir",
  "Confirmação",
];

const inititalTransactionData = { value: "", target: "" };

const TransactionForm = () => {
  const [transactionData, setTransactionData] = useState<ITransactionFormData>(
    inititalTransactionData
  );
  const [transactionValue, setTransactionValue] = useState<string>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(
    (state: IReduxState) => state.transactions
  );

  useEffect(() => {
    if (!transactionValue) return;
    setTransactionData({
      ...transactionData,
      value: transactionValue.replace(",", ".").replace(/(\.$)/g, ""),
    });
  }, [transactionValue]);

  useEffect(() => {
    dispatch(clearTransactionStatus());
  }, [dispatch]);

  useEffect(() => {
    if (transactionData.value && transactionData.target && !error && !loading) {
      setTransactionData(inititalTransactionData);
      setTransactionValue("");
      setActiveStep(0);
    }
  }, [loading]);

  function handleTransaction(event: React.FormEvent) {
    event.preventDefault();
    if (transactionData.value && transactionData.target)
      dispatch(fetchTransaction(transactionData));
  }

  return (
    <Container>
      <ProcessStepper steps={steps} activeStep={activeStep} />
      <Form onSubmit={handleTransaction}>
        {activeStep === 0 ? (
          <ValueInput
            label="Quanto deseja transferir?"
            id="transaction-value"
            value={transactionValue}
            setValue={setTransactionValue}
          />
        ) : activeStep === 1 ? (
          <TargetInput
            label="Para quem você deseja transferir essa quantia?"
            id="transaction-target"
            formData={transactionData}
            setFormData={setTransactionData}
            placeholder="email@exemplo.com"
          />
        ) : (
          <Confirmation
            formData={transactionData}
            setFormData={setTransactionData}
            transactionValue={transactionValue}
            setTransactionValue={setTransactionValue}
          />
        )}
      </Form>
      <ButtonContainer>
        <Styled.Button
          onClick={() => setActiveStep(activeStep - 1)}
          disabled={activeStep === 0}
        >
          Voltar
        </Styled.Button>
        <Styled.Button
          onClick={() => setActiveStep(activeStep + 1)}
          disabled={activeStep >= steps.length - 1}
        >
          Próximo
        </Styled.Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 24px;
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Form = styled.form`
  max-width: 600px;
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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default TransactionForm;
