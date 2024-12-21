import express from "express";
import cors from "cors";
import projectsRoute from "./routes/projectsRoute";
import usersRoute from "./routes/usersRoute";
import tasksRoute from "./routes/tasksRoute";
import { auth } from "../middleware/auth";

const app = express();

app.use(express.json());

app.use(cors());

app.use(auth);

app.use("/projects", projectsRoute);

app.use("/users", usersRoute);

app.use("/tasks", tasksRoute);

app.listen(5000, () => {
  console.log("Server is listening to port 5000");
});
