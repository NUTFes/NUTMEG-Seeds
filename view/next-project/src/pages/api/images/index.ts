import { NextApiRequest, NextApiResponse } from "next";
import { formidable } from "formidable";

const Minio = require("minio");

export const config = {
  api: {
    bodyParser: false,
  },
};

const minioClient = new Minio.Client({
  endPoint: process.env.NEXT_PUBLIC_ENDPOINT,
  port: Number(process.env.NEXT_PUBLIC_PORT),
  accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  useSSL: false,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable();
    const fs = require("fs");

    form.parse(req, async (err, fields, files: any) => {
      if (err) {
        throw new Error("Error parsing form: " + err);
      }

      const bucketName = fields.bucketName;
      const fileName = fields.fileName;
      const metaData = {
        "Content-Type": "image/png",
      };

      try {
        const response = await minioClient.putObject(
          bucketName,
          fileName,
          fs.createReadStream(files.file.filepath),
          metaData
        );

        res.status(200).json({ response });
      } catch (err) {
        throw new Error("Error uploading file (" + err + ")");
      }
    });
  }
}
