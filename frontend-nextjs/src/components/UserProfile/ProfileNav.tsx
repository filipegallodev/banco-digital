import React from "react";
import styled from "styled-components";

interface IProps {
  menuItem: string;
  setMenuItem: React.Dispatch<React.SetStateAction<any>>;
}

const ProfileNav = ({ menuItem, setMenuItem }: IProps) => {
  return (
    <nav>
      <NavContainer>
        <NavItem
          className={menuItem === "geral" ? "active" : ""}
          onClick={() => setMenuItem("geral")}
        >
          Informações gerais
        </NavItem>
        <NavItem
          className={menuItem === "editar" ? "active" : ""}
          onClick={() => setMenuItem("editar")}
        >
          Editar perfil
        </NavItem>
        <NavItem
          className={menuItem === "trocar" ? "active" : ""}
          onClick={() => setMenuItem("trocar")}
        >
          Trocar e-mail/senha
        </NavItem>
        <NavItem
          className={menuItem === "gerenciar" ? "active" : ""}
          onClick={() => setMenuItem("gerenciar")}
        >
          Gerenciar conta
        </NavItem>
      </NavContainer>
    </nav>
  );
};

const NavContainer = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  border-bottom: 2px solid #333;
  list-style: none;
  padding: 16px 24px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: 0.1s;
  &:hover,
  &.active {
    background-color: #ddd;
    border-bottom: 2px solid #c500d0;
  }
  &.active {
    background-color: #ccc;
  }
`;

export default ProfileNav;
