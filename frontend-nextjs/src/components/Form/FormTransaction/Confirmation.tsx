import React, { useState } from "react";
import ValueInput from "./ValueInput";
import TargetInput from "./TargetInput";
import * as Styled from "@/components/styles/Components.styled";
import styled from "styled-components";
import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
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
  const [confirmation, setConfirmation] = useState(false);

  return (
    <>
      <Styled.SubTitle>Confirmação</Styled.SubTitle>
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
      <FormControlLabelStyled
        required
        control={<Checkbox />}
        label="Confirme os dados inseridos."
        value={confirmation}
        onChange={() => setConfirmation(!confirmation)}
      />
      <ButtonContainer>
        <Styled.Button
          disabled={
            loading
              ? true
              : !(formData.value && formData.target && confirmation)
              ? true
              : false
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

const FormControlLabelStyled = styled(FormControlLabel)`
  display: block;
  margin: 16px 0px 8px 0px;
`;

export default Confirmation;
