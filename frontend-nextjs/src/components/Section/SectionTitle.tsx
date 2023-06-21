import React from "react";
import styled from "styled-components";

const SectionTitle = ({ children }: { children: string }) => {
  return <Title>{children}</Title>;
};

const Title = styled.h1`
  margin: 52px 0px 48px 0px;
  font-size: 2.5rem;
  text-transform: uppercase;
  box-sizing: border-box;
  &::before {
    content: "";
    width: 32px;
    height: 4px;
    background-color: ${(props) => props.theme.button.color};
    position: absolute;
  }
  @media (max-width: 400px) {
    font-size: 2.25rem;
  }
`;

export default SectionTitle;
