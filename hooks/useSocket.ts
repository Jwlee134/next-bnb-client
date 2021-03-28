import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  useEffect(() => {
    if (socket) return;
    const socketIo = io(process.env.NEXT_PUBLIC_API_URL!);
    setSocket(socketIo);
  }, []);

  return socket;
};

export default useSocket;
