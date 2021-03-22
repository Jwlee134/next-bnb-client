import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "models/User";
import dbConnect from "utils/dbConnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await dbConnect();

    const token = req.headers.cookie as string;
    // 첨부된 토큰을 가져와 복호화
    const userId = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    const user = await User.findById(userId);

    return res.status(200).send(user);
  }

  return res.status(405).end();
};
