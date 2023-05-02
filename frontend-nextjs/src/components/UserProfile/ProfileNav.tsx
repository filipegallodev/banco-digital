import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const ProfileNav = () => {
  const router = useRouter();

  return (
    <nav>
      <ul>
        <NavItem>Informações gerais</NavItem>
        <NavItem>Editar perfil</NavItem>
        <NavItem>Trocar e-mail/senha</NavItem>
        <NavItem>Gerenciar conta</NavItem>
      </ul>
    </nav>
  );
};

const NavItem = styled.li`
  display: inline;
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
    font-weight: 500;
  }
`;

export default ProfileNav;
