import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styled from "styled-components";
import * as Styled from "@/components/styles/Components.styled";

interface IProps {
  formData: IUserUpdateFormData;
  saveFormData: React.Dispatch<React.SetStateAction<any>>;
}

const UserPhoneInput = ({ formData, saveFormData }: IProps) => {
  return (
    <>
      <Styled.Label htmlFor="edit-phoneNumber">Telefone celular</Styled.Label>
      <InputMaskStyled
        placeholder="+99 (99) 99999-9999"
        inputProps={{ id: "edit-phoneNumber" }}
        country="br"
        value={formData.phoneNumber}
        onChange={(phone) => saveFormData({ ...formData, phoneNumber: phone })}
        inputClass="phone-input"
        buttonClass="flag-button"
      />
    </>
  );
};

const InputMaskStyled = styled(PhoneInput)`
  & .flag-button {
    border: none;
  }
  & .phone-input {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: none;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    padding: 12px 16px 12px 64px;
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
  }
`;

export default UserPhoneInput;
