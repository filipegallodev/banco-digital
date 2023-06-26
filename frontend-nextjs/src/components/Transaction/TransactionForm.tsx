import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { clearTransactionStatus } from "@/store/reducers/transactions";
import React, { useEffect, useState } from "react";
import * as Styled from "@/components/styles/Components.styled";
import TransactionStepper from "./TransactionStepper";
import TransactionValue from "./TransactionValue";
import TransactionTarget from "./TransactionTarget";
import TransactionConfirmation from "./TransactionConfirmation";
import { useRouter } from "next/router";
import styled from "styled-components";
import { currencyFormatter } from "@/helper/currencyFormatter";

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
  const { loading, data, error } = useAppSelector(
    (state) => state.transactions
  );
  const router = useRouter();

  useEffect(() => {
    setTransactionData({
      ...transactionData,
      value: transactionValue
        ? transactionValue.replace(",", ".").replace(/(\.$)/g, "")
        : "",
    });
  }, [transactionValue]);

  useEffect(() => {
    dispatch(clearTransactionStatus());
  }, [dispatch]);

  useEffect(() => {
    if (transactionData.value && transactionData.target && !error && !loading) {
      router.push("/transferencias");
    }
  }, [loading]);

  return (
    <>
      <TransactionStepper
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        transactionData={transactionData}
      />
      <>
        {activeStep === 0 ? (
          <>
            <Styled.SubTitle>Valor</Styled.SubTitle>
            <TransactionValue
              label="Quanto deseja transferir?"
              id="transaction-value"
              value={transactionValue}
              setValue={setTransactionValue}
            />
          </>
        ) : activeStep === 1 ? (
          <>
            <Styled.SubTitle>Destino</Styled.SubTitle>
            <TransactionTarget
              label={`Para quem você deseja transferir ${currencyFormatter(
                Number(transactionData.value)
              )}?`}
              id="transaction-target"
              formData={transactionData}
              setFormData={setTransactionData}
              placeholder="email@exemplo.com"
            />
            <EmailTest>
              Utilize <span>teste@exemplo.com</span> para testar a
              funcionalidade de transferência.
            </EmailTest>
          </>
        ) : (
          <TransactionConfirmation
            formData={transactionData}
            setFormData={setTransactionData}
            transactionValue={transactionValue}
            setTransactionValue={setTransactionValue}
          />
        )}
      </>
      <Styled.ButtonContainer style={{ marginTop: "24px" }}>
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
      </Styled.ButtonContainer>
    </>
  );
};

const EmailTest = styled.p`
  & span {
    font-style: italic;
    font-weight: 500;
  }
`;

export default TransactionForm;
