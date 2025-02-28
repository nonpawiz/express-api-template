import { ErrorRequestHandler, Request, Response } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.error(err.stack);
  res.status(500).json({
    code: 500,
    message: "An error occurred",
    error: err.message || "Unknown error",
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    code: 404,
    message: "Route not found",
    error: `${req.originalUrl} does not exist`,
  });
};

export const unauthorized = (res: Response, message?: string) => {
  return res.status(401).json({
    message:
      message || "Unauthorized: Access is denied due to invalid credentials",
  });
};
