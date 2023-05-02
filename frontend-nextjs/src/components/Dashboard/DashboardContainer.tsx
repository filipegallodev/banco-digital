import React, { ReactNode } from "react";
import styled from "styled-components";

const DashboardContainer = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin: 32px 0;
  gap: 16px;
`;

export default DashboardContainer;
