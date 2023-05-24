import React from "react";
import CurrencyInput from "react-currency-input-field";
import styled from "styled-components";

interface IProps {
  label: string;
  id: string;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  [key: string]: any;
}

const ValueInput = ({ label, id, value, setValue, ...args }: IProps) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <CurrencyInput
        id={id}
        name={id}
        placeholder="R$ 0,00"
        prefix="R$ "
        decimalsLimit={2}
        value={value}
        onValueChange={(newValue) => setValue(newValue)}
        {...args}
        autoFocus
      />
    </>
  );
};

const Label = styled.label`
  display: block;
  margin: 16px 0px 8px 0px;
  font-size: 1.25rem;
`;

export default ValueInput;
