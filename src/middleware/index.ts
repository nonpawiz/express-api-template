import { Request, Response, NextFunction } from "express";
import authController from "../controller/authController";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token: string = req.headers["authorization"] || "";
  const language: string = req.headers["accept-language"] || "en";

  switch (true) {
    case token === "":
      res.status(200).json({
        code: 401,
        error: "Unauthorized",
      });
      break;
    case token !== "":
      try {
        const checked = await authController().me(token, res);
        if (checked == undefined) {
          res.status(200).json({
            code: 401,
            message: `Unauthorized`,
          });
        } else {
          next();
        }
      } catch (error) {
        res.status(200).json({
          code: 401,
          error: `${
            language == `th` ? `เซสชันหมดอายุ` : `The session has expired.`
          }`,
        });
      }
      break;
    default:
      next();
  }
};

export const hasRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers["authorization"] || "";
    const language: string = req.headers["accept-language"] || "en";
    const checked = await authController().me(token, res);
    if (checked == undefined) {
      res.status(200).json({
        code: 401,
        message: `Unauthorized`,
      });
      debugger;
    } else {
      const role = checked.tokenData.role?.name;
      if (!allowedRoles.includes(role!)) {
        res.status(200).json({
          code: 403,
          message: "Permission Denied",
        });
      } else {
        next();
      }
    }
  };
};
