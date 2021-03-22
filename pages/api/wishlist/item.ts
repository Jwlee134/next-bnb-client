import Wishlist from "models/Wishlist";
import { NextApiRequest, NextApiResponse } from "next";
import { IWishlist } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { roomId, listId } = req.body;
    try {
      const wishlist: IWishlist = await Wishlist.findById(listId);
      wishlist.list.push(roomId);
      wishlist.save();
      return res.status(200).end();
    } catch (error) {
      return res.status(500).send("다시 시도해 주세요.");
    }
  }
  if (req.method === "DELETE") {
    const { roomId, listId } = req.query;
    try {
      const wishlist: IWishlist = await Wishlist.findById(listId);
      const index = wishlist.list.findIndex(
        (item: object) => item.toString() === roomId
      );
      wishlist.list.splice(index, 1);
      wishlist.save();
      return res.status(200).end();
    } catch (error) {
      return res.status(500).send("다시 시도해 주세요.");
    }
  }
  return res.status(405).end();
};
