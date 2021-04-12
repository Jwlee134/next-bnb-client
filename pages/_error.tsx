import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 50px;
  font-weight: 700;
  overflow: hidden;
  text-shadow: 0px 0px 2px #000000;
  div {
    text-align: center;
    max-width: 100%;
  }
  a {
    margin-top: 30px;
    font-size: 30px;
    color: white;
    text-decoration: underline;
  }
  background-image: url("/static/image/error.jpg");
  background-position: center center;
  background-size: cover;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 40px;
  }
  @media ${({ theme }) => theme.device.tabletSmall} {
    height: 100vh;
    font-size: 30px;
  }
`;

interface Props {
  statusCode?: number;
  message?: string;
}

const Error: NextPage<Props> = ({ statusCode, message }) => {
  return (
    <>
      <Head>
        <title>웹페이지를 표시할 수 없습니다.</title>
      </Head>
      <Container>
        <div>
          {statusCode
            ? `오류 발생 : ${statusCode}`
            : "존재하지 않는 페이지입니다."}
          <div>{message}</div>
        </div>
        <Link href="/">홈으로 돌아가기</Link>
      </Container>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  let statusCode;
  if (res) {
    statusCode = res.statusCode;
  } else {
    if (err) {
      statusCode = err.statusCode;
    }
    statusCode = 404;
  }
  return { statusCode };
};

export default Error;
