import React from "react";
import * as Styled from "@/components/styles/Components.styled";

interface IProps {
  label: string;
  id: string;
  formData: {
    value: string;
    target: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  [key: string]: any;
}

const TargetInput = ({ label, id, formData, setFormData, ...args }: IProps) => {
  return (
    <>
      <Styled.Label htmlFor={id}>{label}</Styled.Label>
      <Styled.Input
        type="text"
        id={id}
        name={id}
        value={formData.target}
        onChange={({ target }) =>
          setFormData({
            ...formData,
            target: target.value,
          })
        }
        {...args}
        autoFocus
      />
    </>
  );
};

export default TargetInput;
