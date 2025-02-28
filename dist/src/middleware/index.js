"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const authenticate = (req, res, next) => {
    const token = req.headers["authorization"];
    switch (true) {
        case !token:
            res.status(401).json({
                message: "Unauthorized: No token",
            });
            break;
        case token !== "valid-token":
            res.status(401).json({
                message: "Unauthorized: Invalid token",
            });
            break;
        default:
            next();
    }
};
exports.authenticate = authenticate;
