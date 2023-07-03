import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const ReturnButton = () => {
  const router = useRouter();
  const routesName = router.pathname.split("/").filter((path) => path !== "");

  function handleRoute() {
    if (routesName.length > 0 && routesName[routesName.length - 2]) {
      return router.push(`/${routesName[routesName.length - 2]}`);
    }
    return router.push("/painel");
  }

  return (
    <Container>
      <Button onClick={handleRoute}>
        <ArrowBackRoundedIcon />
      </Button>
      <RoutesPathContainer>
        <Route onClick={() => router.push("/painel")}>Painel</Route>
        {routesName.map((route) => (
          <span key={route}>
            <RightArrow>{" > "}</RightArrow>
            <Route onClick={() => router.push(`/${route}`)}>{route.split("-").join(" e ")}</Route>
          </span>
        ))}
      </RoutesPathContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0px;
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
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: 0.1s;
  display: flex;
  &:hover {
    box-shadow: 0px 0px 4px #333;
  }
`;

const RightArrow = styled.span`
  color: ${(props) => props.theme.button.color};
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
  font-size: 1.125rem;
  &:hover {
    color: #111;
  }
`;

export default ReturnButton;
