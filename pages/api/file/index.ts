import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import aws from "aws-sdk";
import fs from "fs";

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
          // 사진을 업로드 시간에 상관없이 고른 순서대로 배열에 담기 위한 로직
          const urlArr = await Promise.all(
            Object.values(files).map(async (file) => {
              const url = await new Promise<string>((resolve, reject) => {
                s3.upload({
                  Bucket: process.env.S3_BUCKET_NAME!,
                  ACL: "public-read",
                  Key: file.name,
                  Body: fs.createReadStream(file.path),
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
      res.status(200).send(photoArray);
    } catch (error) {
      res.status(500).send("사진을 업로드하지 못했습니다.");
    }
  }

  if (req.method === "DELETE") {
    const { key } = req.query;
    try {
      s3.deleteObject(
        { Bucket: process.env.S3_BUCKET_NAME!, Key: key as string },
        (err) => {
          if (err) {
            res.status(500).send("다시 시도해 주세요.");
          }
        }
      );
    } catch (error) {
      res.status(500).send("다시 시도해 주세요.");
    }
    res.status(200).end();
  }

  res.status(405).end();
};
