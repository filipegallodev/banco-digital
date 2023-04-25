import React from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  id: string;
  type?: string;
  formData: object;
  saveFormData: React.Dispatch<React.SetStateAction<any>>;
  [key: string]: any;
}

const Input = ({
  name,
  id,
  type = "text",
  formData,
  saveFormData,
  ...args
}: IProps) => {
  return (
    <>
      <Label htmlFor={id}>{name}</Label>
      <StyledInput
        type={type}
        id={id}
        name={id}
        onChange={({ target }) =>
          saveFormData({ ...formData, [id]: target.value })
        }
        {...args}
      />
    </>
  );
};

const Label = styled.label`
  font-size: 1.25rem;
  display: block;
`;

const StyledInput = styled.input`
  width: 100%;
  margin: 2px 0px 8px 0px;
  padding: 10px 12px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.125rem;
`;

export default Input;
