import { fetcher, setAuthToken } from "lib/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { cache } from "swr";
import { IUser } from "types/user";

const key = "/api/auth/me";

const useUser = (redirectUrl?: string) => {
  const router = useRouter();
  const { data: user, error, mutate: mutateUser } = useSWR<IUser, Error>(
    key,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: !cache.has(key),
    }
  );

  useEffect(() => {
    if (!user) return;
    if (redirectUrl && !user.isLoggedIn) router.push("/");
    if (user.isLoggedIn) setAuthToken(user._id);
  }, [user]);

  return { user, error, mutateUser };
};

export default useUser;
