import fs from "fs";
import path from "path";

export const loadImgData = () => {
  const dataDir = path.join(process.cwd(), "data");
  const fileNames = fs.readdirSync(`${dataDir}/image_metadata`);

  var imgMetadata: any = {};
  fileNames.map((fileName) => {
    const filePath = path.join(`${dataDir}/image_metadata`, fileName);

    const fileContents = fs.readFileSync(filePath, "utf-8");
    const year = fileName.slice(0, 4);
    // console.log(year);
    const yearImgMetadata = JSON.parse(fileContents);
    imgMetadata[year] = yearImgMetadata;
  });

  return imgMetadata;
};
