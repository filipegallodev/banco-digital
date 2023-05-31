import styled from "styled-components";
import CurrencyInput from "react-currency-input-field";
import { Slider } from "@mui/material";
import { FormControlLabel } from "@mui/material";

export const FormContainer = styled.div`
  max-width: 600px;
  width: 100%;
`;

export const Form = styled.form`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  margin: 16px 0px 8px 0px;
  font-size: 1.25rem;
`;

export const CurrencyInputStyled = styled(CurrencyInput)`
  max-width: 600px;
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

export const Input = styled.input`
  max-width: 600px;
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

export const Select = styled.select`
  max-width: 600px;
  width: 100%;
  padding: 10px 12px;
  padding-right: 32px;
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
  // Select arrow styles
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
`;

export const FormControlLabelStyled = styled(FormControlLabel)`
  display: flex;
  &.MuiFormControlLabel-root {
    margin: 16px 0px 8px 0px;
  }
  & .MuiTypography-root {
    font-family: "Rubik", sans-serif;
  }
  & .MuiCheckbox-root {
    padding-left: 0px;
  }
`;

export const SliderStyled = styled(Slider)`
  margin: 8px 0px;
`;

export const SubTitle = styled.h2`
  margin: 32px 0px;
  font-size: 2rem;
  text-transform: uppercase;
  box-sizing: border-box;
  &::before {
    content: "";
    width: 26px;
    height: 4px;
    background-color: #c500d0;
    position: absolute;
  }
`;

export const ThirdTitle = styled.h3`
  margin: 32px 0px 16px 0px;
  font-size: 1.5rem;
  text-transform: uppercase;
  box-sizing: border-box;
  &::before {
    content: "";
    width: 18px;
    height: 3px;
    background-color: #c500d0;
    position: absolute;
  }
`;

export const Text = styled.p`
  font-size: 1.25rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Button = styled.button`
  display: flex;
  background-color: #fa92ff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  font-size: 1.25rem;
  cursor: pointer;
  transition: 0.1s;
  &:disabled {
    box-shadow: none;
    background-color: #e5e5e5;
    cursor: not-allowed;
  }
  &:enabled:hover {
    box-shadow: 0px 0px 0px 3px #fa92ff;
    background-color: #f53fff;
  }
`;

export const DangerButton = styled(Button)`
  background-color: #f55;
  &:enabled:hover {
    box-shadow: 0px 0px 0px 3px #f55;
    background-color: #f22;
  }
`;
