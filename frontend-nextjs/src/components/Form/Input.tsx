import React, { useEffect, useState } from "react";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import * as Styled from "@/components/styles/Components.styled";
import styled from "styled-components";

interface IProps {
  label?: string;
  id: string;
  type?: string;
  value: string | number | undefined;
  formData: object;
  saveFormData: React.Dispatch<React.SetStateAction<any>>;
  eyeToDisplay?: boolean;
  [key: string]: any;
}

const Input = ({
  label,
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
  }, [displayValue, value]);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    saveFormData({
      ...formData,
      [id.replace(/\D+\-/g, "")]: event.currentTarget.value,
    });
    setFormValue(event.currentTarget.value);
  }

  return (
    <Container>
      {label && <Styled.Label htmlFor={id}>{label}</Styled.Label>}
      <Styled.InputContainer>
        <Styled.Input
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
      </Styled.InputContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default Input;
