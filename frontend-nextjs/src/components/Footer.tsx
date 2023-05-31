import React from "react";
import styled from "styled-components";
import * as Styled from "@/components/styles/Components.styled";

const Footer = () => {
  return (
    <FooterStyled>
      <Container>
        <Styled.Text>
          Desenvolvido por{" "}
          <LinkStyled href="https://github.com/filipegallodev">
            Filipe
          </LinkStyled>
          .
        </Styled.Text>
      </Container>
    </FooterStyled>
  );
};

const FooterStyled = styled.footer`
  width: 100%;
  margin-top: 64px;
  background: #e5e5e5;
  padding: 48px 24px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const Container = styled.div`
  text-align: center;
`;

const LinkStyled = styled.a`
  font-weight: 500;
  color: #d036d8;
  transition: 0.1s;
  &:hover {
    color: #fb00ff;
  }
`;

export default Footer;
