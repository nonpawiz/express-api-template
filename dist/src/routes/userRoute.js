"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controller/userController"));
const route_1 = require("../route");
const useRes_1 = __importDefault(require("../service/useRes"));
// @GET
route_1.router.get("/getUser", async (req, res, next) => {
    try {
        const users = await (0, userController_1.default)().getUser(req);
        (0, useRes_1.default)().okHandler(res, users);
    }
    catch (error) {
        (0, useRes_1.default)().errorHandler(res, error, "");
    }
});
// @POST
route_1.router.post("/addUser", async (req, res, next) => {
    try {
        const { body } = req;
        const users = await (0, userController_1.default)().addUser(body);
        (0, useRes_1.default)().okHandler(res, users);
    }
    catch (error) {
        (0, useRes_1.default)().errorHandler(res, error, "");
    }
});
// @POST
route_1.router.post("/editUser", async (req, res, next) => {
    try {
        const { body } = req;
        const users = await (0, userController_1.default)().editUser(body);
        (0, useRes_1.default)().okHandler(res, users);
    }
    catch (error) {
        (0, useRes_1.default)().errorHandler(res, error, "");
    }
});
exports.default = route_1.router;
