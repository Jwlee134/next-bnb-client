import React from "react";
import Head from "next/head";
import Home from "components/home";
import dbConnect from "utils/dbConnect";
import { wrapper } from "store";
import { GetServerSideProps } from "next";
import { commonActions } from "store/common";
import { searchActions } from "store/search";

const home = () => {
  return (
    <>
      <Head>
        <title>홈 – 에어비앤비</title>
      </Head>
      <Home />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    await dbConnect();
    store.dispatch(commonActions.setShowMiniSearchBar(false));
    store.dispatch(commonActions.setShowSearchBar(true));
    store.dispatch(searchActions.initSearch());
    return { props: {} };
  }
);

export default home;
