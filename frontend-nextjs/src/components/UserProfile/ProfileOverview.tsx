import { useAppSelector } from "@/hooks/useAppSelector";
import React from "react";
import * as Styled from "../styles/Components.styled";

const ProfileOverview = () => {
  const user = useAppSelector((state: IReduxState) => state.user.data?.user);

  return (
    <div className="animeRight">
      <Styled.SubTitle>Informações Gerais</Styled.SubTitle>
      <div>
        <Styled.ThirdTitle>Básico</Styled.ThirdTitle>
        <p>Nome: {user?.firstName}</p>
        <p>Sobrenome: {user?.lastName}</p>
        <p>Data de nascimento: {user?.birth}</p>
        <p>E-mail: {user?.username}</p>
        <p>Telefone: {user?.phoneNumber}</p>
      </div>
      <div>
        <Styled.ThirdTitle>Endereço</Styled.ThirdTitle>
        <p>Cidade: {user?.city}</p>
        <p>Estado: {user?.state}</p>
      </div>
      <div>
        <Styled.ThirdTitle>Financeiro</Styled.ThirdTitle>
        <p>Renda: {user?.income}</p>
        <p>Emprego: {user?.job}</p>
      </div>
    </div>
  );
};

export default ProfileOverview;
