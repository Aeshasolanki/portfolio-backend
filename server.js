import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import appsRoutes from "./routes/apps.js";
import blogsRoutes from "./routes/blogsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/apps", appsRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/apps", appsRoutes);
app.use("/api/blogs", blogsRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
