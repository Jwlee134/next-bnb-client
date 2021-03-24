import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { IUser } from "types/user";

const useUser = (redirectUrl?: string) => {
  const router = useRouter();
  const { data: user, error, mutate: mutateUser } = useSWR<IUser, Error>(
    "/api/auth/me"
  );

  useEffect(() => {
    if (!redirectUrl || !user) return;
    if (!user.isLoggedIn) router.push("/");
  }, [user]);

  return { user, error, mutateUser };
};

export default useUser;
