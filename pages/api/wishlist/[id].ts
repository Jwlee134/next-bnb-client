import User from "models/User";
import Wishlist from "models/Wishlist";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser, IWishlist } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const data: IWishlist = await Wishlist.findById(id).populate("list");
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("위시리스트를 불러오는 데 실패했습니다.");
    }
  }
  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      const data: IWishlist = await Wishlist.findByIdAndDelete(id);
      const user: IUser = await User.findById(data.creator);
      const index = user.wishlist.findIndex(
        (list: object) => list.toString() === data._id.toString()
      );
      user.wishlist.splice(index, 1);
      user.save();
      res.status(200).end();
    } catch (error) {
      res.status(500).send("다시 시도해 주세요.");
    }
  }
  if (req.method === "POST") {
    const {
      body: { title },
      query: { id },
    } = req;
    try {
      await Wishlist.findByIdAndUpdate(id, { title });
      res.status(200).end();
    } catch (error) {
      res.status(500).send("다시 시도해 주세요.");
    }
  }
  return res.status(405).end();
};
