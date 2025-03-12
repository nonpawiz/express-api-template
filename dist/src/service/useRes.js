"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useRes = () => {
    const language = (req) => req.headers["accept-language"] || "en";
    const okHandler = (res, data) => {
        res.status(200).json(typeof data == "string"
            ? {
                code: 200,
                message: data,
            }
            : data);
    };
    const errorHandler = (res, err, message = "") => {
        res.status(200).json({
            code: 500,
            error: err.message || "Unknown",
            message: `${message}`,
        });
    };
    const notFoundHandler = (req, res) => {
        res.status(200).json({
            code: 404,
            message: "Route not found",
            error: `${req.originalUrl} does not exist`,
        });
    };
    const unauthorized = (res, message) => {
        res.status(200).json({
            code: 401,
            message: message || "Unauthorized",
        });
    };
    return { okHandler, errorHandler, notFoundHandler, unauthorized, language };
};
exports.default = useRes;
