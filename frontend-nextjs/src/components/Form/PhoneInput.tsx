import React from "react";
import InputMask from "react-input-mask";
import styled from "styled-components";

interface IProps {
  formData: IUserUpdateFormData;
  saveFormData: React.Dispatch<React.SetStateAction<any>>;
}

const PhoneInput = ({ formData, saveFormData }: IProps) => {
  return (
    <>
      <Label htmlFor="edit-phoneNumber">Telefone celular</Label>
      <InputMaskStyled
        mask="(99) 99999-9999"
        placeholder="(99) 99999-9999"
        id="edit-phoneNumber"
        value={formData.phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          saveFormData({ ...formData, phoneNumber: e.target.value })
        }
      />
    </>
  );
};

const Label = styled.label`
  display: block;
  margin: 16px 0px 8px 0px;
  font-size: 1.25rem;
`;

const InputMaskStyled = styled(InputMask)`
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

export default PhoneInput;
