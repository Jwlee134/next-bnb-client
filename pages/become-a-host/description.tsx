import Hosting from "components/hosting";
import { NextPage } from "next";
import React from "react";
import Head from "next/head";

const description: NextPage = () => {
  return (
    <>
      <Head>
        <title>숙소 등록의 설명 단계 수정</title>
      </Head>
      <Hosting />
    </>
  );
};

export default description;
