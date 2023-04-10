import React, { ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  data: string | number;
}

const DashboardItem = ({ name, data }: IProps) => {
  return (
    <Container>
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
