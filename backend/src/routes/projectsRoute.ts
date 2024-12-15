import { Router } from "express";
import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projectsContoller";
import { addProjectSchema } from "../schemas/projects/addProjectSchema";
import { validateBody } from "../utils/validate";

const router = Router();

router.post("/", validateBody(addProjectSchema), addProject);

router.get("/:id", getProjects);

router.delete("/:id", deleteProject);

router.put("/:id", updateProject);

export default router;
