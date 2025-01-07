import { supabase } from "../utils/createSupabase";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { zParse } from "../utils/zParse";
import {
  addProjectRequestSchema,
  deleteProjectRequestSchema,
  getProjectRequestSchema,
  getProjectsRequestSchema,
  updateProjectRequestSchema,
} from "../types/schemas";

export const addProject = async (req: Request, res: Response) => {
  try {
    const { body } = await zParse(addProjectRequestSchema, req);

    const { data, error } = await supabase
      .from("projects")
      .insert(body)
      .select();

    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error creating project", error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const {
      query: { userId },
    } = await zParse(getProjectsRequestSchema, req);
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("adminId", userId)
      .order("createdAt", { ascending: true });
    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error fetching projects", error: error.message });
    }
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
      body: { adminId },
    } = await zParse(deleteProjectRequestSchema, req);
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decodedToken = jwt.decode(token as string, {
      complete: true,
      json: true,
    });
    if (decodedToken?.payload.sub !== adminId) {
      return res.status(400).json({ message: "Only admin can delete project" });
    }
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error deleting project", error: error.message });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const updateProject = async (req: Request, res: Response) => {
  try {
    const {
      body,
      params: { id },
    } = await zParse(updateProjectRequestSchema, req);
    const { error } = await supabase.from("projects").update(body).eq("id", id);
    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error updating project", error: error.message });
    }
    return res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = await zParse(getProjectRequestSchema, req);
    const { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error fetching project", error: error.message });
    }
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
