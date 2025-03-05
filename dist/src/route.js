"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const middleware_1 = require("./middleware");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
exports.router.use("/auth", authRoute_1.default);
exports.router.use("/user", middleware_1.authenticate, (0, middleware_1.hasRole)(["me", "Admin"]), userRoute_1.default);
exports.router.use("/test", (req, res) => {
    res.status(200).json({ msg: "xxx" });
});
exports.default = exports.router;
