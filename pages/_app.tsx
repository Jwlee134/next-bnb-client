import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import App, { AppContext } from "next/app";

import GlobalStyles from "styles/GlobalStyles";
import { wrapper } from "store";
import { meAPI } from "lib/api/auth";
import { userActions } from "store/user";
import { api } from "lib/api";
import { extractToken } from "utils";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
      <div id="modal" />
    </>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
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
};

export default wrapper.withRedux(MyApp);
