import React from "react";
import { NextPage } from "next";
import RoomDetail from "components/room/detail";
import Head from "next/head";
import Header from "components/header";
import { commonTitle } from "lib/staticData";

const roomDetail: NextPage = () => (
  <>
    <Head>
      <title>{commonTitle}</title>
    </Head>
    <Header />
    <RoomDetail />
  </>
);

export default roomDetail;
