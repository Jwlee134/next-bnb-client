import Header from "components/header";
import User from "components/user";
import { commonTitle } from "lib/staticData";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const UserPage: NextPage = () => (
  <>
    <Head>
      <title>{commonTitle}</title>
    </Head>
    <Header useSearchBar={false} />
    <User />
  </>
);

export default UserPage;
