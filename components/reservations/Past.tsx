import ReservationCard from "components/common/ReservationCard";
import { api } from "lib/api";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import { IReservation } from "types/reservation";
import { IUser } from "types/user";

const Container = styled.div``;

const fetcher = (url: string) => api.get(url).then((res) => res.data);

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
    if (data) {
      mutate("/api/auth/me");
    }
  }, [data]);

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
