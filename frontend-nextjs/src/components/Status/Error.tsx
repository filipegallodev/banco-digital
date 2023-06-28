import React, { useState, useEffect, useCallback } from "react";
import { Alert, AlertTitle, Fade } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { clearUserStatus } from "@/store/reducers/user";
import { useAppSelector } from "@/hooks/useAppSelector";
import { clearLoanStatus } from "@/store/reducers/loan";
import { clearCardStatus } from "@/store/reducers/card";
import { clearTransactionStatus } from "@/store/reducers/transactions";

const Error = ({ message }: { message: string | null }) => {
  const userStatus = useAppSelector((state) => state.user.data.status);
  const transactionStatus = useAppSelector(
    (state) => state.transactions.data?.status
  );
  const loanStatus = useAppSelector((state) => state.loan.data.status);
  const cardStatus = useAppSelector((state) => state.card.data.status);
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (message) setShowAlert(true);
  }, [message]);

  const handleClose = useCallback(() => {
    if (userStatus) dispatch(clearUserStatus());
    if (transactionStatus) dispatch(clearTransactionStatus());
    if (loanStatus) dispatch(clearLoanStatus());
    if (cardStatus) dispatch(clearCardStatus());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
      handleClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [showAlert, handleClose]);

  if (!message || !showAlert) return null;
  return (
    <Container>
      <Fade in={true}>
        <Alert
          severity="error"
          sx={{ boxShadow: "0px 0px 2px rgba(0,0,0,0.25)" }}
          onClose={handleClose}
          className="fadeIn alert-container"
        >
          <AlertTitle>
            <strong>Erro</strong>
          </AlertTitle>
          <TextError>{message.replace("Error: ", "")}</TextError>
        </Alert>
      </Fade>
    </Container>
  );
};

const FadeAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: initial;
    transform: initial;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 9999;
  border-radius: 4px;
  animation: ${FadeAnimation} 0.75s;
  &.alert-container {
    box-shadow: 0px 0px 0px 2px rgba(255, 120, 120, 1);
  }
`;

const TextError = styled.p`
  font-size: 1rem;
`;

export default Error;
