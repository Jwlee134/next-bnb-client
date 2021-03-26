import Hosting from "components/hosting";
import { NextPage } from "next";
import React from "react";
import Head from "next/head";

const register: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          남는 방이나 공간 전체를 숙소로 등록하고 에어비앤비 호스트가 되세요
        </title>
      </Head>
      <Hosting />
    </>
  );
};

export default register;
