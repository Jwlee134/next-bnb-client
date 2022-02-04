import Hosting from "components/hosting";
import { NextPage } from "next";
import React from "react";
import Head from "next/head";

const Rules: NextPage = () => {
  return (
    <>
      <Head>
        <title>숙소 등록의 숙소 이용규칙 단계 수정</title>
      </Head>
      <Hosting />
    </>
  );
};

export default Rules;
