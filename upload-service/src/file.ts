import fs from "fs";
import path from "path";

export const getAllFiles = (folderPath: string) => {
    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            //recursive logic
            response = response.concat(getAllFiles(fullFilePath)) //push array of files - > response.push()
        } else {
            response.push(fullFilePath);
        }
    });
    return response;
}