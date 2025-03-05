"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../route");
const authController_1 = __importDefault(require("../controller/authController"));
const useRes_1 = __importDefault(require("../service/useRes"));
// login
route_1.router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const language = req.headers["accept-language"] || "en";
        const data = await (0, authController_1.default)().login({
            username,
            password,
            language,
        });
        (0, useRes_1.default)().okHandler(res, data);
    }
    catch (error) {
        (0, useRes_1.default)().errorHandler(res, error, "");
    }
});
// checkAuthorized
route_1.router.post("/checkAuthorized", async (req, res, next) => {
    try {
        const token = req.headers["authorization"] || "";
        const checked = await (0, authController_1.default)().checkAuthorized(token, res);
        res.status(checked == undefined ? 401 : 200).json(checked == undefined
            ? {
                code: 401,
                message: `Unauthorized`,
            }
            : {
                code: 200,
                message: `Authorized`,
                info: checked,
            });
    }
    catch (error) {
        (0, useRes_1.default)().errorHandler(res, error, "");
    }
});
exports.default = route_1.router;
