import Room from "models/Room";
import User from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { IRoomDetail } from "types/room";
import { IUser } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { user: id } = req.headers;
    const { sortBy, order, term } = req.query;
    const filter = { $regex: term || "", $options: "i" };

    try {
      const data: IUser = await User.findById(id).populate({
        path: "rooms",
        model: Room,
        match: {
          $or: [
            { title: filter },
            { country: filter },
            { province: filter },
            { city: filter },
          ],
        },
      });

      if (order === "asc") {
        if (sortBy === "title" || sortBy === "country") {
          data.rooms.sort();
          return res.status(200).send(data.rooms);
        }
        data.rooms.sort((a: IRoomDetail, b: IRoomDetail) => {
          return +a[sortBy as string] - +b[sortBy as string];
        });
        return res.status(200).send(data.rooms);
      }

      if (sortBy === "title" || sortBy === "country") {
        data.rooms.reverse();
        return res.status(200).send(data.rooms);
      }

      data.rooms.sort((a: IRoomDetail, b: IRoomDetail) => {
        return +b[sortBy as string] - +a[sortBy as string];
      });
      return res.status(200).send(data.rooms);
    } catch (error) {
      res.status(500).end();
    }
  }
  res.status(405).end();
};
