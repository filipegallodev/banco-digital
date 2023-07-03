import React from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  data?: string | null;
  page?: string;
  loading: boolean;
  prefix?: string;
  className: string;
}

const DashboardMainItem = ({
  name,
  data = "R$ 0",
  loading,
  prefix = "",
}: IProps) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Data>{loading ? "Carregando..." : `${prefix} ${data}`}</Data>
    </Container>
  );
};

const Container = styled.div`
  margin: 32px 0px 16px 0px;
  width: 100%;
  height: 100%;
  padding: 56px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.button.secondary.color};
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.35);
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
  font-size: 1.5rem;
`;

const Data = styled.p`
  font-size: 2.25rem;
`;

export default DashboardMainItem;
