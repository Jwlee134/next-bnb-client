import Hosting from "components/hosting";
import { NextPage } from "next";
import React from "react";
import Head from "next/head";

const register: NextPage = () => {
  return (
    <>
      <Head>
        <title>숙소 등록 준비가 완료되었습니다!</title>
      </Head>
      <Hosting />
    </>
  );
};

export default register;
