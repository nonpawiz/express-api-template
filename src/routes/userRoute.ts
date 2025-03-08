import userController from "../controller/userController";
import { router as userRoute } from "../route";
import useRes from "../service/useRes";
import { AddUserType, EditUserType } from "../service/type";
import { Request, Response, NextFunction } from "express";
import { form } from "../app";
import path = require("path");
import fs from "fs";
import useUuid from "../service/useUuid";

// @getUser
userRoute.get(
  "/getUser",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userController().getUser(req);
      console.log("result", result);
      useRes().okHandler(res, result);
    } catch (error) {
      useRes().errorHandler(res, error, "");
    }
  }
);

// @addUser
userRoute.post(
  "/addUser",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const result = await userController().addUser(body as AddUserType);
      console.log("result", result);
      useRes().okHandler(res, req.t(`addUserSuccess`));
    } catch (error) {
      useRes().errorHandler(res, error, req.t(`addUserError`));
    }
  }
);

// @editUser
userRoute.post(
  "/editUser",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const language: string = req.headers["accept-language"] || "en";
      const { body } = req;
      const result = await userController().editUser(body as EditUserType);
      console.log("result", result);
      useRes().okHandler(res, req.t(`saveSuccess`));
    } catch (error) {
      useRes().errorHandler(res, error, "");
    }
  }
);

// @updatePictureProfile
userRoute.post(
  "/updatePictureProfile",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userController().updatePictureProfile(req);
      console.log("result", result);
      useRes().okHandler(res, req.t(`saveSuccess`));
    } catch (error) {
      useRes().errorHandler(res, error, "");
    }
  }
);

// @dropUser
userRoute.post(
  "/dropUser",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req.body", req.body);
      const result = await userController().dropUser(req.body);
      console.log("result", result);
      useRes().okHandler(res, req.t(`saveSuccess`));
    } catch (error) {
      useRes().errorHandler(res, error, "");
    }
  }
);

export default userRoute;
