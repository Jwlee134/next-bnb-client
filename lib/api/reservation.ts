import { api } from ".";

interface IReservationForm {
  roomId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  price: number;
}

export const makeReservationAPI = (body: IReservationForm) =>
  api.post("/api/reservation", { body });
