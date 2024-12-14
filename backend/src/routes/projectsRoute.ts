import { Router } from "express";
import { addProject, getProjects } from "../controllers/projectsContoller.ts";

const router = Router();

router.post("/", addProject);

router.get("/", getProjects);

export default router;
