import Hosting from "components/hosting";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Spaces: NextPage = () => {
  return (
    <>
      <Head>
        <title>숙소 등록의 기타 사용 가능 공간 단계 수정</title>
      </Head>
      <Hosting />
    </>
  );
};

export default Spaces;
