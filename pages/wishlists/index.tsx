import Header from "components/header";
import Wishlists from "components/wishlists";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const WishlistsPage: NextPage = () => (
  <>
    <Head>
      <title>위시리스트 - 에어비앤비</title>
    </Head>
    <Header useSearchBar={false} />
    <Wishlists />
  </>
);

export default WishlistsPage;
