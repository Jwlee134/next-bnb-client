import ReservationCard from "components/common/ReservationCard";
import { fetcher } from "lib/api";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import { IReservation } from "types/reservation";
import { IUser } from "types/user";

const Container = styled.article``;

const Past = ({
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
    user && user.isLoggedIn ? "/api/reservation?keyword=past" : null,
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
        return !notif.label.includes("past");
      });
      mutate("/api/auth/me", { ...user, unreadNotifications }, false);
    }
  }, [data, user]);

  return (
    <Container>
      {data &&
        data.map((reservation, i) => (
          <ReservationCard isPast key={i} reservation={reservation} />
        ))}
      {isEmpty(data) && <div>이전 예약이 아직 없어요.</div>}
    </Container>
  );
};

export default Past;
