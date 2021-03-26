import User from "models/User";
import Room from "models/Room";
import Wishlist from "models/Wishlist";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser, IWishlist } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      body: { title },
      headers: { user: id },
    } = req;
    try {
      const user: IUser = await User.findById(id);
      const newWishlist: IWishlist = await Wishlist.create({
        title,
        creator: id,
      });
      user.wishlist.push(newWishlist._id);
      user.save();
      return res.status(200).send(newWishlist);
    } catch (error) {
      return res.status(500).send("다시 시도해 주세요.");
    }
  }
  if (req.method === "GET") {
    const { user } = req.headers;
    try {
      const data: IWishlist[] = await Wishlist.find({ creator: user })
        .sort("-list")
        .populate({ path: "list", model: Room });
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send("위시리스트를 불러오는 데 실패했습니다.");
    }
  }
  return res.status(405).end();
};
