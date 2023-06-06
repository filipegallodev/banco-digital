import { useAppDispatch } from "@/hooks/useAppDispatch";
import React, { useEffect } from "react";
import * as Styled from "../../styles/Components.styled";
import { closeModal, openModal } from "@/store/reducers/modal";
import DeleteProfileModal from "./DeleteProfileModal";

const ProfileManage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <div className="animeRight">
      <Styled.SubTitle>Gerenciar perfil</Styled.SubTitle>
      <Styled.Text>Aqui você pode deletar sua conta, se desejar.</Styled.Text>
      <Styled.ThirdTitle>Excluir</Styled.ThirdTitle>
      <Styled.DangerButton onClick={() => dispatch(openModal())}>
        Excluir perfil
      </Styled.DangerButton>
      <DeleteProfileModal />
    </div>
  );
};

export default ProfileManage;
