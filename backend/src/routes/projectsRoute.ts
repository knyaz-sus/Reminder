import { Router } from "express";
import { addProject, getProjects } from "../controllers/projectsContoller";
import { addProjectSchema } from "../schemas/projects/addProjectSchema";
import { validateBody } from "../utils/validate";

const router = Router();

router.post("/", validateBody(addProjectSchema), addProject);

router.get("/", getProjects);

export default router;
