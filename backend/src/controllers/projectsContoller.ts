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
    const {
      body: { name, userId },
    } = await zParse(addProjectRequestSchema, req, res);
    const { error } = await supabase
      .from("projects")
      .insert({ name, adminId: userId });
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
  try {
    const {
      query: { userId },
    } = await zParse(getProjectsRequestSchema, req, res);
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
      params: { id: projectId },
      body: { adminId },
    } = await zParse(deleteProjectRequestSchema, req, res);
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decodedToken = jwt.decode(token as string, {
      complete: true,
      json: true,
    });
    if (decodedToken?.payload.sub !== adminId) {
      return res.status(400).json({ message: "Only admin can delete project" });
    }
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);
    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error deleting project", error: error.message });
    }
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const updateProject = async (req: Request, res: Response) => {
  try {
    const {
      body: { name },
      params: { id: projectId },
    } = await zParse(updateProjectRequestSchema, req, res);
    const { error } = await supabase
      .from("projects")
      .update({ name })
      .eq("id", projectId);
    if (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error updating project", error: error.message });
    }
    return res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const {
      params: { id: projectId },
    } = await zParse(getProjectRequestSchema, req, res);
    const { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
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
