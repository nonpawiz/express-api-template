import express from "express";
import path from "path";
import router from "./routes";
import { notFoundHandler, errorHandler } from "./middleware/response";
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var marked = require("marked");
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(logger(":method :url :status :response-time ms"));

// Use Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});
app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
