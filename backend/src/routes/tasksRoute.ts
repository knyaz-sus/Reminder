import { Router } from "express";
import { addTask, getTasks } from "../controllers/tasksController.ts";

const router = Router();

router.post("/", addTask);

router.get("/", getTasks);

export default router;
