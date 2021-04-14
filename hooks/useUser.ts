import { fetcher, setAuthToken } from "lib/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { cache } from "swr";
import { IUser } from "types/user";

const useUser = (redirectUrl?: string) => {
  const router = useRouter();
  const { data: user, error, mutate: mutateUser } = useSWR<IUser, Error>(
    "/api/auth/me",
    fetcher,
    {
      revalidateOnMount: !cache.has("/api/auth/me"),
    }
  );

  useEffect(() => {
    if (!user) return;
    if (redirectUrl && !user.isLoggedIn) router.push(redirectUrl);
    if (user.isLoggedIn) {
      setAuthToken(user._id);
    } else {
      setAuthToken("");
    }
  }, [user]);

  return { user, error, mutateUser };
};

export default useUser;
