import { Router } from "express";
import { getUser } from "../controllers/usersController.ts";

const router = Router();

router.get("/:id", getUser);

export default router;
