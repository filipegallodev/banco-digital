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
            <RightArrow>{" > "}</RightArrow>
            <span>{route}</span>
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
  color: #555;
`;

const Button = styled.button`
  padding: 8px 36px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  background-color: #555;
  color: #fff;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #222;
  }
`;

const RightArrow = styled.span`
  color: #c500d0;
  font-weight: 500;
`;

const RoutesPathContainer = styled.div`
  cursor: default;
  text-transform: uppercase;
`;

export default ReturnButton;
