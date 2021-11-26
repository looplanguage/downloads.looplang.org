import * as AWS from "@aws-sdk/client-s3";

async function getAllObjects(continuationKey, response) {
  const client = new AWS.S3({ region: "us-east-2", credentials: { accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET } });

  const result = await client.listObjectsV2({
    Bucket: "loopartifacts",
    Prefix: "Prerelease/",
  });

  result.Contents.map((object) => {
    const key = object.Key;
    const parts = key.split("_");

    const build = parts[0].replace("Prerelease/", "");
    const os = parts[1];
    const architecture = parts[2];
    const version = parts[4].split(".").slice(0, 3).join(".");
    const extension = parts[4].split(".").slice(3, 4);
    const filename = parts[3] + (extension && "." + extension);
    const released = object.LastModified;

    response.push({
      key,
      build,
      os,
      architecture,
      version,
      filename,
      released,
    });
  });

  if (result.IsTruncated) {
    return getAllObjects(result.ContinuationToken, response);
  }

  return response;
}

export default async function handler(req, res) {
  let response = await getAllObjects("", []);

  response = response.sort((a, b) => b.key.localeCompare(a.key));

  res.send(response);
}
