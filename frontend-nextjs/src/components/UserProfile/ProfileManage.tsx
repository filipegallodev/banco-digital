import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchUserDelete } from "@/store/reducers/user";
import { useRouter } from "next/router";
import React from "react";
import * as Styled from "../styles/Components.styled";

const ProfileManage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleUserDelete() {
    dispatch(fetchUserDelete());
    router.reload();
  }

  return (
    <div className="animeRight">
      <Styled.SubTitle>Gerenciar perfil</Styled.SubTitle>
      <Styled.Button onClick={handleUserDelete}>Excluir</Styled.Button>
    </div>
  );
};

export default ProfileManage;
