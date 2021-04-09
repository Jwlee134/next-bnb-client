import { IReview } from "types/review";
import { api } from ".";

interface SubmitBody {
  rating: {
    label: string;
    value: number;
  }[];
  text: string;
  reservation: string;
  isToGuest: boolean;
}

interface GetReview {
  id: string;
  page: number;
  value: "guest" | "host";
}

interface GetRoomReview {
  id: string;
  page: number;
}

export const submitReviewAPI = (body: SubmitBody) =>
  api.post("/api/review", { body });

export const getReviewAPI = ({ id, page, value }: GetReview) =>
  api.get("/api/user/review", {
    params: {
      id,
      page,
      value,
    },
  });

export const getRoomReviewAPI = ({ id, page }: GetRoomReview) =>
  api.get<IReview[]>(`/api/room/${id}?page=${page}`);
