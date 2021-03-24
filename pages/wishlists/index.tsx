import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

const Wishlists = dynamic(() => import("components/wishlists"));

const wishlists: NextPage = () => <Wishlists />;

export default wishlists;
