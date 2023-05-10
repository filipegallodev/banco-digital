import React from "react";
import styled from "styled-components";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface IProps {
  name: string;
  id: string;
  type?: string;
  formData: object;
  saveFormData: React.Dispatch<React.SetStateAction<any>>;
  eyeToDisplay?: boolean;
  [key: string]: any;
}

const Input = ({
  name,
  id,
  type = "text",
  formData,
  saveFormData,
  eyeToDisplay,
  ...args
}: IProps) => {
  return (
    <>
      <Label htmlFor={id}>{name}</Label>
      <InputContainer>
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
        {eyeToDisplay && <VisibilityOffOutlinedIcon />}
      </InputContainer>
    </>
  );
};

const Label = styled.label`
  display: block;
  font-size: 1.25rem;
`;

const InputContainer = styled.div`
  margin: 4px 0px 12px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
  & svg {
    color: #555;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
      color: #000;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.125rem;
  transition: 0.1s;
  &:enabled:not(&:focus):hover {
    box-shadow: 0px 0px 0px 2px #aaa;
  }
  &:focus {
    box-shadow: 0px 0px 0px 2px #f200ff;
    outline: none;
    border-inline: 0px;
  }
`;

export default Input;
