import React from "react";
import Head from "next/head";
import { wrapper } from "store";
import { GetServerSideProps, NextPage } from "next";
import { commonActions } from "store/common";
import { searchActions } from "store/search";
import Header from "components/header";
import Home from "components/home";

const home: NextPage = () => {
  return (
    <>
      <Head>
        <title>홈 – 에어비앤비</title>
      </Head>
      <Header />
      <Home />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(commonActions.setShowMiniSearchBar(false));
    store.dispatch(commonActions.setShowSearchBar(true));
    store.dispatch(searchActions.initSearch());
    return { props: {} };
  }
);

export default home;
