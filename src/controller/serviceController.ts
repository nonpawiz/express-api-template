// import { Request } from "express";
// import prisma from "../service/db";
var formidable = require("formidable");
import path = require("path");
import useUuid from "../service/useUuid";
import fs from "fs";

const serviceController = () => {
  const formData = () => {
    const set = new formidable.IncomingForm();
    set.uploadDir = path.join(__dirname, "../public/uploads");
    set.keepExtensions = true;
    return set;
  };

  const saveFile = (file: any, pathSave: string, newFileName: string) => {
    if (!file) return;
    const newFilePath = path.join(
      `${formData().uploadDir}/${pathSave}`,
      newFileName
    );
    fs.renameSync(file.filepath, newFilePath);
  };

  const deleteFile = (path: string) => {
    fs.unlink(`${formData().uploadDir}${path}`, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });
  };

  const mimeToExtension = (mimeType: string): string => {
    const mimeMap: { [key: string]: string } = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
      "application/pdf": ".pdf",
      "text/plain": ".txt",
    };
    return mimeMap[mimeType] || "";
  };

  return { formData, saveFile, deleteFile, mimeToExtension };
};

export default serviceController;
