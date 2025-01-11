import { supabase } from "../utils/createSupabase";
import { Request, Response } from "express";
import { zParse } from "../utils/zParse";
import {
  addTaskRequestSchema,
  deleteTaskRequestSchema,
  getTasksRequestSchema,
  updateOrderRequestSchema,
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

    const { data: tasks, error } =
      projectId === null
        ? await supabase.from("tasks").select("*").is("projectId", projectId)
        : await supabase.from("tasks").select("*").eq("projectId", projectId);
    if (error) {
      console.log(error.message);
      return res.status(500).json({
        message: "Error fetching tasks",
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

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { body } = await zParse(updateOrderRequestSchema, req);

    const { data, error } = await supabase
      .from("tasks")
      .upsert(body, { onConflict: "id" })
      .select();

    if (error) {
      console.log(error.message);
      return res.status(500).json({
        message: "Error updating order of tasks",
        error: error.message,
      });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
