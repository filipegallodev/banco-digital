import React from "react";
import styled from "styled-components";

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  @media (max-width: 1240px) {
    margin: 0 24px;
  }
`;

export default SectionContainer;
