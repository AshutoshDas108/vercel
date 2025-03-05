import { S3 } from "aws-sdk";
import fs from "fs";

// replace with your own credentials
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// fileName => output/12312/src/App.jsx
// filePath => /Users/ashutosh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
  const fileContent = fs.readFileSync(localFilePath);
  const response = await s3
    .upload({
      Body: fileContent,
      Bucket: "myvercel0159",
      Key: fileName,
    })
    .promise();
  console.log(response);
};
