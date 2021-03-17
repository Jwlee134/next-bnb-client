import SearchResults from "components/room/search";
import { NextPage } from "next";
import React from "react";
import { searchRoomAPI } from "lib/api/room";
import { roomActions } from "store/room";
import Error from "pages/_error";
import dbConnect from "utils/dbConnect";

interface Props {
  error?: number | null;
}

const rooms: NextPage<Props> = ({ error }) => {
  if (error) return <Error statusCode={error} />;
  return <SearchResults />;
};

rooms.getInitialProps = async ({ store, query, req }) => {
  if (req) await dbConnect();
  try {
    const { data } = await searchRoomAPI({
      ...query,
    });
    store.dispatch(roomActions.setSearchResults(data));
    return { error: null };
  } catch (error) {
    return { error: error.response.status };
  }
};

export default rooms;
