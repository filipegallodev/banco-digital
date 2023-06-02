"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body > div {
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
  }
`;

export default GlobalStyle;
