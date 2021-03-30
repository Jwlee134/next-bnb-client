import { api } from ".";

interface Body {
  rating: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    satisfaction: number;
  };
  text: string;
  reservation: string;
}

export const submitReviewAPI = (body: Body) =>
  api.post("/api/review", { body });
