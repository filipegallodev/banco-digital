import React from "react";
import * as Styled from "./styles/Components.styled";
import styled from "styled-components";

const PasswordRequirements = () => {
  return (
    <>
      <Styled.Text>A senha deve conter no mínimo:</Styled.Text>
      <List>
        <Item>Tamanho de 8 caracteres;</Item>
        <Item>1 letra maiúscula e minúscula {'("Abc")'};</Item>
        <Item>1 número {'("123")'};</Item>
        <Item>1 caracter especial {'("!@#")'}.</Item>
      </List>
    </>
  );
};

const List = styled.ul`
  padding-left: 16px;
  margin-bottom: 16px;
`;

const Item = styled.li`
  font-size: 1.25rem;
  margin-bottom: 8px;
`;

export default PasswordRequirements;
