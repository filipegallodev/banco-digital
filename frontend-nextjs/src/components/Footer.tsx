import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyled>
      <Container>
        <p>
          Desenvolvido por{" "}
          <LinkStyled
            href="https://github.com/filipegallodev"
            rel="external"
            target="_blank"
          >
            Filipe
          </LinkStyled>
          .
        </p>
      </Container>
    </FooterStyled>
  );
};

const FooterStyled = styled.footer`
  width: 100%;
  margin-top: 64px;
  background: ${(props) => props.theme.button.secondary.color};
  padding: 48px 24px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const Container = styled.div`
  text-align: center;
  font-size: 1.25rem;
`;

const LinkStyled = styled.a`
  font-weight: 500;
  color: ${(props) => props.theme.button.color}cc;
  transition: 0.1s;
  &:hover {
    color: ${(props) => props.theme.button.color};
  }
`;

export default Footer;
