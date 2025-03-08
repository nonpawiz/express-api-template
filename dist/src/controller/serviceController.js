"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Request } from "express";
// import prisma from "../service/db";
var formidable = require("formidable");
const path = require("path");
const fs_1 = __importDefault(require("fs"));
const serviceController = () => {
    const formData = () => {
        const set = new formidable.IncomingForm();
        set.uploadDir = path.join(__dirname, "../public/uploads");
        set.keepExtensions = true;
        return set;
    };
    const saveFile = (file, pathSave, newFileName) => {
        if (!file)
            return;
        const newFilePath = path.join(`${formData().uploadDir}/${pathSave}`, newFileName);
        fs_1.default.renameSync(file.filepath, newFilePath);
    };
    const deleteFile = (path) => {
        fs_1.default.unlink(`${formData().uploadDir}${path}`, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
            else {
                console.log("File deleted successfully!");
            }
        });
    };
    const mimeToExtension = (mimeType) => {
        const mimeMap = {
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
exports.default = serviceController;
