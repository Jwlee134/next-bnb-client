import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";

import GlobalStyles from "styles/GlobalStyles";
import { wrapper } from "store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import { SocketContextProvider } from "context/Socket";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore();
  const persistor = persistStore(store);
  return (
    <>
      <GlobalStyles />
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SocketContextProvider>
            <Component {...pageProps} />
            <div id="portal" />
          </SocketContextProvider>
        </ThemeProvider>
      </PersistGate>
    </>
  );
};

export default wrapper.withRedux(MyApp);
