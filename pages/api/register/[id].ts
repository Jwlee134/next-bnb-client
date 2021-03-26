import Room from "models/Room";
import User from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { IRoomDetail } from "types/room";
import { IUser, IWishlist } from "types/user";
import aws from "aws-sdk";
import Wishlist from "models/Wishlist";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESSKEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESSKEY_ID,
  });

  if (req.method === "PUT") {
    const {
      query: { id },
      body: { body: room },
    } = req;
    try {
      await Room.findByIdAndUpdate(id, {
        ...room,
        updatedAt: new Date(),
      });
      return res.status(200).end();
    } catch (error) {
      return res
        .status(500)
        .send("숙소 수정에 실패하였습니다. 다시 시도해 주세요.");
    }
  }
  if (req.method === "DELETE") {
    const {
      query: { id },
      headers: { user },
    } = req;
    try {
      const data: IRoomDetail = await Room.findByIdAndDelete(id);

      const creator: IUser = await User.findById(user).populate("wishlist");
      const index = creator.rooms.findIndex((room: object) => {
        return room.toString() === id.toString();
      });
      creator.rooms.splice(index, 1);
      creator.save();

      const wishlistId = creator.wishlist.find((list: IWishlist) => {
        return list.list.includes(id);
      })._id;
      const wishlist: IWishlist = await Wishlist.findById(wishlistId);
      const wishlistIndex = wishlist.list.findIndex(
        (list: object) => list.toString() === id.toString()
      );
      wishlist.list.splice(wishlistIndex, 1);
      wishlist.save();

      await Promise.all(
        data.photos.map(async (photo) => {
          const key = photo.split("/room/")[1];
          s3.deleteObject(
            {
              Bucket: `${process.env.S3_BUCKET_NAME!}/room`,
              Key: key,
            },
            (err, data) => {
              if (err) console.log(err);
              else return data;
            }
          );
        })
      );

      return res.status(200).end();
    } catch (error) {
      return res
        .status(500)
        .send("숙소 삭제에 실패하였습니다. 다시 시도해 주세요.");
    }
  }
  return res.status(405).end();
};
