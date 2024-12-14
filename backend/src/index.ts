import express from "express";
import cors from "cors";
import projectsRoute from "./routes/projectsRoute.ts";
import usersRoute from "./routes/usersRoute.ts";
import { auth } from "../middleware/auth.ts";

const app = express();

app.use(express.json());

app.use(cors());

app.use(auth);

app.use("/projects", projectsRoute);

app.use("/users", usersRoute);

app.listen(5000, () => {
  console.log("Server is listening to port 5000");
});
