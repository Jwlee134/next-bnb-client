import { api } from "lib/api";
import { useRouter } from "next/router";
import useSWR from "swr";
import { IRoom } from "types/room";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const useRoom = () => {
  const { query } = useRouter();
  const { data: room, error } = useSWR<IRoom>(
    query.id ? `/api/room/${query.id}` : null,
    fetcher
  );

  return { room, error };
};

export default useRoom;
