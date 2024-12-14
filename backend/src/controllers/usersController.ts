import { Request, Response } from "express";
import { supabase } from "../utils/createSupabase.ts";

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
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
