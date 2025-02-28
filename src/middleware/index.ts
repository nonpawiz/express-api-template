import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Promise<void> => {
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
