import Hosting from "components/hosting";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Calender: NextPage = () => {
  return (
    <>
      <Head>
        <title>숙소 등록의 예약 가능 여부 단계 수정</title>
      </Head>
      <Hosting />
    </>
  );
};

export default Calender;
