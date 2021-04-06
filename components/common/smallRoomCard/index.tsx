import Link from "next/link";
import React from "react";
import { IRoom } from "types/room";
import Contents from "./Contents";

const SmallRoomCard = ({
  room,
  useSlider = false,
  isSearchPage = false,
  isMobile = false,
  index,
  showPriceWIthoutDates = false,
}: {
  room: IRoom;
  useSlider?: boolean;
  isSearchPage?: boolean;
  isMobile?: boolean;
  index?: number;
  showPriceWIthoutDates?: boolean;
}) => {
  if (isMobile) {
    return (
      <Link href={`/room/${room._id}?adults=1&children=0&infants=0`}>
        <a>
          <Contents
            useSlider={useSlider}
            room={room}
            isSearchPage={isSearchPage}
            showPriceWIthoutDates={showPriceWIthoutDates}
          />
        </a>
      </Link>
    );
  }
  return (
    <a
      href={`/room/${room._id}?adults=1&children=0&infants=0`}
      target="_blank"
      rel="noreferrer"
    >
      <Contents
        index={index}
        useSlider={useSlider}
        room={room}
        isSearchPage={isSearchPage}
        showPriceWIthoutDates={showPriceWIthoutDates}
      />
    </a>
  );
};

export default SmallRoomCard;
