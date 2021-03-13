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
`;

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>웹페이지를 표시할 수 없습니다.</title>
      </Head>
      <Container>
        <div>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </div>
        <Link href="/">Go back to Home</Link>
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
