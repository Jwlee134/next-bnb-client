import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const User = dynamic(() => import("components/user"));

const user: NextPage = () => (
  <>
    <Head>
      <title>숙소, 체험, 장소를 모두 한 곳에서 - 에어비앤비</title>
    </Head>
    <User />
  </>
);

export default user;
