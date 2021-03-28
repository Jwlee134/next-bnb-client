import { NextPage } from "next";
import React from "react";
import dynamic from "next/dynamic";

const Reservations = dynamic(() => import("components/reservations"));

const reservations: NextPage = () => <Reservations />;

export default reservations;
