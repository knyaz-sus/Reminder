import { Router } from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateOrder,
  updateTask,
} from "../controllers/tasksController.ts";

const router = Router();

router.post("/", addTask);

router.get("/", getTasks);

router.delete("/:id", deleteTask);

router.put("/:id", updateTask);

router.post("/update-order", updateOrder);

export default router;
