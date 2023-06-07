import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/configureStore";
import { ThemeProvider } from "styled-components";
import Theme from "@/styles/Theme";
import GlobalStyle from "@/styles/GlobalStyle";
import StyledComponentsRegistry from "@/lib/registry";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledComponentsRegistry>
    </Provider>
  );
}
