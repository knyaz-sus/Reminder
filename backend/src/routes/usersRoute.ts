import { Router } from "express";
import { getUser } from "../controllers/usersController.ts";

const router = Router();

router.get("/", getUser);

export default router;
