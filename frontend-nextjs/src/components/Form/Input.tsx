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
          saveFormData({
            ...formData,
            [id.replace(/\D+\-/g, "")]: target.value,
          })
        }
        {...args}
      />
    </>
  );
};

const Label = styled.label`
  display: block;
  font-size: 1.25rem;
`;

const StyledInput = styled.input`
  margin: 4px 0px 12px 0px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.125rem;
  &:hover {
    box-shadow: 0px 0px 0px 2px #aaa;
  }
  &:focus {
    box-shadow: 0px 0px 0px 2px #222;
    outline: double;
  }
`;

export default Input;
