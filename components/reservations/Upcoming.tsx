import ReservationCard from "components/common/ReservationCard";
import { fetcher } from "lib/api";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { IReservation } from "types/reservation";
import { IUser } from "types/user";

const Container = styled.article``;

const Upcoming = ({
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
    user && user.isLoggedIn ? "/api/reservation?keyword=upcoming" : null,
    fetcher
  );

  useEffect(() => {
    if (error) {
      setError({ code: error.response.status, message: error.response.data });
    }
  }, [error]);

  return (
    <Container>
      {data &&
        data.map((reservation, i) => (
          <ReservationCard key={i} reservation={reservation} />
        ))}
      {isEmpty(data) && <div>예정된 예약이 아직 없어요.</div>}
    </Container>
  );
};

export default Upcoming;
