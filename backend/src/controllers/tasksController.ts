import { supabase } from "../utils/createSupabase";
import { Request, Response } from "express";
import { zParse } from "../utils/zParse";
import { addTaskRequestSchema, getTasksRequestSchema } from "../types/schemas";

export const addTask = async (req: Request, res: Response) => {
  try {
    const {
      body: { title, description, projectId, date },
    } = await zParse(addTaskRequestSchema, req, res);
    const { error } = await supabase
      .from("tasks")
      .insert({ title, projectId, description, date });

    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error creating task", error: error.message });
    }

    res.status(200).json({ message: "Task created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const {
      query: { projectId },
    } = await zParse(getTasksRequestSchema, req, res);
    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("projectId", projectId);
    if (error) {
      console.log(error.message);
      return res.status(500).json({
        message: "Error fetching tasks by projectId",
        error: error.message,
      });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
