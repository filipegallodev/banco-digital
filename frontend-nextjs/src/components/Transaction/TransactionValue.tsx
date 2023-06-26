import React from "react";
import * as Styled from "@/components/styles/Components.styled";

interface IProps {
  label: string;
  id: string;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  [key: string]: any;
}

const TransactionValue = ({ label, id, value, setValue, ...args }: IProps) => {
  return (
    <>
      <Styled.Label htmlFor={id}>{label}</Styled.Label>
      <Styled.CurrencyInputStyled
        id={id}
        name={id}
        placeholder="R$ 0,00"
        prefix="R$ "
        decimalsLimit={2}
        decimalScale={2}
        value={value}
        onValueChange={(newValue) => setValue(newValue)}
        {...args}
        autoFocus
      />
    </>
  );
};

export default TransactionValue;
