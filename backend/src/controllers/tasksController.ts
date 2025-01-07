import { supabase } from "../utils/createSupabase";
import { Request, Response } from "express";
import { zParse } from "../utils/zParse";
import {
  addTaskRequestSchema,
  deleteTaskRequestSchema,
  getTasksRequestSchema,
  updateTaskRequestSchema,
} from "../types/schemas";

export const addTask = async (req: Request, res: Response) => {
  try {
    const { body } = await zParse(addTaskRequestSchema, req);

    const { data, error } = await supabase
      .from("tasks")
      .insert(body)
      .select("*");

    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error creating task", error: error.message });
    }
    res.status(200).json(data[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const {
      query: { projectId },
    } = await zParse(getTasksRequestSchema, req);
    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("projectId", projectId)
      .order("createdAt", { ascending: true });
    if (error) {
      console.log(error.message);
      return res.status(500).json({
        message: "Error fetching tasks by projectId",
      });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const {
    params: { id: taskId },
  } = await zParse(deleteTaskRequestSchema, req);
  try {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error deleting task", error: error.message });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const {
      body,
      params: { id: taskId },
    } = await zParse(updateTaskRequestSchema, req);
    const { data, error } = await supabase
      .from("tasks")
      .update(body)
      .eq("id", taskId)
      .select("*");

    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Error updating project", error });
    }
    console.log(data, body);
    const updatedTask = data.find((el) => el.id === taskId);
    return res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
