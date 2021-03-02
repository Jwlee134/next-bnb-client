import { NextApiRequest, NextApiResponse } from "next";
import User from "models/User";

import { IUser } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, avatarUrl } = req.body;

    const user: IUser = await User.findOne({ email });

    if (!user) {
      const newUser: IUser = await User.create({
        name,
        avatarUrl:
          avatarUrl || "/static/image/user/default_user_profile_image.jpg",
        email,
      });

      return res.status(200).send(newUser);
    }
    return res.status(200).send(user);
  }
  return res.status(405).end();
};
