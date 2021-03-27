import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";

import GlobalStyles from "styles/GlobalStyles";
import { wrapper } from "store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore();
  const persistor = persistStore(store);
  return (
    <>
      <GlobalStyles />
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
        <div id="modal" />
      </PersistGate>
    </>
  );
};

export default wrapper.withRedux(MyApp);
