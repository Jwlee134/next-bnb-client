import React from "react";
import RoomDetail from "components/room/detail";
import { NextPage } from "next";
import { deleteIdFromQuery } from "utils";
import { searchActions } from "store/search";

const roomDetail: NextPage = () => <RoomDetail />;

roomDetail.getInitialProps = ({ store, query }) => {
  const filteredQuery = deleteIdFromQuery(query);
  store.dispatch(
    searchActions.setSearch({
      ...filteredQuery,
      adults:
        Number(filteredQuery.adults) < 1 ? 1 : Number(filteredQuery.adults),
      children:
        Number(filteredQuery.children) < 0 ? 0 : Number(filteredQuery.children),
      infants:
        Number(filteredQuery.infants) < 0 ? 0 : Number(filteredQuery.infants),
    })
  );
  return {};
};

export default roomDetail;
