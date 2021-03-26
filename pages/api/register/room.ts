import Room from "models/Room";
import User from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { IRoomDetail } from "types/room";
import { IUser } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {
        body: { body },
        headers: { user },
      } = req;
      const currentUser: IUser = await User.findById(user);
      const newRoom: IRoomDetail = await Room.create({
        ...body,
        creator: user,
      });
      currentUser.rooms.push(newRoom._id);
      currentUser.save();
      return res.status(200).send(newRoom);
    } catch (error) {
      return res
        .status(500)
        .send("숙소 등록에 실패하였습니다. 다시 시도해 주세요.");
    }
  }
  return res.status(405).end();
};
