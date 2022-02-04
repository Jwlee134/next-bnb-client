import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Header from "components/header";
import Wishlist from "components/wishlists/Wishlist";
import { commonTitle } from "lib/staticData";

const WishlistPage: NextPage = () => (
  <>
    <Head>
      <title>{commonTitle}</title>
    </Head>
    <Header useSearchBar={false} />
    <Wishlist />
  </>
);

export default WishlistPage;
