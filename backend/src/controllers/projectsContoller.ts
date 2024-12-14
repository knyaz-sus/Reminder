import { z } from "zod";
import { supabase } from "../utils/createSupabase";
import { Request, Response } from "express";

export const addProject = async (req: Request, res: Response) => {
  const { name, userId } = req.body;
  try {
    const { error } = await supabase
      .from("projects")
      .insert({ name, admin_id: userId });

    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error creating project", error: error.message });
    }

    res.status(200).json({ message: "Project created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  const { userId } = req.query;
  if (z.string().uuid().safeParse(userId).error) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("admin_id", userId as string);
    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error fetching projects", error: error.message });
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
