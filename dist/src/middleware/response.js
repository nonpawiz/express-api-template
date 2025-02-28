"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorized = exports.notFoundHandler = exports.errorHandler = void 0;
const errorHandler = (err, req, res) => {
    console.error(err.stack);
    res.status(500).json({
        code: 500,
        message: "An error occurred",
        error: err.message || "Unknown error",
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        code: 404,
        message: "Route not found",
        error: `${req.originalUrl} does not exist`,
    });
};
exports.notFoundHandler = notFoundHandler;
const unauthorized = (res, message) => {
    return res.status(401).json({
        message: message || "Unauthorized: Access is denied due to invalid credentials",
    });
};
exports.unauthorized = unauthorized;
