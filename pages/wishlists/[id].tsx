import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Header from "components/header";
import Wishlist from "components/wishlists/Wishlist";

const wishlist: NextPage = () => (
  <>
    <Head>
      <title>숙소, 체험, 장소를 모두 한 곳에서 - 에어비앤비</title>
    </Head>
    <Header useSearchBar={false} />
    <Wishlist />
  </>
);

export default wishlist;
