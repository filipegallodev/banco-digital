import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  data?: string;
  page?: string;
  loading: boolean;
}

const DashboardItem = ({ name, data = "R$ 0", page, loading }: IProps) => {
  const route = useRouter();

  function handleClick() {
    if (page) route.push(`/${page}`);
  }

  return (
    <Container onClick={handleClick}>
      <Name>{name}</Name>
      <Data
        className={
          name === "Saída/Entrada" && !loading
            ? data.includes("-R$")
              ? "negative"
              : "positive"
            : ""
        }
      >
        {loading ? "Carregando..." : data}
      </Data>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 0px 2px #ce3ccc;
  }
`;

const Name = styled.h2`
  text-transform: uppercase;
  font-size: 1.25rem;
`;

const Data = styled.p`
  font-size: 1.75rem;
  &.negative {
    color: #f22;
  }
  &.positive {
    color: #2b2;
  }
`;

export default DashboardItem;
