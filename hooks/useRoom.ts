import { fetcher } from "lib/api";
import { useRouter } from "next/router";
import useSWR, { cache } from "swr";
import { IRoom } from "types/room";

const useRoom = () => {
  const { query } = useRouter();
  const { data: room, error } = useSWR<IRoom>(
    query.id ? `/api/room/${query.id}` : null,
    fetcher,
    {
      revalidateOnMount: !cache.has(`/api/room/${query.id}`),
    }
  );

  return { room, error };
};

export default useRoom;
