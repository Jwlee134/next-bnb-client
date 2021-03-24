import User from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user: IUser = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
    if (!user.password) {
      return res.status(400).send("소셜 계정으로 이미 가입된 이메일입니다.");
    }

    const correctPassword = bcrypt.compareSync(password, user.password);

    if (!correctPassword) {
      return res.status(404).send("이메일 또는 비밀번호가 일치하지 않습니다.");
    }

    const token = jwt.sign(user.id, process.env.JWT_SECRET_KEY!);

    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3
      ).toUTCString()}; httponly`
    );

    return res.status(200).send(user);
  }

  return res.status(405).end();
};
