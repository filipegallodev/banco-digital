import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

interface IProps {
  name: string;
  id: string;
  type?: string;
  value: string | number | undefined;
  formData: object;
  saveFormData: React.Dispatch<React.SetStateAction<any>>;
  eyeToDisplay?: boolean;
  [key: string]: any;
}

const Input = ({
  name,
  id,
  type = "text",
  value,
  formData,
  saveFormData,
  eyeToDisplay,
  ...args
}: IProps) => {
  const [formValue, setFormValue] = useState<string | number>("");
  const [displayValue, setDisplayValue] = useState<boolean>(false);

  useEffect(() => {
    if (value) return setFormValue(value);
  }, [value]);

  useEffect(() => {
    if (eyeToDisplay) setDisplayValue(true);
  }, [eyeToDisplay]);

  useEffect(() => {
    if (displayValue && typeof value === "string")
      setFormValue(value.substring(0, 3) + "*".repeat(value.length));
    if (!displayValue && typeof value !== "undefined") setFormValue(value);
  }, [displayValue]);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    saveFormData({
      ...formData,
      [id.replace(/\D+\-/g, "")]: event.currentTarget.value,
    });
    setFormValue(event.currentTarget.value);
  }

  return (
    <>
      <Label htmlFor={id}>{name}</Label>
      <InputContainer>
        <StyledInput
          type={type}
          id={id}
          name={id}
          value={formValue}
          onChange={handleChange}
          {...args}
        />
        {displayValue ? (
          <VisibilityOffRoundedIcon onClick={() => setDisplayValue(false)} />
        ) : (
          eyeToDisplay && (
            <VisibilityRoundedIcon onClick={() => setDisplayValue(true)} />
          )
        )}
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
