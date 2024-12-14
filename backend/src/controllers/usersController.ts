import { Request, Response } from "express";
import { supabase } from "../utils/createSupabase";
import { z } from "zod";

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    if (z.string().uuid().safeParse(userId).error) {
      return res.status(400).json({ message: "ID is required" });
    }
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId as string)
      .single();
    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error fetching projects", error: error.message });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
