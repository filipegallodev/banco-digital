import { useAppDispatch } from "@/hooks/useAppDispatch";
import React, { useEffect } from "react";
import * as Styled from "../styles/Components.styled";
import { closeModal, openModal } from "@/store/reducers/modal";
import { useAppSelector } from "@/hooks/useAppSelector";
import ModalDeleteConfirm from "./ModalDeleteConfirm";
import Modal from "@mui/material/Modal";

const ProfileManage = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state: IReduxState) => state.modal);

  useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <div className="animeRight">
      <Styled.SubTitle>Gerenciar perfil</Styled.SubTitle>
      <Styled.DangerButton onClick={() => dispatch(openModal())}>
        Excluir perfil
      </Styled.DangerButton>
      <Modal
        open={modal.open}
        onClose={() => dispatch(closeModal())}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalDeleteConfirm />
      </Modal>
    </div>
  );
};

export default ProfileManage;
