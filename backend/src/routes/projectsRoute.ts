import { Router } from "express";
import {
  addProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/projectsContoller";

const router = Router();

router.post("/", addProject);

router.get("/", getProjects);

router.delete("/:id", deleteProject);

router.put("/:id", updateProject);

router.get("/:id", getProject);

export default router;
