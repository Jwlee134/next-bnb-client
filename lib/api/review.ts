import { api } from ".";

interface Body {
  rating: {
    label: string;
    value: number;
  }[];
  text: string;
  reservation: string;
  isToGuest: boolean;
}

export const submitReviewAPI = (body: Body) =>
  api.post("/api/review", { body });
