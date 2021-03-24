import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", "access_token=; path=/; expires=-1; httyonly");
    return res.status(204).json({ isLoggedIn: false });
  }

  return res.status(405).end();
};
