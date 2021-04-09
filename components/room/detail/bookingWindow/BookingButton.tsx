import Button from "components/common/Button";
import { SocketContext } from "context/Socket";
import useRoom from "hooks/useRoom";
import useUser from "hooks/useUser";
import { makeReservationAPI } from "lib/api/reservation";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useSelector } from "store";

const BookingButton = ({
  notValidDates,
  notValidGuestCount,
  difference,
}: {
  notValidDates: boolean;
  notValidGuestCount: boolean;
  difference: () => number | undefined;
}) => {
  const search = useSelector((state) => state.search);
  const router = useRouter();
  const { user } = useUser();
  const { room } = useRoom();
  const { socket } = useContext(SocketContext);

  const handleClick = async () => {
    if (!search.checkIn) {
      document.getElementById("dateRangePicker-start")?.focus();
      return;
    }
    if (!search.checkOut) {
      document.getElementById("dateRangePicker-end")?.focus();
      return;
    }
    if (!user?.isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    if (notValidDates || notValidGuestCount || !socket || !room) {
      return;
    }
    const body = {
      roomId: room._id as string,
      guestId: user._id as string,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      guestCount: search.adults + search.children,
      price: room.price * (difference() as number),
    };
    try {
      await makeReservationAPI(body);
      socket.emit("makeReservation", {
        hostId: room.creator._id,
      });
      router.push("/reservations");
    } catch (error) {
      alert(error.response.room);
    }
  };

  return (
    <Button backgroundColor="bittersweet" onClick={handleClick}>
      {!search.checkIn || !search.checkOut ? "예약 가능 여부 보기" : ""}
      {search.checkIn && search.checkOut && "예약하기"}
    </Button>
  );
};

export default BookingButton;
