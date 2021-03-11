import SearchResults from "components/room/search";
import { GetServerSideProps } from "next";
import React from "react";
import { searchRoomAPI } from "lib/api/room";
import { IRoomDetail } from "types/room";

const rooms = ({ data }: { data: IRoomDetail[] }) => (
  <SearchResults data={data} />
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const {
    latitude,
    longitude,
    checkIn,
    checkOut,
    adults,
    children,
    page = "1",
    limit = "5",
  } = query;
  try {
    const { data } = await searchRoomAPI({
      latitude,
      longitude,
      checkIn,
      checkOut,
      adults,
      children,
      page,
      limit,
    });
    return { props: { data } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default rooms;
