import Wishlist from "models/Wishlist";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { roomId, listId } = req.body;
    try {
      await Wishlist.findByIdAndUpdate(listId, {
        $push: { list: roomId },
      });
      return res.status(200).end();
    } catch (error) {
      return res.status(500).send("다시 시도해 주세요.");
    }
  }
  if (req.method === "DELETE") {
    try {
      return res.status(200).end();
    } catch (error) {
      return res.status(500).send("다시 시도해 주세요.");
    }
  }
  return res.status(405).end();
};
