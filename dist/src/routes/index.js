"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const users_1 = __importDefault(require("./users"));
const middleware_1 = require("../middleware");
exports.router.use("/users", middleware_1.authenticate, users_1.default);
exports.router.use("/test", (req, res) => {
    res.status(200).json("sssss");
});
exports.default = exports.router;
