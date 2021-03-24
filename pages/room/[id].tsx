import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const RoomDetail = dynamic(() => import("components/room/detail"));

const roomDetail: NextPage = () => <RoomDetail />;

export default roomDetail;
