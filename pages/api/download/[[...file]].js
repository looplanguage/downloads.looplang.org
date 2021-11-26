import { GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { promisify } from "util";
import stream from "stream";

export default async function handler(req, res) {
  const { file } = req.query;

  const location = file.join("/");

  const s3 = new S3Client({ region: "us-east-2" });
  const pipeline = promisify(stream.pipeline);

  let command = new GetObjectCommand({
    Bucket: "loopartifacts",
    Key: location,
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });

  const response = await fetch(signedUrl);

  await pipeline(response.body, res);
}
