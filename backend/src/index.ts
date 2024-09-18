import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.ts";

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use("/auth", authRoutes);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(5000, () => {
  console.log("Server is listening to port 5000");
});
