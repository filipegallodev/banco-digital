import React, { useState, useEffect, useCallback } from "react";
import { Alert, AlertTitle, Fade } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { clearUserStatus } from "@/store/reducers/user";
import { clearRegisterStatus } from "@/store/reducers/register";

const Error = ({ message }: { message: string | null }) => {
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (message) setShowAlert(true);
  }, [message]);

  const handleClose = useCallback(() => {
    dispatch(clearUserStatus());
    dispatch(clearRegisterStatus());
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
