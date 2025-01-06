import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.headers);
    const token = req.header("Authorization")?.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.SUPABASE_JWT_SECRET) as JwtPayload;
    } else {
      return res.status(401).json({ msg: "No token, auth denied!" });
    }
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token, auth denied!" });
  }
};
