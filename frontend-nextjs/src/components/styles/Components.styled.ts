import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
`;

export const Form = styled.form`
  margin-bottom: 24px;
`;

export const SubTitle = styled.h2`
  margin: 32px 0px;
  font-size: 2rem;
  text-transform: uppercase;
  box-sizing: border-box;
  &::before {
    content: "";
    width: 32px;
    height: 4px;
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
