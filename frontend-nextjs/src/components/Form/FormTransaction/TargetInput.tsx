import React from "react";
import styled from "styled-components";
import * as Styled from "@/components/styles/Components.styled";

interface IProps {
  title?: string;
  label: string;
  id: string;
  formData: {
    value: string;
    target: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  [key: string]: any;
}

const TargetInput = ({
  title,
  label,
  id,
  formData,
  setFormData,
  ...args
}: IProps) => {
  return (
    <>
      {title && <Styled.SubTitle>{title}</Styled.SubTitle>}
      <Label htmlFor={id}>{label}</Label>
      <input
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

const Label = styled.label`
  display: block;
  margin: 16px 0px 8px 0px;
  font-size: 1.25rem;
`;

export default TargetInput;
