import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: any;
}

const roleMiddleware = (roles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
};

export default roleMiddleware;