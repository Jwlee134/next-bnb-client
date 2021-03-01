import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "models/User";
import { IUser } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { firstName, lastName, email, password, birthday } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(409).send("이미 가입된 이메일입니다.");

    const hash = bcrypt.hashSync(password, 10);
    const newUser: IUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      birthday,
      avatarUrl: "/static/image/user/default_user_profile_image.jpg",
    });

    const token = jwt.sign(newUser.id, process.env.JWT_SECRET_KEY!);

    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3
      ).toUTCString()}; httponly`
    );

    return res.status(200).send(newUser);
  }

  return res.status(405).end();
};
