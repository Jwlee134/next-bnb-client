import SearchResults from "components/room/search";
import { NextPage } from "next";
import React from "react";
import { searchRoomAPI } from "lib/api/room";
import { roomActions } from "store/room";
import Error from "pages/_error";

interface Props {
  error?: number | null;
}

const rooms: NextPage<Props> = ({ error }) => {
  if (error) return <Error statusCode={error} />;
  return <SearchResults />;
};

rooms.getInitialProps = async ({ store, query }) => {
  const {
    latitude,
    longitude,
    checkIn,
    checkOut,
    adults,
    children,
    page = "1",
    limit = "10",
    roomType = ["entire", "public", "private"],
    minPrice,
    maxPrice,
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
      roomType,
      minPrice,
      maxPrice,
    });
    store.dispatch(roomActions.setSearchResults(data));
    return { error: null };
  } catch (error) {
    return { error: error.response.status };
  }
};

export default rooms;
