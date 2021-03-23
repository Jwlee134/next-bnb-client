import Room from "models/Room";
import User from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const data: IUser = await User.findById(id).populate({
        path: "rooms",
        model: Room,
      });
      res.status(200).send(data.rooms);
    } catch (error) {
      res.status(500).end();
    }
  }
  res.status(405).end();
};
