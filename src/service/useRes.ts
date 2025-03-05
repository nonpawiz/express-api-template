import { Request, Response } from "express";

const useRes = () => {
  const okHandler = (res: Response, data: any) => {
    res.status(200).json(
      typeof data == "string"
        ? {
            code: 200,
            message: data,
          }
        : data
    );
  };
  const errorHandler = (res: Response, err: any, message: string = "") => {
    res.status(500).json({
      code: 500,
      error: err.message || "Unknown",
      message: `${message}`,
    });
  };
  const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
      code: 404,
      message: "Route not found",
      error: `${req.originalUrl} does not exist`,
    });
  };
  const unauthorized = (res: Response, message?: string) => {
    res.status(401).json({
      code: 401,
      message: message || "Unauthorized",
    });
  };

  return { okHandler, errorHandler, notFoundHandler, unauthorized };
};

export default useRes;
