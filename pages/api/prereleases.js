import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

export default function handler(req, res) {
  const s3 = new S3Client({ region: "us-east-2" });

  s3.send(
    new ListObjectsV2Command({
      Bucket: "loopartifacts",
      Prefix: "Prerelease/",
    })
  ).then((result) => {
    console.log(result.Contents);

    res.send(200);
  });
}
