import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  data?: string;
  page?: string;
  loading: boolean;
  prefix?: string;
}

const DashboardItem = ({
  name,
  data = "R$ 0",
  page,
  loading,
  prefix = "",
}: IProps) => {
  const route = useRouter();

  function handleClick() {
    if (page) route.push(`/${page}`);
  }

  return (
    <Container onClick={handleClick} className={page ? "page-avaliable" : ""}>
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
        {loading ? "Carregando..." : `${prefix} ${data}`}
      </Data>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  &.page-avaliable {
    cursor: pointer;
    transition: 0.1s;
    box-shadow: 0px 0px 0px 2px #ff9bfd;
  }
  &.page-avaliable:hover {
    background-color: #fef;
    box-shadow: 0px 0px 0px 2px #ce3ccc;
  }
  @media (max-width: 800px) {
    height: 100%;
    padding: 48px 0px;
  }
  @media (max-width: 600px) {
    height: 100%;
    padding: 32px;
    align-items: flex-start;
    justify-content: flex-start;
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
