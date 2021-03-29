import { api } from ".";

interface IReservationForm {
  roomId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
}

export const makeReservationAPI = (body: IReservationForm) =>
  api.post("/api/reservation", { body });
