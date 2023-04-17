import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const ReturnButton = () => {
  const router = useRouter();

  return (
    <Container>
      <Button onClick={router.back}>{"<"}</Button>
      <p>PAINEL{router.pathname.toUpperCase().replaceAll("/", " > ")}</p>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Button = styled.button`
  padding: 4px 16px;
`;

export default ReturnButton;
