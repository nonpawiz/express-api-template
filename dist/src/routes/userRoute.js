"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controller/userController"));
const route_1 = require("../route");
const useRes_1 = __importDefault(require("../service/useRes"));
// @getUser
route_1.router.get("/getUser", async (req, res, next) => {
    try {
        const result = await (0, userController_1.default)().getUser(req);
        console.log("result", result);
        (0, useRes_1.default)().okHandler(res, result);
    }
    catch (error) {
        (0, useRes_1.default)().errorHandler(res, error, "");
    }
});
// @addUser
route_1.router.post("/addUser", async (req, res, next) => {
    try {
        const { body } = req;
        const result = await (0, userController_1.default)().addUser(body);
        console.log("result", result);
        (0, useRes_1.default)().okHandler(res, req.t(`addUserSuccess`));
    }
    catch (error) {
        (0, useRes_1.default)().errorHandler(res, error, req.t(`addUserError`));
    }
});
// @editUser
route_1.router.post("/editUser", async (req, res, next) => {
    try {
        const language = req.headers["accept-language"] || "en";
        const { body } = req;
        const result = await (0, userController_1.default)().editUser(body);
        console.log("result", result);
        (0, useRes_1.default)().okHandler(res, req.t(`saveSuccess`));
    }
    catch (error) {
        (0, useRes_1.default)().errorHandler(res, error, "");
    }
});
// @updatePictureProfile
route_1.router.post("/updatePictureProfile", async (req, res, next) => {
    try {
        const result = await (0, userController_1.default)().updatePictureProfile(req);
        console.log("result", result);
        (0, useRes_1.default)().okHandler(res, req.t(`saveSuccess`));
    }
    catch (error) {
        (0, useRes_1.default)().errorHandler(res, error, "");
    }
});
// @dropUser
route_1.router.post("/dropUser", async (req, res, next) => {
    try {
        console.log("req.body", req.body);
        const result = await (0, userController_1.default)().dropUser(req.body);
        console.log("result", result);
        (0, useRes_1.default)().okHandler(res, req.t(`saveSuccess`));
    }
    catch (error) {
        (0, useRes_1.default)().errorHandler(res, error, "");
    }
});
exports.default = route_1.router;
