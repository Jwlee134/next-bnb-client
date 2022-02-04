import Hosting from "components/hosting";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Amenities: NextPage = () => {
  return (
    <>
      <Head>
        <title>숙소 등록의 편의시설 단계 수정</title>
      </Head>
      <Hosting />
    </>
  );
};

export default Amenities;
