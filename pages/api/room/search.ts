import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log(req.query);
    res.status(200).end();
  }
  res.status(405).end();
};
