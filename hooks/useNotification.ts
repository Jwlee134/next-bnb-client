import { useEffect, useState } from "react";
import useUser from "./useUser";

const useNotification = () => {
  const { user } = useUser();
  const [reservationLength, setReservationLength] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!user || !user.isLoggedIn) return;
    const reservationLength = user.unreadNotifications.filter((notif) => {
      return notif.label.includes("reservation");
    }).length;
    if (reservationLength !== 0) {
      setReservationLength(reservationLength);
    } else {
      setReservationLength(null);
    }
  }, [user]);

  return { reservationLength };
};

export default useNotification;
