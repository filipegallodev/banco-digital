import React, { ReactNode } from "react";
import styled from "styled-components";

const DashboardContainer = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #555;
`;

export default DashboardContainer;
