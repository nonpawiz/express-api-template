"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const unpacked = {
    name: "Asia/Bangkok",
    abbrs: ["ICT"],
    untils: [null],
    offsets: [-420],
};
exports.default = () => {
    const now = (0, moment_1.default)(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const format = (date) => (0, moment_1.default)(date).format("YYYY-MM-DD HH:mm:ss");
    const formatUtc = (date) => (0, moment_1.default)(date).utcOffset(7).format("YYYY-MM-DD HH:mm:ss");
    return {
        now,
        format,
        formatUtc,
    };
};
