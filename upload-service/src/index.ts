require('dotenv').config()
import express from "express";
import cors from "cors";
import { generate } from "./utils";
import simpleGit from "simple-git";
import { getAllFiles } from "./file";
import path from "path";
import { uploadFile } from "./aws";
import {createClient} from "redis"

const publisher = createClient()
publisher.connect()

const app = express();
app.use(cors());
app.use(express.json());

//uploadFile('dist/output/72kmh/package.json', path.join(__dirname, 'output/72kmh/package.json'))

app.post("/upload", async (req, res) => {
  const reqUrl = req.body.url; // actual github url
  const id = generate();
  await simpleGit().clone(reqUrl, path.join(__dirname, `output/${id}`));
  const files = getAllFiles(path.join(__dirname, `output/${id}`));
  files.forEach(async (file) => {
    // removes the first (__dirname.length + 1) characters from the beginning of the string
    await uploadFile(file.slice(__dirname.length + 1), file);
  });

  publisher.lPush("build-queue", id)
  res.json({
    id: id,
  });
});
app.listen(3000, () => {
  console.log("listening on port 3000");
});
