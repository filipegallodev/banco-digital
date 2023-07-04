import React, { ReactNode } from "react";
import styled from "styled-components";

const DashboardContainer = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  gap: 16px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export default DashboardContainer;
