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
        <p>E-mail:</p>
        <p>Telefone:</p>
      </div>
      <div>
        <h3>Endereço</h3>
        <p>Cidade:</p>
        <p>Estado:</p>
      </div>
    </div>
  );
};

export default ProfileOverview;
