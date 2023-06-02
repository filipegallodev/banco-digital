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

export const InputContainer = styled.div`
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

export const Input = styled.input`
  max-width: 600px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.125rem;
  transition: 0.1s;
  &:disabled {
    background: transparent;
  }
  &:enabled:not(&:focus):hover {
    box-shadow: 0px 0px 0px 2px #aaa;
  }
  &:focus {
    box-shadow: 0px 0px 0px 2px ${(props) => props.theme.button.color};
    outline: none;
    border-inline: 0px;
  }
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
  &:disabled {
    background: transparent;
  }
  &:enabled:not(&:focus):hover {
    box-shadow: 0px 0px 0px 2px #aaa;
  }
  &:focus {
    box-shadow: 0px 0px 0px 2px ${(props) => props.theme.button.color};
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
    box-shadow: 0px 0px 0px 2px ${(props) => props.theme.button.color};
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
    margin: 20px 0px;
  }
  & .MuiButtonBase-root {
    padding: 0px;
    padding-right: 8px;
  }
  & .MuiTypography-root {
    font-family: "Rubik", sans-serif;
  }
  & .MuiTouchRipple-root {
    border-radius: 0px;
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
    width: 24px;
    height: 4px;
    background-color: ${(props) => props.theme.button.color};
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
    width: 16px;
    height: 3px;
    background-color: ${(props) => props.theme.button.color};
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
  background-color: ${(props) => props.theme.button.color};
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  font-size: 1.25rem;
  color: ${(props) => props.theme.background};
  cursor: pointer;
  transition: 0.1s;
  &:disabled {
    box-shadow: none;
    background-color: #eee;
    cursor: not-allowed;
  }
  &:enabled:hover {
    box-shadow: 0px 0px 4px ${(props) => props.theme.button.color};
  }
`;

export const DangerButton = styled(Button)`
  background-color: #f55;
  &:enabled:hover {
    box-shadow: 0px 0px 0px 3px #f55;
    background-color: #f22;
  }
`;
