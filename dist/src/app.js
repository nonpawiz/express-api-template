"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const route_1 = __importDefault(require("./route"));
const useRes_1 = __importDefault(require("./service/useRes"));
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var marked = require("marked");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(logger(":method :url :status :response-time ms"));
// Use Routes
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "./public", "index.html"));
});
app.use("/api", route_1.default);
app.use((0, useRes_1.default)().notFoundHandler);
exports.default = app;
