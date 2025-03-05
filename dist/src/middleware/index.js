"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = exports.authenticate = void 0;
const authController_1 = __importDefault(require("../controller/authController"));
const authenticate = async (req, res, next) => {
    const token = req.headers["authorization"] || "";
    const language = req.headers["accept-language"] || "en";
    switch (true) {
        case token === "":
            res.status(401).json({
                code: 401,
                error: "Unauthorized",
            });
            break;
        case token !== "":
            try {
                const checked = await (0, authController_1.default)().checkAuthorized(token, res);
                if (checked == undefined) {
                    res.status(401).json({
                        code: 401,
                        message: `Unauthorized`,
                    });
                }
                else {
                    next();
                }
            }
            catch (error) {
                res.status(401).json({
                    code: 401,
                    error: `${language == `th` ? `เซสชันหมดอายุ` : `The session has expired.`}`,
                });
            }
            break;
        default:
            next();
    }
};
exports.authenticate = authenticate;
const hasRole = (allowedRoles) => {
    return async (req, res, next) => {
        const token = req.headers["authorization"] || "";
        const language = req.headers["accept-language"] || "en";
        const checked = await (0, authController_1.default)().checkAuthorized(token, res);
        if (checked == undefined) {
            res.status(401).json({
                code: 401,
                message: `Unauthorized`,
            });
            debugger;
        }
        else {
            const role = checked.tokenData.role?.name;
            if (!allowedRoles.includes(role)) {
                res.status(403).json({ message: "Forbidden: Access Denied" });
            }
            next();
        }
    };
};
exports.hasRole = hasRole;
