import React from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  data?: string | null;
  page?: string;
  loading: boolean;
  prefix?: string;
  className: string;
  icon: React.ReactElement;
}

const DashboardMainItem = ({
  name,
  data = "R$ 0",
  loading,
  prefix = "",
  icon,
}: IProps) => {
  return (
    <Container>
      <Name>
        {icon}
        {name}
      </Name>
      <Data>{loading ? "Carregando..." : `${prefix} ${data}`}</Data>
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 0px;
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
  @media (max-width: 900px) {
    height: 100%;
    padding: 48px;
  }
  @media (max-width: 700px) {
    height: 100%;
    padding: 40px 32px;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const Name = styled.h2`
  text-transform: uppercase;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Data = styled.p`
  font-size: 2rem;
  @media (max-width: 700px) {
    font-size: 2rem;
  }
`;

export default DashboardMainItem;
