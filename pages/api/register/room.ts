import Room from "models/Room";
import User from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { HostingState } from "types/room";
import { IUser } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { body, user }: { body: HostingState; user: IUser } = req.body;
      const currentUser: IUser = await User.findById(user._id);
      const newRoom: HostingState = await Room.create({
        ...body,
        creator: user._id,
      });
      currentUser.rooms.push(newRoom._id);
      currentUser.save();
      res.status(200).end();
    } catch (error) {
      res.status(500).send("등록에 실패하였습니다. 다시 시도해 주세요.");
    }
  }
  res.status(405).end();
};
