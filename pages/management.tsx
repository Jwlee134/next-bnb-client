import Header from "components/header";
import Management from "components/management";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const ManagementPage: NextPage = () => (
  <>
    <Head>
      <title>숙소 관리 - 에어비앤비</title>
    </Head>
    <Header useSearchBar={false} />
    <Management />
  </>
);

export default ManagementPage;
