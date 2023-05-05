import React from "react";
import styled from "styled-components";
import * as Styled from "../styles/Components.styled";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { closeModal } from "@/store/reducers/modal";
import { fetchUserDelete } from "@/store/reducers/user";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";

const ModalDeleteConfirm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleUserDelete() {
    dispatch(fetchUserDelete());
    router.reload();
  }

  return (
    <ModalContainer>
      <Styled.ThirdTitle>
        Tem certeza de que deseja excluir a sua conta?
      </Styled.ThirdTitle>
      <Alert
          severity="warning"
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >Esta é uma ação irreversível.</Alert>
      <Styled.ButtonContainer>
        <Styled.DangerButton onClick={handleUserDelete}>
          Sim, tenho certeza.
        </Styled.DangerButton>
        <Styled.Button onClick={() => dispatch(closeModal())}>
          Não, me leve de volta.
        </Styled.Button>
      </Styled.ButtonContainer>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  max-width: 600px;
  padding: 24px;
  width: 100%;
  background: #f5f5f5;
  border-radius: 6px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default ModalDeleteConfirm;
