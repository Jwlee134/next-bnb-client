import React from "react";
import Head from "next/head";
import dbConnect from "utils/dbConnect";
import { wrapper } from "store";
import { GetServerSideProps } from "next";
import { commonActions } from "store/common";
import { searchActions } from "store/search";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("components/home"));

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
