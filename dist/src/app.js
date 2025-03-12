"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.form = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const route_1 = __importDefault(require("./route"));
const useRes_1 = __importDefault(require("./service/useRes"));
const i18n_1 = __importDefault(require("./service/i18n/i18n"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
var cookieParser = require("cookie-parser");
var cors = require("cors");
var logger = require("morgan");
var formidable = require("formidable");
const app = (0, express_1.default)();
exports.form = new formidable.IncomingForm();
exports.form.uploadDir = path_1.default.join(__dirname, "./public/uploads");
exports.form.keepExtensions = true;
// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Language"], // Allow specific headers
}));
app.use(i18next_http_middleware_1.default.handle(i18n_1.default));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.urlencoded({ extended: true }));
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
