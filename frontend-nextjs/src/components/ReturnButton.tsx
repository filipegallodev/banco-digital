import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const ReturnButton = () => {
  const router = useRouter();
  const routesName = router.pathname.split("/").filter((path) => path !== "");

  return (
    <Container>
      <Button onClick={router.back}>
        <ArrowBackRoundedIcon />
      </Button>
      <RoutesPathContainer>
        <Route onClick={() => router.push("/painel")}>Painel</Route>
        {routesName.map((route) => (
          <span key={route}>
            <RightArrow>{" > "}</RightArrow>
            <Route onClick={() => router.push(`/${route}`)}>{route}</Route>
          </span>
        ))}
      </RoutesPathContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Button = styled.button`
  padding: 6px 36px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  background-color: #555;
  color: #fff;
  cursor: pointer;
  transition: 0.1s;
  display: flex;
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
  color: #777;
  font-weight: 500;
  font-style: italic;
  text-transform: uppercase;
`;

const Route = styled.span`
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    color: #111;
  }
`;

export default ReturnButton;
