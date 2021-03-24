import { NextPage } from "next";
import React from "react";
import dynamic from "next/dynamic";

const Wishlist = dynamic(() => import("components/wishlists/Wishlist"));

const wishlist: NextPage = () => <Wishlist />;

export default wishlist;
