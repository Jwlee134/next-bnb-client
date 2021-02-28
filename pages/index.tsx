import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Home from "components/home";
import dbConnect from "utils/dbConnect";

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

export const getServerSideProps = async () => {
  await dbConnect();
  return { props: {} };
};

export default home;
