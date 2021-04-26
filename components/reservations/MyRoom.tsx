import ReservationCard from "components/common/ReservationCard";
import { fetcher } from "lib/api";
import React, { useEffect } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import { IReservation } from "types/reservation";
import { IUser } from "types/user";

const Container = styled.article`
  width: 100%;
`;

const MyRoom = ({
  setError,
  user,
}: {
  setError: React.Dispatch<
    React.SetStateAction<{
      code: number | null;
      message: string;
    }>
  >;
  user: IUser | undefined;
}) => {
  const { data, error } = useSWR<IReservation[]>(
    user && user.isLoggedIn ? "/api/reservation?keyword=myRoom" : null,
    fetcher
  );

  useEffect(() => {
    if (error) {
      setError({ code: error.response.status, message: error.response.data });
    }
  }, [error]);

  useEffect(() => {
    if (data && user) {
      const unreadNotifications = user.unreadNotifications.filter((notif) => {
        return !notif.label.includes("myRoom");
      });
      mutate("/api/auth/me", { ...user, unreadNotifications }, false);
    }
  }, [data, user]);

  return (
    <Container>
      {data &&
        data.map((reservation, i) => (
          <ReservationCard isMyRoom key={i} reservation={reservation} />
        ))}
    </Container>
  );
};

export default MyRoom;
