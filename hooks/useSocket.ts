import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { mutate } from "swr";
import useUser from "./useUser";

const useSocket = () => {
  const { pathname } = useRouter();
  const { user, mutateUser } = useUser();
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  useEffect(() => {
    if (socket) return;
    const socketIo = io(process.env.NEXT_PUBLIC_API_URL!);
    setSocket(socketIo);
  }, []);

  useEffect(() => {
    if (!socket || !user) return;
    if (user.isLoggedIn) {
      socket.emit("login", { user: user._id });
    }
    socket.on("notification", () => {
      mutateUser();
      if (pathname.includes("reservation")) {
        mutate("/api/reservation?keyword=myRoom");
        mutate("/api/reservation?keyword=past");
        mutate("/api/reservation");
      }
    });
  }, [socket, user]);

  return socket;
};

export default useSocket;
