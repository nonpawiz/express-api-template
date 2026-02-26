import UserController from "../controller/UserController";
import { router as userRoute } from "../route";
import useRes from "../service/useRes";
import { AddUserType, EditUserType } from "../service/type";
import { Request, Response, NextFunction } from "express";

const user = UserController()
// @getUser
userRoute.get(
  "/getUser",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await user.getUser(req);
      console.log("result", result);
      useRes().okHandler(res, result);
    } catch (error) {
      useRes().errorHandler(res, error, req.t(`failed`));
    }
  }
);

// @getUser
userRoute.get(
  "/findUser/:userNo",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await user.findUser(req);
      console.log("result", result);
      useRes().okHandler(res, result);
    } catch (error) {
      useRes().errorHandler(res, error, req.t(`failed`));
    }
  }
);

// @addUser
userRoute.post(
  "/addUser",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const result = await user.addUser(body as AddUserType);
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
      const { body } = req;
      const language = useRes().language(req);
      const result = await user.editUser(
        body as EditUserType,
        res,
        language
      );
      console.log("result", result);
      useRes().okHandler(res, req.t(`saveSuccess`));
    } catch (error) {
      useRes().errorHandler(res, error, req.t(`saveError`));
    }
  }
);

// @updatePictureProfile
userRoute.post(
  "/updatePictureProfile",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await user.updatePictureProfile(req);
      console.log("result", result);
      useRes().okHandler(res, req.t(`saveSuccess`));
    } catch (error) {
      useRes().errorHandler(res, error, req.t(`failed`));
    }
  }
);

// @dropUser
userRoute.post(
  "/dropUser",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req.body", req.body);
      const result = await user.dropUser(req.body);
      console.log("result", result);
      useRes().okHandler(res, req.t(`saveSuccess`));
    } catch (error) {
      useRes().errorHandler(res, error, "");
    }
  }
);

export default userRoute;
