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
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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

  function handleEmailCopy(event: React.MouseEvent<HTMLSpanElement>) {
    navigator.clipboard.writeText(event.currentTarget.innerText);
  }

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
              editable={true}
            />
            <Alert variant="outlined" severity="info">
              Utilize{" "}
              <EmailTest onClick={handleEmailCopy}>
                teste@exemplo.com{" "}
                <ContentCopyIcon style={{ fontSize: "1rem" }} />
              </EmailTest>{" "}
              caso não conheça outro para transferir.
            </Alert>
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

const EmailTest = styled.span`
  gap: 8px;
  font-style: italic;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

export default TransactionForm;
