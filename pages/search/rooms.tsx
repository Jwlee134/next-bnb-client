import SearchResults from "components/room/search";
import { GetServerSideProps } from "next";
import React from "react";
import { searchRoomAPI } from "lib/api/room";

const rooms = () => {
  return <SearchResults />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const {
    latitude,
    longitude,
    checkIn,
    checkOut,
    adults,
    children,
    infants,
  } = query;
  try {
    const { data } = await searchRoomAPI({
      latitude,
      longitude,
      checkIn,
      checkOut,
      adults,
      children,
      infants,
    });
    return { props: {} };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default rooms;
