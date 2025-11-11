import jwt from "jsonwebtoken";
import { Response } from "express";
import env from "./env";

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ id: userId }, env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });

  return res.cookie("authToken", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
