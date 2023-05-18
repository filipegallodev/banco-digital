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
  border-bottom: 2px solid #aaa;
  list-style: none;
  padding: 16px 24px;
  font-size: 1.25rem;
  cursor: pointer;
  &.active {
    border-bottom: 4px solid #c500d0;
    color: #c500d0;
  }
  &:hover {
    background-color: #eee;
  }
`;

export default ProfileNav;
