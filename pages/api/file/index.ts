import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import aws from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESSKEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESSKEY_ID,
  });

  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();
      form.multiples = true;

      // https://cheese10yun.github.io/Node-AWS-S3-Upload/
      const photoArray = await new Promise<string[]>((resolve) => {
        form.parse(req, async (err, fields, files) => {
          const urlArr = await Promise.all(
            Object.values(files).map(async (file) => {
              // 이미지 리사이즈 https://mygumi.tistory.com/349 https://sub0709.tistory.com/1
              const resized = await sharp((file as any).path)
                .resize(1200)
                .toBuffer();
              const url = await new Promise<string>((resolve, reject) => {
                s3.upload({
                  Bucket: `${process.env.S3_BUCKET_NAME!}/room`,
                  ACL: "public-read",
                  Key: `${uuidv4()}-${(file as any).name}`,
                  Body: resized,
                })
                  .promise()
                  .then((res) => resolve(res.Location))
                  .catch((e) => reject(e));
              });
              return url;
            })
          );
          resolve(urlArr);
        });
      });
      return res.status(200).send(photoArray);
    } catch (error) {
      return res.status(500).send("사진을 업로드하지 못했습니다.");
    }
  }

  if (req.method === "DELETE") {
    const { key } = req.query;
    try {
      s3.deleteObject(
        { Bucket: `${process.env.S3_BUCKET_NAME!}/room`, Key: key as string },
        (err) => {
          if (err) {
            return res.status(500).send("다시 시도해 주세요.");
          }
        }
      );
    } catch (error) {
      return res.status(500).send("다시 시도해 주세요.");
    }
    return res.status(200).end();
  }

  return res.status(405).end();
};
