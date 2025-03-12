import express from "express";
import path from "path";
import router from "./route";
import useRes from "./service/useRes";
import i18next from "./service/i18n/i18n";
import middleware from "i18next-http-middleware";

var cookieParser = require("cookie-parser");
var cors = require("cors");
var logger = require("morgan");
var formidable = require("formidable");
const app = express();

export const form = new formidable.IncomingForm();
form.uploadDir = path.join(__dirname, "./public/uploads");
form.keepExtensions = true;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Language"], // Allow specific headers
  })
);
app.use(middleware.handle(i18next));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(logger(":method :url :status :response-time ms"));

// Use Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});
app.use("/api", router);
app.use(useRes().notFoundHandler);

export default app;
