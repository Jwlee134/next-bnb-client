import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { keyword } = req.query;
    try {
      const {
        data: {
          results: [
            {
              geometry: { location },
            },
          ],
        },
      } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
          keyword as string
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&language=ko`
      );
      res.status(200).send(location);
    } catch (error) {
      res.status(400).send("유효하지 않은 주소입니다.");
    }
    res.status(200).end();
  }
  res.status(405).end();
};
