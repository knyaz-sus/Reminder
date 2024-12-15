import { z } from "zod";
import { supabase } from "../utils/createSupabase";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const addProject = async (req: Request, res: Response) => {
  try {
    const { name, userId } = req.body;
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
    const userId = req.params.id;
    if (z.string().uuid().safeParse(userId).error) {
      return res.status(400).json({ message: "ID is required" });
    }
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("adminId", userId as string);
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

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const adminId = req.body.adminId;
    const validateProjectId = z.string().uuid().safeParse(projectId);
    const validateAdminId = z.string().uuid().safeParse(adminId);
    if (validateProjectId.error || validateAdminId.error || !token) {
      return res.status(400).json({ message: "Missing requared params" });
    }
    const decodedToken = jwt.decode(token, { complete: true, json: true });
    if (decodedToken?.payload.sub !== adminId) {
      return res.status(400).json({ message: "Only admin can delete project" });
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId as string);
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
    const name = req.body.name;
    const projectId = req.params.id;
    const validateProjectId = z.string().uuid().safeParse(projectId);
    const validateName = z.string().min(1).safeParse(name);
    if (validateProjectId.error || validateName.error) {
      return res.status(400).json({ message: "Missing requared params" });
    }
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
