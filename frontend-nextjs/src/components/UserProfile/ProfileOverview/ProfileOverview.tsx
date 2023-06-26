import { useAppSelector } from "@/hooks/useAppSelector";
import React from "react";
import * as Styled from "../../styles/Components.styled";
import styled from "styled-components";
import UserInfo from "./UserInfo";
import { currencyFormatter } from "@/helper/currencyFormatter";

const ProfileOverview = () => {
  const user = useAppSelector((state) => state.user.data.user);
  return (
    <Container className="animeRight">
      <Styled.SubTitle>Informações Gerais</Styled.SubTitle>
      <Styled.Text>Estas são as informações da sua conta.</Styled.Text>
      <div>
        <Styled.ThirdTitle>Básico</Styled.ThirdTitle>
        <UserInfo field="Nome" data={user?.firstName} />
        <UserInfo field="Sobrenome" data={user?.lastName} />
        <UserInfo
          field="Data de nascimento"
          data={user?.birth?.replace(/(\d{4})\-(\d{2})\-(\d{2})/g, "$3/$2/$1")}
        />
        <UserInfo
          field="Telefone"
          data={user?.phoneNumber?.replace(
            /(\d{2})(\d{2})(\d{5})(\d{4})/g,
            "($2) $3-$4"
          )}
        />
      </div>
      <div>
        <Styled.ThirdTitle>Endereço</Styled.ThirdTitle>
        <UserInfo field="Cidade" data={user?.city} />
        <UserInfo field="Estado" data={user?.state} />
      </div>
      <div>
        <Styled.ThirdTitle>Financeiro</Styled.ThirdTitle>
        <UserInfo
          field="Renda"
          data={currencyFormatter(Number(user?.income))}
        />
        <UserInfo field="Profissão" data={user?.job} />
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
