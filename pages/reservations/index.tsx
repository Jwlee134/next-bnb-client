import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Header from "components/header";
import Reservations from "components/reservations";

const reservations: NextPage = () => (
  <>
    <Head>
      <title>예약 목록 - 에어비앤비</title>
    </Head>
    <Header useSearchBar={false} />
    <Reservations />
  </>
);

export default reservations;
