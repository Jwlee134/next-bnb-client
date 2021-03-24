import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "models/User";
import dbConnect from "utils/dbConnect";
import { extractToken } from "utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await dbConnect();

    if (req.headers.cookie) {
      const { access_token: token } = extractToken(req.headers.cookie);
      // 첨부된 토큰을 가져와 복호화
      if (token) {
        const userId = jwt.verify(token, process.env.JWT_SECRET_KEY!);

        const user = await User.findById(userId);

        return res.status(200).send({ ...user._doc, isLoggedIn: true });
      }
    }
    return res.json({ isLoggedIn: false });
  }

  return res.status(405).end();
};
