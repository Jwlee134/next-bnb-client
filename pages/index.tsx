import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Home from "components/home";

const home: NextPage = () => {
  return (
    <>
      <Head>
        <title>홈 – 에어비앤비</title>
      </Head>
      <Home />
    </>
  );
};

export default home;
