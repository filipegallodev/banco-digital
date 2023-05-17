import { useAppSelector } from "@/hooks/useAppSelector";
import React from "react";
import * as Styled from "../styles/Components.styled";
import styled from "styled-components";

const ProfileOverview = () => {
  const user = useAppSelector((state: IReduxState) => state.user.data.user);

  return (
    <Container className="animeRight">
      <Styled.SubTitle>Informações Gerais</Styled.SubTitle>
      <div>
        <Styled.ThirdTitle>Básico</Styled.ThirdTitle>
        <p>
          <strong>Nome:</strong> {user?.firstName}
        </p>
        <p>
          <strong>Sobrenome:</strong> {user?.lastName}
        </p>
        <p>
          <strong>Data de nascimento:</strong>{" "}
          {user?.birth?.replace(/(\d{4})\-(\d{2})\-(\d{2})/g, "$3/$2/$1")}
        </p>
        <p>
          <strong>Telefone:</strong> {user?.phoneNumber}
        </p>
      </div>
      <div>
        <Styled.ThirdTitle>Endereço</Styled.ThirdTitle>
        <p>
          <strong>Cidade:</strong> {user?.city}
        </p>
        <p>
          <strong>Estado:</strong> {user?.state}
        </p>
      </div>
      <div>
        <Styled.ThirdTitle>Financeiro</Styled.ThirdTitle>
        <p>
          <strong>Renda:</strong>{" "}
          {Number(user?.income).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p>
          <strong>Profissão:</strong> {user?.job}
        </p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  font-size: 1.25rem;
  margin-bottom: 24px;
  & p {
    margin: 6px 0px;
  }
`;

export default ProfileOverview;
