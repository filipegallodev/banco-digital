import { useAppSelector } from "@/hooks/useAppSelector";
import React from "react";

const ProfileOverview = () => {
  const user = useAppSelector((state: IReduxState) => state.user.data?.user);

  return (
    <div className="animeRight">
      <h2>Informações Gerais</h2>
      <div>
        <h3>Básico</h3>
        <p>Nome: {user?.firstName}</p>
        <p>Sobrenome: {user?.lastName}</p>
        <p>Data de nascimento: {user?.birth}</p>
        <p>E-mail: {user?.username}</p>
        <p>Telefone: {user?.phoneNumber}</p>
      </div>
      <div>
        <h3>Endereço</h3>
        <p>Cidade: {user?.city}</p>
        <p>Estado: {user?.state}</p>
      </div>
      <div>
        <h3>Financeiro</h3>
        <p>Renda: {user?.income}</p>
        <p>Emprego: {user?.job}</p>
      </div>
    </div>
  );
};

export default ProfileOverview;
