import { Request, Response, NextFunction } from "express";
import { supabase } from "../src/utils/createSupabase.ts";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      const { error } = await supabase.auth.getUser(token);
      if (error) throw error;
    } else {
      res.status(401).json({ msg: "No token, auth denied!" });
    }

    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token, auth denied!" });
  }
};
