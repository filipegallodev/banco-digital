import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const ReturnButton = () => {
  const router = useRouter();
  const routesName = router.pathname.split("/").filter((path) => path !== "");

  return (
    <Container>
      <Button onClick={router.back}>{"<"}</Button>
      <RoutesPathContainer>
        <span>Painel</span>
        {routesName.map((route) => (
          <span key={route}>
            {" > "}
            {route}
          </span>
        ))}
      </RoutesPathContainer>
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
  cursor: pointer;
`;

const RoutesPathContainer = styled.div`
  cursor: default;
  text-transform: uppercase;
`;

export default ReturnButton;
