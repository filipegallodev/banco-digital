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
  margin-bottom: 8px;
  font-size: 1.25rem;
`;

export const InputContainer = styled.div`
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
  margin-bottom: 16px;
  max-width: 600px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.15);
  font-size: 1.25rem;
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
  margin-bottom: 16px;
  max-width: 600px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.15);
  font-size: 1.25rem;
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
  padding: 12px 16px;
  padding-right: 32px;
  border: none;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.15);
  font-size: 1.25rem;
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
  font-size: 2.125rem;
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
  font-size: 1.75rem;
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
  font-size: 1.45rem;
  line-height: 1.4;
  margin-bottom: 16px;
`;

export const ErrorText = styled(Text)`
  font-size: 1rem;
  color: #f22;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DefaultButtonStyles = styled.button`
  display: flex;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1.25rem;
  color: ${(props) => props.theme.background};
  cursor: pointer;
  transition: 0.1s;
  &:disabled {
    box-shadow: 0px 0px 0px 2px #bbb;
    background: #bbb;
    cursor: not-allowed;
  }
`;

export const Button = styled(DefaultButtonStyles)`
  background: ${(props) => props.theme.button.color};
  box-shadow: 0px 0px 0px 2px ${(props) => props.theme.button.color};
  color: ${(props) => props.theme.background};
  &:enabled:not(.secondary):hover {
    background: ${(props) => props.theme.button.hover};
    box-shadow: 0px 0px 0px 2px ${(props) => props.theme.button.hover};
  }
  &.secondary {
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.5);
    background: ${(props) => props.theme.button.secondary.color};
    color: #050505;
    &:hover {
      box-shadow: 0px 0px 0px 2px
        ${(props) => props.theme.button.secondary.hover};
    }
  }
`;

export const DangerButton = styled(DefaultButtonStyles)`
  background: #f55;
  box-shadow: 0px 0px 0px 2px #f55;
  &:enabled:hover {
    background: #f22;
    box-shadow: 0px 0px 0px 3px #f55;
  }
`;
