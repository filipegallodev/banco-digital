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
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

const NavItem = styled.li`
  border-bottom: 2px solid #aac;
  list-style: none;
  padding: 16px 24px;
  font-size: 1.25rem;
  cursor: pointer;
  &.active {
    border-bottom: 4px solid ${(props) => props.theme.button.color};
    color: ${(props) => props.theme.button.color};
    @media (max-width: 860px) {
    border-bottom: none;
    border-left: 4px solid ${(props) => props.theme.button.color};
  }
  }
  &:hover {
    background-color: ${(props) => props.theme.button.hover}15;
  }
  @media (max-width: 860px) {
    border-bottom: none;
    border-left: 2px solid #aac;
  }
`;

export default ProfileNav;
