import React from "react";
import { IRoom } from "types/room";
import { SearchState } from "store/search";
import { tabletSmallBreakpoint } from "styles/theme";
import { makeQueryString } from "utils";
import { NextRouter } from "next/router";
import RoomInfo from "./RoomInfo";

const InfoWindow = ({
  room,
  search,
  innerWidth,
  router,
}: {
  room: IRoom;
  search: SearchState;
  innerWidth: number;
  router: NextRouter;
}) => {
  if (innerWidth >= tabletSmallBreakpoint) {
    return (
      <a
        href={`/room/${room._id}${makeQueryString(search)}`}
        target="_blank"
        rel="noreferrer"
      >
        <RoomInfo room={room} search={search} />
      </a>
    );
  }
  return (
    <div
      onClick={() => router.push(`/room/${room._id}${makeQueryString(search)}`)}
    >
      <RoomInfo room={room} search={search} />
    </div>
  );
};

export default InfoWindow;
