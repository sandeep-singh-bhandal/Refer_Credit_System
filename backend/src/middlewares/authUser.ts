import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/env";

export interface AuthRequest extends Request {
  cookies: { authToken: string };
  user?: { userId: string };
}

export const protectRoute = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authToken } = req.cookies;

    if (!authToken)
      return res.status(401).json({ success: false, message: "Please Login" });

    const decodedToken = jwt.verify(
      authToken,
      env.JWT_SECRET_KEY
    ) as JwtPayload;

    if (decodedToken.id) {
      req.user = { userId: decodedToken.id };
    } else {
      res.json({ success: false, message: "Not Authorized" });
    }
    next();
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
};
