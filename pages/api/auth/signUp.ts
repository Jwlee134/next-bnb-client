import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { firstName, lastName, email, password, birthday } = req.body;

    const hash = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      birthday,
      avatarUrl: "/static/image/user/default_user_profile_image.jpg",
    });

    /* const token = jwt.sign(newUser., process.env.JWT_SECRET_KEY!);

    res.setHeader(
      "Set-Cookie",
      `access-token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3
      ).toUTCString()}; httponly`
    ); */

    res.status(200).send(newUser);
  }

  res.status(405).end();
};
