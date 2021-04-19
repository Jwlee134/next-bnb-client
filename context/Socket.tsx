import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { mutate } from "swr";

interface InitialContext {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

const initialContext: InitialContext = {
  socket: null,
};

export const SocketContext = createContext(initialContext);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, mutateUser } = useUser();
  const { pathname } = useRouter();
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  // 커스텀 훅은 컴포넌트별로 상태가 독립적이므로 라우트 이동 시
  // 소켓이 다시 실행되는 문제 발생하므로 제외

  // Redux 규칙
  // Avoid putting non-serializable values such as Promises, Symbols, Maps/Sets
  // functions, or class instances into the Redux store state or dispatched actions.
  // 에 따라 클래스 인스턴스인 소켓은 redux 사용에서 제외

  useEffect(() => {
    if (socket) return;
    const socketIo = io(
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_URL!
        : process.env.NEXT_PUBLIC_API_URL_PROD!
    );
    setSocket(socketIo);
  }, [socket]);

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
  }, [socket, user, mutateUser, pathname]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
