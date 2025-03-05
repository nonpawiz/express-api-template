"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = () => {
    const SECRET_KEY = process.env.JWT_SECRET;
    const generateToken = (payload, expiresIn = "1h") => {
        return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn });
    };
    const verifyToken = (token) => {
        return jsonwebtoken_1.default.verify(token, SECRET_KEY);
    };
    return { generateToken, verifyToken };
};
