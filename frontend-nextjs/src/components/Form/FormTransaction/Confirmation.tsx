import React from "react";
import ValueInput from "./ValueInput";
import TargetInput from "./TargetInput";
import * as Styled from "@/components/styles/Components.styled";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "@/hooks/useAppSelector";

interface IProps {
  formData: ITransactionFormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  transactionValue: string | undefined;
  setTransactionValue: React.Dispatch<React.SetStateAction<any>>;
}

const Confirmation = ({
  formData,
  setFormData,
  transactionValue,
  setTransactionValue,
}: IProps) => {
  const { loading } = useAppSelector(
    (state: IReduxState) => state.transactions
  );

  return (
    <>
      <ValueInput
        label="Valor"
        id="transaction-value-confirm"
        value={transactionValue}
        setValue={setTransactionValue}
        disabled
      />
      <TargetInput
        label="Destino"
        id="transaction-target-confirm"
        placeholder="Nenhuma conta preenchida"
        formData={formData}
        value={formData.target}
        setFormData={setFormData}
        disabled
      />
      <Label>Confirme os dados preenchidos.</Label>
      <ButtonContainer>
        <Styled.Button
          disabled={
            loading ? true : !(formData.value && formData.target) ? true : false
          }
        >
          {loading ? "Transferindo" : "Enviar"}
        </Styled.Button>
        {loading && <CircularProgress />}
      </ButtonContainer>
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.label`
  display: block;
  margin: 16px 0px 8px 0px;
  font-size: 1.25rem;
`;

export default Confirmation;