export default function handler(req, res) {
  fetch("https://build.looplang.org/job/Loop/job/loop/job/main/lastSuccessfulBuild/api/json")
    .then((resp) => resp.json())
    .then((data) => {
      let prereleases = [];

      data.artifacts.forEach((item) => {
        if (item.fileName.includes(".exe")) {
          prereleases.push({
            platform: "Windows",
            build: data.id,
            installers: [],
            version: "0.0.0",
            downloads: [
              {
                filename: item.fileName,
                url: `https://build.looplang.org/job/Loop/job/loop/job/main/lastSuccessfulBuild/artifact/${item.relativePath}`,
              },
            ],
            built: data.timestamp,
          });
        }
      });

      res.status(200).json(prereleases);
    });
}
