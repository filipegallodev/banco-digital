import React, { useEffect } from "react";
import CurrencyInput from "react-currency-input-field";

interface IProps {
  label: string;
  id: string;
  formData: ITransactionFormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  [key: string]: any;
}

const ValueInput = ({
  label,
  id,
  formData,
  setFormData,
  value,
  setValue,
  ...args
}: IProps) => {
  useEffect(() => {
    if (!value) return;
    setFormData({
      ...formData,
      value: value.replace(",", ".").replace(/(\.$)/g, ""),
    });
  }, [value]);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <CurrencyInput
        id={id}
        name={id}
        placeholder="R$ 0,00"
        prefix="R$ "
        decimalsLimit={2}
        value={value}
        onValueChange={(value) => setValue(value)}
        {...args}
      />
    </>
  );
};

export default ValueInput;
