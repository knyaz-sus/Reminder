import { Router } from "express";
import {
  addProject,
  deleteProject,
  getProjects,
} from "../controllers/projectsContoller";
import { addProjectSchema } from "../schemas/projects/addProjectSchema";
import { validateBody } from "../utils/validate";

const router = Router();

router.post("/", validateBody(addProjectSchema), addProject);

router.get("/:id", getProjects);

router.delete("/:id", deleteProject);

export default router;
