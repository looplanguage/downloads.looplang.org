import * as AWS from "@aws-sdk/client-s3";
import { promisify } from "util";
import stream from "stream";
import fs from "fs";

export default async function handler(req, res) {
  const client = new AWS.S3({ region: "us-east-2", credentials: { accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET } });

  const { file } = req.query;

  const location = file.join("/");

  const { Body } = await client.getObject({
    Bucket: "loopartifacts",
    Key: location,
  });

  await new Promise((resolve, reject) => {
    Body.pipe(res)
      .on("error", (err) => reject(err))
      .on("close", () => resolve());
  });
}
