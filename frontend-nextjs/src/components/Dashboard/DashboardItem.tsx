import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  data: string | number;
  page?: string;
}

const DashboardItem = ({ name, data, page }: IProps) => {
  const route = useRouter();

  function handleClick() {
    if (page) route.push(`/${page}`);
  }

  return (
    <Container onClick={handleClick}>
      <Name>{name}</Name>
      <Data>{data}</Data>
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
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 4px #ce3ccc;
  }
`;

const Name = styled.h2`
  text-transform: uppercase;
  font-size: 1.25rem;
`;

const Data = styled.p`
  font-size: 1.75rem;
`;

export default DashboardItem;
