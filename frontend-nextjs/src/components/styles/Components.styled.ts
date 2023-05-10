import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

export const Form = styled.form`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  font-size: 1.25rem;
`;

export const CurrencyInputContainer = styled.div`
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
  & input {
    width: 100%;
    padding: 10px 12px;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    font-size: 1.125rem;
    transition: 0.1s;
    &:enabled:hover {
      box-shadow: 0px 0px 0px 2px #aaa;
    }
    &:focus {
      box-shadow: 0px 0px 0px 2px #222;
      outline: double;
    }
  }
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
  margin: 16px 0px;
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
