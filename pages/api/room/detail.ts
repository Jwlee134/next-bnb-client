import Room from "models/Room";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const room = await Room.findById(req.query.id);
      res.status(200).send(room);
    } catch (error) {
      res.status(404).send("존재하지 않는 숙소입니다.");
    }
  }
  res.status(405).end();
};
