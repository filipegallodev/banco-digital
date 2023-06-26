import React, { useState } from "react";
import TransactionValue from "./TransactionValue";
import TransactionTarget from "./TransactionTarget";
import * as Styled from "@/components/styles/Components.styled";
import { Checkbox } from "@mui/material";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchTransaction } from "@/store/reducers/transactions";

interface IProps {
  formData: ITransactionFormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  transactionValue: string | undefined;
  setTransactionValue: React.Dispatch<React.SetStateAction<any>>;
}

const TransactionConfirmation = ({
  formData,
  setFormData,
  transactionValue,
  setTransactionValue,
}: IProps) => {
  const { loading } = useAppSelector((state) => state.transactions);
  const [confirmation, setConfirmation] = useState(false);
  const dispatch = useAppDispatch();

  function handleTransaction(event: React.FormEvent) {
    event.preventDefault();
    if (formData.value && formData.target) dispatch(fetchTransaction(formData));
  }

  return (
    <>
      <Styled.SubTitle>Confirmação</Styled.SubTitle>
      <TransactionValue
        label="Valor"
        id="transaction-value-confirm"
        value={transactionValue}
        setValue={setTransactionValue}
        disabled
      />
      <TransactionTarget
        label="Destino"
        id="transaction-target-confirm"
        placeholder="Nenhuma conta preenchida"
        formData={formData}
        value={formData.target}
        setFormData={setFormData}
        disabled
      />
      <Styled.FormControlLabelStyled
        required
        control={<Checkbox />}
        label="Confirme os dados inseridos."
        value={confirmation}
        onChange={() => setConfirmation(!confirmation)}
      />
      <Styled.ButtonContainer>
        <Styled.Button
          disabled={
            loading
              ? true
              : !(formData.value && formData.target && confirmation)
              ? true
              : false
          }
          onClick={handleTransaction}
        >
          {loading ? "Transferindo" : "Enviar"}
        </Styled.Button>
      </Styled.ButtonContainer>
    </>
  );
};

export default TransactionConfirmation;
