import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

const Management = dynamic(() => import("components/management"));

const management: NextPage = () => <Management />;

export default management;
