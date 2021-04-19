import { fetcher } from "lib/api";
import moment, { Moment } from "moment";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchActions } from "store/search";
import useSWR from "swr";
import { IRoom } from "types/room";
import { makeQueryString } from "utils";

const useRoom = ({ useRedirect = false } = {}) => {
  const router = useRouter();
  const { query } = router;
  const { data: room, error } = useSWR<IRoom>(
    query.id ? `/api/room/${query.id}` : null,
    fetcher
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!query.adults || query.mobile === "true" || !useRedirect) return;
    const queryWithoutId = { ...query };
    delete queryWithoutId.id;

    dispatch(
      searchActions.setSearch({
        ...queryWithoutId,
        adults: Number(query.adults) < 1 ? 1 : Number(query.adults),
        children: Number(query.children) < 0 ? 0 : Number(query.children),
        infants: Number(query.infants) < 0 ? 0 : Number(query.infants),
      })
    );

    const redirectTo = (keyword: string, num: number) => {
      if (Number(query[keyword]) < num) {
        router.push(
          `/room/${query.id}${makeQueryString({
            ...query,
            id: "",
            [keyword]: String(num),
          })}`
        );
      }
    };

    redirectTo("adults", 1);
    redirectTo("children", 0);
    redirectTo("infants", 0);
  }, [query, useRedirect, dispatch, router]);

  const isBlocked = (day: Moment) => {
    if (!room) return;
    return room.blockedDayList.some((date) => day.isSame(date, "day"));
  };

  const maxDate = () => {
    if (room && room.availability > 1) {
      return moment(new Date()).add(room.availability, "M");
    }
    return undefined;
  };

  return { room, error, isBlocked, maxDate };
};

export default useRoom;
