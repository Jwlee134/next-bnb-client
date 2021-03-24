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

/* MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const cookie = context.ctx.req?.headers.cookie;
  const { store } = context.ctx;
  const {
    user: { isLoggedIn },
  } = store.getState();
  if (cookie && !isLoggedIn) {
    // 쿠키에 저장되어 있는 JWT 토큰 추출
    const cookieObj = extractToken(cookie);
    if (cookieObj.access_token) {
      try {
        // axios의 요청 헤더에 토큰을 첨부
        api.defaults.headers.cookie = cookieObj.access_token;
        // 새로고침 시 리덕스 유저 데이터가 사라지므로 토큰을 이용해 유저 정보를 가져와 디스패치
        const { data } = await meAPI();
        store.dispatch(userActions.setUser(data));
      } catch (error) {
        console.log(error);
      }
    }
  }

  return { ...appProps };
}; */

export default wrapper.withRedux(MyApp);
