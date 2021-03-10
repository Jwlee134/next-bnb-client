import SearchResults from "components/room/search";
import { GetServerSideProps } from "next";
import React from "react";
import { searchRoomAPI } from "lib/api/room";

const rooms = () => {
  return <SearchResults />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { data } = await searchRoomAPI(query);
    console.log(data);
    return { props: {} };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default rooms;
