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
`;

const Name = styled.h2`
  text-transform: uppercase;
  font-size: 1.25rem;
`;

const Data = styled.p`
  font-size: 1.75rem;
`;

export default DashboardItem;
