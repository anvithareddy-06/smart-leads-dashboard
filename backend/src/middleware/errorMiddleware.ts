import {
  Request,
  Response,
  NextFunction,
} from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  res.status(err.status || 500).json({
    message:
      err.message || "Server Error",
  });
};

export default errorMiddleware;